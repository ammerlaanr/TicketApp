import { Routes, Route } from 'react-router-dom';
import EventList from './pages/EventList';
import RegistratieFormulier from './pages/RegistratieFormulier';
import Login from './pages/LoginPage';
import TicketsKopen from './pages/TicketsKopen';
import PrivateRoute from './PrivateRoutes';
import EventPagina from './pages/EventPagina';
import LogViewer from './pages/LogViewer';

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/events" element={<PrivateRoute><EventList /></PrivateRoute>} />
            <Route path="/addEvent" element={<PrivateRoute requiredRole='admin'><EventPagina /></PrivateRoute>} />
            <Route path="/register" element={<RegistratieFormulier />} />
            <Route path="/events/:eventId/tickets" element={<PrivateRoute><TicketsKopen /></PrivateRoute>} />
            <Route path="/admin/logging" element={<PrivateRoute requiredRole='admin'><LogViewer /></PrivateRoute>} />
        </Routes>
    );
};

export default AppRoutes;