import express from "express";
import nodemailer from "nodemailer";
import { generateTicketPDF } from "../utils/generateTicketPdf";
import path from "path";
import fs from "fs";

const router = express.Router();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: 'ammerlaan.rodi@gmail.com',
    pass: 'Promised5RocketBusy',
  },
});

router.post("/send-ticket", async (req, res) => {
  const { email, name, eventName, date, location, tickets, address } = req.body;

  const pdfPath = path.resolve(`./tickets/ticket-${Date.now()}.pdf`);
  await generateTicketPDF({ name, tickets, eventName, date, location }, pdfPath);

  const mailOptions = {
    from: '"Tickets App" <tickets@jouwapp.com>',
    to: email,
    subject: `🎫 Jouw ticket voor ${eventName}`,
    html: `
      <p>Hallo ${name},</p>
      <p>Hierbij jouw <strong>${tickets.length}</strong> tickets voor <strong>${eventName}</strong> op <strong>${date}</strong> in <strong>${location}</strong>.</p>
      <p>Verzendadres: ${address}</p>
      <p>De tickets zijn bijgevoegd als PDF. Tot snel!</p>
    `,
    attachments: [
      {
        filename: `Tickets-${eventName}.pdf`,
        path: pdfPath,
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    fs.unlinkSync(pdfPath); // optioneel opruimen
    res.status(200).send("E-mail met tickets verzonden!");
  } catch (err) {
    console.error("E-mailfout:", err);
    res.status(500).send("Fout bij verzenden e-mail");
  }
});

export default router;
