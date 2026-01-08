import { Routes, Route } from 'react-router-dom';
import Home from '../views/pages/home.jsx';
import EventListing from '../views/pages/event listing.jsx';
import EventDetails from '../views/pages/event details.jsx';
import Bookings from '../views/pages/bookings.jsx';

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventListing />} />
      <Route path="/events/:id" element={<EventDetails />} />
      <Route path="/bookings" element={<Bookings />} />
    </Routes>
  );
}
