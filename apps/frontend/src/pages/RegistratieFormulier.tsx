import { useState, useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RegistratieFormulier() {
  const [formData, setFormData] = useState({
    voornaam: '',
    achternaam: '',
    email: '',
    wachtwoord: '',
    huisnummer: '',
    postcode: '',
    straatnaam: '',
    woonplaats: ''
  });

  const navigate = useNavigate();

  useEffect(() => {
    console.log('useEffect triggered met:', formData.postcode, formData.huisnummer);
    const { postcode, huisnummer } = formData;

    const isValidPostcode = /^[0-9]{4}[A-Z]{2}$/.test(postcode); // optioneel: simpele NL postcode check
    if (postcode && huisnummer && isValidPostcode) {
      // Call API
      axios.get(`http://localhost:4000/api/adres?postcode=${postcode}&huisnummer=${huisnummer}`)
        .then((response) => {
          const adres = response.data;

          // Update de straatnaam en woonplaats
          setFormData((prev) => ({
            ...prev,
            straatnaam: adres.street || '',
            woonplaats: adres.city || ''
          }));
        })
        .catch((err) => {
          console.error('Fout bij ophalen adres:', err);

          setFormData(prev => ({
            ...prev,
            straatnaam: '',
            woonplaats: ''
          }));
        });
    }
  }, [formData.postcode, formData.huisnummer]);

  const handleChange = (e:any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e:any) => {
    e.preventDefault();
    console.log('Ingevoerde gegevens:', formData);
    axios.post('http://localhost:4000/users/register', formData) 
    navigate('/');
  };

  return (
    <Container className="mt-5">
      <h2>Registratie</h2>
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col md={6}>
            <Form.Group controlId="voornaam">
              <Form.Label>Voornaam</Form.Label>
              <Form.Control
                type="text"
                placeholder="Voer je voornaam in"
                name="voornaam"
                value={formData.voornaam}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="achternaam">
              <Form.Label>Achternaam</Form.Label>
              <Form.Control
                type="text"
                placeholder="Voer je achternaam in"
                name="achternaam"
                value={formData.achternaam}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group controlId="email" className="mt-3">
              <Form.Label>E-mail adres</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Kies een e-mail adres"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="wachtwoord" className="mt-3">
              <Form.Label>Wachtwoord</Form.Label>
              <Form.Control
                type="password"
                placeholder="Voer een wachtwoord in"
                name="wachtwoord"
                value={formData.wachtwoord}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={2}>
            <Form.Group controlId="postcode">
              <Form.Label>Postcode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Voer je postcode in"
                name="postcode"
                value={formData.postcode}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group controlId="huisnummer">
              <Form.Label>Huisnummer</Form.Label>
              <Form.Control
                type="text"
                placeholder="Voer je huisnummer in"
                name="huisnummer"
                value={formData.huisnummer}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="straatnaam">
              <Form.Label>Straatnaam</Form.Label>
              <Form.Control
               type="text"
               disabled={true}
               name="straatnaam"
               value={formData.straatnaam}
               onChange={handleChange}
               required
               />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group controlId="Woonplaats">
              <Form.Label>Woonplaats</Form.Label>
              <Form.Control
               type="text"
               disabled={true}
               name="woonplaats"
               value={formData.woonplaats}
               onChange={handleChange}
               required
               />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit" className="mt-4">
          Registreren
        </Button>
      </Form>
    </Container>
  );
}