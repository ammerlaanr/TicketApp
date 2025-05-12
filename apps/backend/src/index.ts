const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const readline = require('readline');
const path = require('path');

const axios = require('axios');

const { logTransaction, logRegistration } = require("./utils/logger");

// In-memory data
const { events, tickets, users, orders } = require('./data');

const SECRET_KEY = 'testnet2025';

const app = express();
app.use(cors());
app.use(express.json());

/**
 * @param {any} _req
 * @param {any} res
 */

// GET alle events
app.get('/events', (_req: any, res: any) => {
  res.json(events);
});

app.get('/events/:id', (req: any, res: any) => {
  const { id } = req.params;
  const event = events.find((e: any) => e.id === id);

  if (!event) {
    return res.status(404).json({message: 'Evenement niet gevonden'});
  }

  res.json(event);
})

app.post('/events/:id', (req: any, res: any) => {
  const { id } = req.params;
  const event = events.find((e: any) => e.id === id);
  const { naam, email, aantal } = req.body;

  if (!event) {
    return res.status(404).json({message: 'Evenement niet gevonden'});
  }
  
  if (typeof aantal !== 'number' || aantal <= 0) {
    return res.status(400).json({ error: 'Ongeldig aantal tickets opgegeven.' });
  }

  if (aantal > event.ticketsRemaining) {
    return res.status(400).json({ error: 'Niet genoeg tickets beschikbaar.' });
  }

  event.ticketsRemaining -= aantal;

  const user = users.find((u: any) => u.email === email);
  const ticketNumbers = Array.from({length: aantal}, (_, i) => `${id}-${Date.now()}-${i+1}`);

  const address = user ? `${user.straatnaam} ${user.huisnummer}, ${user.postcode} - ${user.woonplaats}` : 'Onbekend';

  logTransaction({
    userId: user?.id ?? 'onbekend',
    eventId: id,
    tickets: ticketNumbers,
    aantalTickets: ticketNumbers.length,
    address: address
  });

  res.json({
    message: 'Tickets succesvol gekocht!',
    naam: naam,
    email: email,
    gekochteTickets: aantal,
    ticketNummers: ticketNumbers
  });
});

app.post('/admin/events', (req: any, res: any) => {
  const { title, date, ticketPrices, ticketLimits, description } = req.body;
  const ticketsRemaining = ticketLimits;
  const newEvent = { id: String(Date.now()), title, date, ticketPrices, ticketLimits, ticketsRemaining, description };
  events.push(newEvent);
  res.status(201).json({ message: 'Event gemaakt', event: newEvent });
});


// Gebruiker registreren
app.post('/users/register', (req: any, res: any) => {
  const { voornaam, achternaam, email, wachtwoord, postcode, huisnummer, straatnaam, woonplaats }: { voornaam: string, achternaam: string, email: string, wachtwoord: string, postcode: string, huisnummer: string, straatnaam: string, woonplaats: string } = req.body;
  if (!email || !wachtwoord) {
    return res.status(400).json({ error: 'Email en wachtwoord verplicht' });
  }
  if (users.find((u: any) => u.email === email)) {
    return res.status(409).json({ error: 'Gebruiker bestaat al' });
  }
  const newUser = { id: String(Date.now()), voornaam, achternaam, email, wachtwoord, postcode, huisnummer, straatnaam, woonplaats, role: 'user' };
  users.push(newUser);

  logRegistration({
    voornaam: voornaam,
    achternaam: achternaam,
    email: email,
    wachtwoord: wachtwoord,
    postcode: postcode,
    huisnummer: huisnummer,
    straatnaam: straatnaam,
    woonplaats: woonplaats
  })

  res.status(201).json({ message: 'Registratie gelukt', user: { id: newUser.id, email: newUser.email } });
});

app.post('/admin/login', (req: any, res: any) => {
  const { email, wachtwoord } = req.body;
  const user = users.find((u: any) => u.email === email && u.wachtwoord === wachtwoord && u.role === 'admin');
  if (!user) {
    return res.status(401).json({ error: 'Ongeldige inloggegevens' });
  } else {
    res.json(user);
  }
});

app.post('/users/login', (req: any, res: any) => {
  const { email, wachtwoord } = req.body;
  const user = users.find((u: any) => u.email === email && u.wachtwoord === wachtwoord);
  if (!user) {
    return res.status(401).json({ error: 'Ongeldige inloggegevens' });
  } else {
    const token = jwt.sign(req.body, SECRET_KEY, {
      expiresIn: '1h',
    })
    res.json({ user: user, token: token });
  }
});

app.get('/api/adres', async(req: any, res: any) => {
  try {
    const { postcode, huisnummer } = req.query;
  
    const response = await axios.get(`https://sandbox.postcodeapi.nu/v3/lookup/${postcode}/${huisnummer}`, {
            headers: {
              "X-Api-Key": "h8OybYySUx6sCovgA898Q4HiOR4uesn351J17vux",
              'Cache-Control': 'no-cache'
            },
          })

    res.json(response.data)
        } catch (error: any) {
          console.error('Fout bij ophalen van adres: ', error.message);
          res.status(500).json({ error: 'Extern adres ophalen mislukt.'})
        }
})

const readLogsFromFile = async (filePath: string): Promise<any[]> => {
  const logs: any[] = [];
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) return logs;

  const fileStream = fs.createReadStream(absolutePath);
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  for await (const line of rl) {
    try {
      const json = JSON.parse(line);
      logs.push(json);
    } catch (err) {
      console.warn(`❗ Ongeldige JSON in ${filePath}:`, line);
    }
  }

  return logs;
};

app.get('/logs', async (_req: any, res: any) => {
  try {
    const transactions = await readLogsFromFile('logs/transactions.log');
    const registrations = await readLogsFromFile('logs/registrations.log');

    res.json({
      transactions,
      registrations
    });
  } catch (error) {
    console.error('🚨 Fout bij inlezen logs:', error);
    res.status(500).json({ error: 'Kan logbestanden niet lezen.' });
  }
});

users.push({ id: '1', voornaam: 'admin', achternaam: 'admin', email: 'admin@admin.com', wachtwoord: 'admin', postcode: '1234AB', huisnummer: 1, role: 'admin' });
users.push({ id: '2', voornaam: 'user', achternaam: 'user', email: 'user@user.com', wachtwoord: 'user', postcode: '2345BC', huisnummer: 2, role: 'user' });

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Backend draait op http://localhost:${PORT}`);
}); 