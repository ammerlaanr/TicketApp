// utils/generateTicketPDF.js
import PDFDocument from "pdfkit";
import fs from "fs";

export function generateTicketPDF(ticketInfo: any, outputPath: any) {
  return new Promise((resolve) => {
    const doc = new PDFDocument();
    const stream = fs.createWriteStream(outputPath);
    doc.pipe(stream);

    doc.fontSize(20).text("🎟️ Ticket", { align: "center" });
    doc.moveDown();

    doc.fontSize(14).text(`Naam: ${ticketInfo.name}`);
    doc.text(`Evenement: ${ticketInfo.eventName}`);
    doc.text(`Datum: ${ticketInfo.date}`);
    doc.text(`Locatie: ${ticketInfo.location}`);
    doc.moveDown();

    tickets.forEach((ticketNumber: any, index: any) => {
        doc.text(`Ticket ${index + 1}: ${ticketNumber}`);    
    });

    doc.end();

    stream.on("finish", () => {
      resolve(outputPath);
    });
  });
}
