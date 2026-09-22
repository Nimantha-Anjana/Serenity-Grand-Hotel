import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; // Adjust import path if needed
import '../css/Facilities.css';

const facilitiesData = [
  {
    id: 1,
    icon: 'fa-swimming-pool',
    title: 'Swimming Pool',
    description: 'Immerse yourself in our temperature-controlled infinity pool overlooking breathtaking scenic views.'
  },
  {
    id: 2,
    icon: 'fa-spa',
    title: 'Spa & Wellness',
    description: 'Rejuvenate your senses with holistic therapies, massages, and organic wellness treatments.'
  },
  {
    id: 3,
    icon: 'fa-dumbbell',
    title: 'Fitness Center',
    description: 'Stay active with state-of-the-art TechnoGym equipment and personal training sessions.'
  },
  {
    id: 4,
    icon: 'fa-utensils',
    title: 'Restaurant',
    description: 'Savor gourmet international cuisines prepared by award-winning chefs using local ingredients.'
  },
  {
    id: 5,
    icon: 'fa-wifi',
    title: 'Free WiFi',
    description: 'Enjoy high-speed fiber-optic internet connectivity seamlessly across the entire hotel property.'
  },
  {
    id: 6,
    icon: 'fa-handshake',
    title: 'Conference Hall',
    description: 'Host sophisticated corporate meetings and grand events with advanced AV technology.'
  },
  {
    id: 7,
    icon: 'fa-shuttle-van',
    title: 'Airport Transfer',
    description: 'Travel effortlessly with our private luxury chauffeured airport pickup and drop-off service.'
  },
  {
    id: 8,
    icon: 'fa-concierge-bell',
    title: '24/7 Room Service',
    description: 'Indulge in round-the-clock room dining with a freshly curated menu served straight to your door.'
  }
];

const servicesData = [
  { icon: 'fa-clock', title: '24/7 Front Desk', desc: 'Round-the-clock assistance for all your inquiries and check-ins.' },
  { icon: 'fa-shirt', title: 'Laundry Service', desc: 'Same-day professional dry cleaning and express laundry service.' },
  { icon: 'fa-user-tie', title: 'Concierge Service', desc: 'Expert assistance with tour bookings, tickets, and reservations.' },
  { icon: 'fa-suitcase-rolling', title: 'Luggage Storage', desc: 'Secure short-term and long-term baggage holding facilities.' },
  { icon: 'fa-broom', title: 'Daily Housekeeping', desc: 'Meticulous daily room turn-down service and refreshing amenities.' },
  { icon: 'fa-plane-arrival', title: 'Airport Pickup', desc: 'Seamless luxury transportation arranged prior to your arrival.' }
];

const Facilities = () => {
  return (
    <div className="facilities-page">
      {/* 1. HERO SECTION */}
      <section className="facilities-hero">
        <div className="facilities-hero-overlay"></div>
        <div className="facilities-hero-content">
          <h1 className="facilities-hero-title">Facilities & Services</h1>
          <p className="facilities-hero-subtitle">
            Everything you need for a comfortable and memorable stay.
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="facilities-intro container">
        <span className="section-label">EXPERIENCE MORE</span>
        <h2 className="section-heading">Designed For Your Comfort</h2>
        <div className="section-underline"></div>
        <p className="facilities-intro-text">
          At Serenity Grand Hotel, every amenity is crafted to elevate your stay into an unforgettable retreat. 
          From world-class dining and wellness sanctuaries to seamless modern conveniences, experience 
          unmatched luxury and hospitality at every step of your journey.
        </p>
      </section>

      {/* 3. FACILITIES GRID */}
      <section className="facilities-grid-section container">
        <div className="facilities-grid">
          {facilitiesData.map((item) => (
            <div key={item.id} className="facility-card">
              <div className="facility-icon-wrapper">
                <i className={`fas ${item.icon} facility-icon`}></i>
              </div>
              <h3 className="facility-card-title">{item.title}</h3>
              <p className="facility-card-desc">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. FEATURED FACILITY SECTION */}
      <section className="featured-facility-section">
        <div className="container featured-facility-container">
          <div className="featured-facility-image-wrapper">
            <img 
              src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?q=80&w=1200&auto=format&fit=crop" 
              alt="Luxury Swimming Pool" 
              className="featured-facility-image"
            />
          </div>
          <div className="featured-facility-content">
            <span className="section-label">HIGHLIGHT</span>
            <h2 className="featured-title">Relax & Rejuvenate</h2>
            <div className="section-underline left-aligned"></div>
            <p className="featured-description">
              Unwind in our stunning rooftop infinity pool, designed to offer panoramic views while you swim or relax on private sun loungers. Pair your aquatic escape with our adjacent wellness spa for bespoke herbal treatments, aromatherapy, and tranquility.
            </p>
            <Link to="/spa" className="btn-primary">Discover More</Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="services-section container">
        <div className="text-center">
          <span className="section-label">PREMIUM CARE</span>
          <h2 className="section-heading">Personalized Hotel Services</h2>
          <div className="section-underline"></div>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-item">
              <div className="service-icon-box">
                <i className={`fas ${service.icon}`}></i>
              </div>
              <div className="service-info">
                <h4 className="service-title">{service.title}</h4>
                <p className="service-desc">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. CTA SECTION */}
      <section className="facilities-cta">
        <div className="facilities-cta-overlay"></div>
        <div className="facilities-cta-content">
          <h2 className="cta-title">Everything You Need, Under One Roof</h2>
          <p className="cta-subtitle">Book your experience today and enjoy world-class luxury and comfort.</p>
          <Link to="/booking" className="btn-gold">Plan Your Stay</Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
};

export default Facilities;