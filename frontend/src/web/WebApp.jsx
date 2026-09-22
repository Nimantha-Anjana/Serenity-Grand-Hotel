import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import ScrollToTop from './components/ScrollToTop';

// Global reset + base styles for the public website.
// Imported here (not in main.jsx) because this whole web app is lazy-loaded,
// so these global styles never leak into the /admin pages.
import './index.css';

// Pages
import Home from './pages/Home';
import Rooms from './pages/Rooms';
import RoomDetails from './pages/RoomDetails';
import Dining from './pages/Dining';
import Facilities from './pages/Facilities';
import Services from './pages/Services';
import Gallery from './pages/Gallery';
import Booking from './pages/Booking';
import Contact from './pages/Contact';

// The public website. BrowserRouter lives in src/App.jsx.
function WebApp() {
  return (
    <>
      <ScrollToTop />
      {/* Navbar is rendered once here, above the Routes (pages must not render their own) */}
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/dining" element={<Dining />} />
        <Route path="/facilities" element={<Facilities />} />
        <Route path="/services" element={<Services />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/contact" element={<Contact />} />

        {/* Facilities page links to /spa -> show the Wellness services */}
        <Route path="/spa" element={<Navigate to="/services?category=Wellness" replace />} />

        {/* Unknown URL -> Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default WebApp;
