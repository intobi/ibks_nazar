import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import TicketsPage from '../pages/TicketsPage';
import AddTicketPage from "../pages/AddTicketPage";
import TicketDetailPage from '../pages/TicketDetailPage';

const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/tickets" replace />} />
                <Route path="/tickets" element={<TicketsPage />} />
                <Route path="/tickets/:id" element={<TicketDetailPage />} />
                <Route path="/add-new-ticket" element={<AddTicketPage />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
