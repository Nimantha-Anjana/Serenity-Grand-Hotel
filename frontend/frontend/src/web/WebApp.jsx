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
import Activities from './pages/Activities';

// Auth & Profile Pages
import Login from './pages/User-Profile/Login/Login';
import SignUp from './pages/User-Profile/Sign-up/SignUp';
import Profile from './pages/User-Profile/Profile';
import { AuthProvider } from './context/AuthContext';

// The public website. BrowserRouter lives in src/App.jsx.
function WebApp() {
  return (
    <AuthProvider>
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
        <Route path="/activities" element={<Activities />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />

        {/* Facilities page links to /spa -> show the Wellness services */}
        <Route path="/spa" element={<Navigate to="/services?category=Wellness" replace />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default WebApp;
