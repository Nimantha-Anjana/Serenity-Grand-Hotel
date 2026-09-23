import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer'; 
import '../css/Facilities.css';

const facilitiesData = [
  {
    id: 1,
    icon: 'bi-water',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=500&auto=format&fit=crop&q=80',
    title: 'Swimming Pool',
    description: 'Immerse yourself in our temperature-controlled infinity pool overlooking breathtaking scenic views.'
  },
  {
    id: 2,
    icon: 'bi-flower2',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    title: 'Spa & Wellness',
    description: 'Rejuvenate your senses with holistic therapies, massages, and organic wellness treatments.'
  },
  {
    id: 3,
    icon: 'bi-activity',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
    title: 'Fitness Center',
    description: 'Stay active with state-of-the-art TechnoGym equipment and personal training sessions.'
  },
  {
    id: 4,
    icon: 'bi-cup-hot',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?w=500&auto=format&fit=crop&q=80',
    title: 'Restaurant',
    description: 'Savor gourmet international cuisines prepared by award-winning chefs using local ingredients.'
  },
  {
    id: 5,
    icon: 'bi-wifi',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=500&auto=format&fit=crop&q=80',
    title: 'Free WiFi',
    description: 'Enjoy high-speed fiber-optic internet connectivity seamlessly across the entire hotel property.'
  },
  {
    id: 6,
    icon: 'bi-briefcase',
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=500&auto=format&fit=crop&q=80',
    title: 'Conference Hall',
    description: 'Host sophisticated corporate meetings and grand events with advanced AV technology.'
  },
  {
    id: 7,
    icon: 'bi-car-front',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&auto=format&fit=crop&q=80',
    title: 'Airport Transfer',
    description: 'Travel effortlessly with our private luxury chauffeured airport pickup and drop-off service.'
  },
  {
    id: 8,
    icon: 'bi-bell',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80',
    title: '24/7 Room Service',
    description: 'Indulge in round-the-clock room dining with a freshly curated menu served straight to your door.'
  }
];

const servicesData = [
  { icon: 'bi-clock-history', title: '24/7 Front Desk', desc: 'Round-the-clock assistance for all your inquiries and check-ins.' },
  { icon: 'bi-basket2', title: 'Laundry Service', desc: 'Same-day professional dry cleaning and express laundry service.' },
  { icon: 'bi-person-badge', title: 'Concierge Service', desc: 'Expert assistance with tour bookings, tickets, and reservations.' },
  { icon: 'bi-suit-club', title: 'Luggage Storage', desc: 'Secure short-term and long-term baggage holding facilities.' },
  { icon: 'bi-stars', title: 'Daily Housekeeping', desc: 'Meticulous daily room turn-down service and refreshing amenities.' },
  { icon: 'bi-taxi-front', title: 'Airport Pickup', desc: 'Seamless luxury transportation arranged prior to your arrival.' }
];

const Facilities = () => {
  return (
    <div className="facilities-page">
      {/* 1. HERO SECTION */}
      <section className="facilities-hero">
        <div className="facilities-hero-overlay"></div>
        <div className="facilities-hero-content">
          <span className="badge-luxury-gold mb-2">SERENITY GRAND HOTEL</span>
          <h1 className="facilities-hero-title">Facilities & Services</h1>
          <p className="facilities-hero-subtitle">
            Everything you need for an unforgettable, luxurious stay.
          </p>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="facilities-intro container text-center">
        <span className="section-label">EXPERIENCE MORE</span>
        <h2 className="section-heading">Designed For Your Comfort</h2>
        <div className="section-underline"></div>
        <p className="facilities-intro-text">
          At Serenity Grand Hotel, every amenity is crafted to elevate your stay into an unforgettable retreat. 
          From world-class dining and wellness sanctuaries to seamless modern conveniences, experience 
          unmatched luxury and hospitality at every step of your journey.
        </p>
      </section>

      {/* 3. FACILITIES GRID (IMAGE + ELEGANT ICON BADGE) */}
      <section className="facilities-grid-section container">
        <div className="facilities-grid">
          {facilitiesData.map((item) => (
            <div key={item.id} className="facility-card card-luxury">
              {/* Image & Icon Wrapper */}
              <div className="facility-img-wrapper">
                <img src={item.image} alt={item.title} className="facility-card-img" />
                <div className="facility-icon-badge">
                  <i className={`bi ${item.icon}`}></i>
                </div>
              </div>

              <div className="facility-card-body">
                <h3 className="facility-card-title">{item.title}</h3>
                <p className="facility-card-desc">{item.description}</p>
              </div>
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
            <Link to="/spa" className="btn btn-luxury-navy">Discover More</Link>
          </div>
        </div>
      </section>

      {/* 5. SERVICES SECTION */}
      <section className="services-section container">
        <div className="text-center mb-4">
          <span className="section-label">PREMIUM CARE</span>
          <h2 className="section-heading">Personalized Hotel Services</h2>
          <div className="section-underline"></div>
        </div>

        <div className="services-grid">
          {servicesData.map((service, index) => (
            <div key={index} className="service-item card-luxury">
              <div className="service-icon-box">
                <i className={`bi ${service.icon}`}></i>
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
        <div className="facilities-cta-content text-center">
          <h2 className="cta-title">Everything You Need, Under One Roof</h2>
          <p className="cta-subtitle">Book your experience today and enjoy world-class luxury and comfort.</p>
          <Link to="/booking" className="btn btn-luxury-gold btn-lg">Plan Your Stay</Link>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
};

export default Facilities;