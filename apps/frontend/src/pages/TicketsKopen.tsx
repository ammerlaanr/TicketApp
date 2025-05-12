import { useEffect, useState } from 'react';
import { Container, Form, Button, Row, Col, Card, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function TicketOrderPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [aantal, setQuantity] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [prijs, setPrijs] = useState(0);
  const [eventName, setEventName] = useState('');
  const [date, setDate] = useState('');

  const navigate = useNavigate();

  const { eventId } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:4000/events/${eventId}`)
      .then(response => {
        setPrijs(response.data.ticketPrices);
        setEventName(response.data.title);
        setDate(response.data.date);
      })
      .catch(err => {
        console.error('Fout bij ophalen van ticketprijs: ', err)
      })
      }, [eventId]);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!name || !email || aantal < 1) {
      setError('Vul alle velden correct in.');
      return;
    }

    setError('');
    setSubmitted(true);

    axios.post(`http://localhost:4000/events/${eventId}`, { name, email, aantal });
    console.log('Bestelling geplaatst:', { name, email, aantal });

    const location = "Ahoy Rotterdam";
    const tickets = ["Ticket123"];
    const address = "Kerkstraat 1, 1234 AB Amsterdam";
    axios.post('http://localhost:4000/send-ticket', { email, name, eventName, date, location, tickets, address})
    console.log('Email verstuurd');

    navigate('/events')
    // Reset of niet, afhankelijk van wat je wilt
    // setName('');
    // setEmail('');
    // setQuantity(1);
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-4">Bestel Tickets voor event {eventName}</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {submitted && <Alert variant="success">Bestelling geplaatst! 🎉</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formName" className="mb-3">
                <Form.Label>Naam</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Voor- en achternaam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>E-mailadres</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="voorbeeld@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formQuantity" className="mb-3">
                <Form.Label>Aantal tickets</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  max="9999"
                  value={aantal}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                  required
                />
              </Form.Group>

              <div className="mb-3 fw-bold">
                Totaalprijs: €{(prijs * aantal).toFixed(2)}
              </div>

              <Button type="submit" variant="primary" className="w-100">
                Bestellen
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};