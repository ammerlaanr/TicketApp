import { useState } from 'react';
import { Form, Button, Container, Row, Col, Alert, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [wachtwoord, setWachtwoord] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const { setToken, setRol } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    try {
      const response = await axios.post('http://localhost:4000/users/login', {
        email,
        wachtwoord
      });

      const token = response.data.token;
      setToken(token);

      const rol = response.data.user.role;
      setRol(rol);

      setSuccess(true);
      setTimeout(() => {
        navigate('/events');
      }, 100);
    } catch (err) {
      setError('Login mislukt. Controleer je gegevens.');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center">
        <Col md={6}>
          <Card className="p-4 shadow">
            <h3 className="text-center mb-4">Inloggen</h3>

            {error && <Alert variant="danger">{error}</Alert>}
            {success && <Alert variant="success">Succesvol ingelogd!</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formEmail" className="mb-3">
                <Form.Label>Emailadres</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Voer je e-mailadres in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formPassword" className="mb-4">
                <Form.Label>Wachtwoord</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Voer je wachtwoord in"
                  value={wachtwoord}
                  onChange={(e) => setWachtwoord(e.target.value)}
                  required
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Inloggen
              </Button>
            </Form>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};