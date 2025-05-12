import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Event {
  id: string;
  title: string;
  date: string;
  ticketLimits: string;
  ticketPrices: string;
  ticketsRemaining: number;
  description: string;
}

const API_URL = 'http://localhost:4000';

export default function EventList() {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`${API_URL}/events`)
      .then(res => setEvents(res.data))
      .catch(() => setError('Fout bij ophalen evenementen'))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Laden...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div style={{ marginBottom: 40}}>
      <h2 className="mb-4">Evenementen</h2>
      {events.length === 0 || !token ? (
        <div className="alert alert-info">Geen evenementen gevonden.</div>
      ) : (
        <div className="row g-4">
          {events.map(event => (
            <div key={event.id} className="col-md-6 col-lg-3">
              <div className="card h-100 shadow-sm">
                <div className="card-body d-flex flex-column justify-content-between">
                  <h5 className="card-title">🎵 {event.title}</h5>
                  <div className="mb-2">
                    <span className="badge bg-info text-dark me-2" style={{fontSize: 16}}>{event.date}</span>
                  </div>
                  <div className="mb-2">
                    <span>💶 Prijs: €{event.ticketPrices}</span>
                  </div>
                  <div className="mb-2">
                    <span>🎟️ Kaarten beschikbaar: <strong>{event.ticketsRemaining}</strong> van {event.ticketLimits}</span>
                  </div>
                  <div className="mb-2">
                    <span style={{fontStyle: "italic"}}>{event.description}</span>
                  </div>
                  <div className='mb-2'>
                    {event.ticketsRemaining > 0 ? (
                      <Link to={`/events/${event.id}/tickets`} className="btn btn-success">Bestel nu je kaarten</Link>
                    ): (
                      <div className="btn btn-success disabled">Bestel nu je kaarten</div>
                    )}
                    </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 