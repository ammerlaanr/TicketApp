import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function AddEvent() {
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    ticketPrices: '',
    ticketLimits: '',
    description: ''
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/admin/events', {
        ...formData,
        ticketPrices: parseFloat(formData.ticketPrices),
        ticketLimits: parseInt(formData.ticketLimits)
      });
      setSuccess(true);
      navigate('/events');
    } catch (err) {
      setError('Fout bij het toevoegen van het evenement.');
    }
  };

  return (
    <div className="container my-5 p-4 bg-light rounded shadow-sm">
      <h2 className="mb-4 text-center">Evenement toevoegen</h2>

      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">Evenement succesvol toegevoegd!</div>}

      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Naam</label>
            <input
              type="text"
              className="form-control"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Datum</label>
            <input
              type="date"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-6">
            <label className="form-label">Kaartprijs (€)</label>
            <input
              type="number"
              className="form-control"
              name="ticketPrices"
              value={formData.ticketPrices}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col-md-6">
            <label className="form-label">Maximaal aantal kaarten</label>
            <input
              type="number"
              className="form-control"
              name="ticketLimits"
              value={formData.ticketLimits}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="form-label">Omschrijving</label>
          <textarea
            className="form-control"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className="text-end">
          <button type="submit" className="btn px-4" style={{ background: "#EC008C", border: "none"}}>
            Toevoegen
          </button>
        </div>
      </form>
    </div>
  );
}