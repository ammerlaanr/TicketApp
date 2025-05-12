import { BrowserRouter as Router } from 'react-router-dom'
import Header from './Header';
import './App.css'
import { AuthProvider } from './AuthContext'
import AppRoutes from './Routes'

function App() {
  return (
    <Router>
      <AuthProvider>
       <Header />
        <div className="d-flex justify-content-center align-items-start" style={{ minHeight: '100vh', background: '#f8f9fa', paddingTop: 56, width: '100vw', left: 0, right: 0, top: 0, position: 'absolute', zIndex: 99}}>
          <div className="container" style={{ maxWidth: '2200px', width: '100%', minHeight: '100vh', background: '#fff', boxShadow: '0 0 24px #0001', borderRadius: '0 0 1rem 1rem', padding: '0 2rem' }}>
            <header className="mb-4 text-center pt-5">
              <h1 className="display-4 fw-bold">Welkom bij TicketApp</h1>
              <p className="lead">Koop eenvoudig tickets voor de leukste evenementen op diverse locaties.</p>
            </header>
            <AppRoutes />
            <footer className="bg-light text-center py-3 mt-auto border-top" style={{ borderRadius: '0 0 1rem 1rem', paddingTop: 20   }}>
              <small>&copy; {new Date().getFullYear()} TicketApp. Alle rechten voorbehouden.</small>
            </footer>
          </div>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
