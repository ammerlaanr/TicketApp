import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface TicketModalProps {
  show: boolean;
  onHide: () => void;
  ticketNumbers: string[];
}

export const TicketModal: React.FC<TicketModalProps> = ({ show, onHide, ticketNumbers }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Je tickets zijn aangemaakt!</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Hier zijn je ticketnummers:</p>
        <ul>
          {ticketNumbers.map((ticket, index) => (
            <li key={index}>{ticket}</li>
          ))}
        </ul>
      </Modal.Body>
      <Modal.Footer>
        <Button style={{ background: "#EC008C", border: "none"}} onClick={onHide}>
          Terug naar Evenementen
        </Button>
      </Modal.Footer>
    </Modal>
  );
};