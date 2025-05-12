import fs from 'fs';
import path from 'path';

const TRANSACTION_LOG_PATH = path.resolve('./logs/transactions.log');
const REGISTRATION_LOG_PATH = path.resolve('./logs/registrations.log');

export function logTransaction({ userId, eventId, tickets, address }: {userId: string, eventId: string, tickets: any, address: string}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    userId,
    eventId,
    tickets,
    address,
  };

  fs.appendFileSync(TRANSACTION_LOG_PATH, JSON.stringify(logEntry) + '\n', 'utf8');
}

export function logRegistration({ voornaam, achternaam, email, wachtwoord, postcode, huisnummer, straatnaam, woonplaats }: { voornaam: string, achternaam: string, email: string, wachtwoord: string, postcode: string, huisnummer: string, straatnaam: string, woonplaats: string }) {
  const timeStamp = new Date().toISOString();
  const logEntry = {
    timeStamp,
    voornaam,
    achternaam,
    email,
    wachtwoord,
    postcode,
    huisnummer,
    straatnaam,
    woonplaats
  };

  fs.appendFileSync(REGISTRATION_LOG_PATH, JSON.stringify(logEntry) + '\n', 'utf8');
}