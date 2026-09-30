import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/Rooms.css';

// Static Data for 6 Hotel Rooms
const roomsData = [
  {
    id: '1',
    name: 'Deluxe Ocean View',
    image: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80',
    description: 'Wake up to endless ocean vistas with private balcony seating and modern coastal amenities.',
    guests: '2 Guests',
    bed: '1 King Bed',
    size: '45 sqm',
    price: 320,
    rating: '4.9 ★',
  },
  {
    id: '2',
    name: 'Deluxe Garden View',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    description: 'A tranquil hideaway featuring lush botanical gardens views, oversized bathtub, and serene decor.',
    guests: '2 Guests',
    bed: '1 Queen Bed',
    size: '40 sqm',
    price: 270,
    rating: '4.8 ★',
  },
  {
    id: '3',
    name: 'Executive Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    description: 'Tailored for executive travelers with an ergonomic workspace, high-speed connectivity, and executive lounge access.',
    guests: '2 Guests',
    bed: '1 King Bed',
    size: '50 sqm',
    price: 380,
    rating: '4.9 ★',
  },
  {
    id: '4',
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    description: 'Expansive living space combined with luxury bedroom interiors, dual marble sinks, and panoramic skylines.',
    guests: '3 Guests',
    bed: '1 Super King Bed',
    size: '75 sqm',
    price: 520,
    rating: '5.0 ★',
  },
  {
    id: '5',
    name: 'Family Suite',
    image: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80',
    description: 'Generously proportioned two-bedroom suite designed specifically for families needing privacy and room to relax.',
    guests: '4 Guests',
    bed: '1 King + 2 Twin Beds',
    size: '90 sqm',
    price: 610,
    rating: '4.9 ★',
  },
  {
    id: '6',
    name: 'Presidential Suite',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=800&q=80',
    description: 'The crowning jewel of Serenity Grand. Features a wrap-around private terrace, personal butler, and jacuzzi.',
    guests: '4 Guests',
    bed: '2 Super King Beds',
    size: '150 sqm',
    price: 1100,
    rating: '5.0 ★',
  },
];

const Rooms = () => {
  // Demo filter state (UI only)
  const [roomType, setRoomType] = useState('all');
  const [guests, setGuests] = useState('all');
  const [priceRange, setPriceRange] = useState('all');
  const [view, setView] = useState('all');

  const handleApplyFilters = (e) => {
    e.preventDefault();
    // UI practice demonstration - no backend required
  };

  return (
    <div className="rooms-page-wrapper">
      {/* <Navbar /> අයින් කරන ලදී. මන්ද Layout/App එකෙන් Global Navbar එක Render වෙන බැවිනි. */}

      {/* 1. Page Hero */}
      <section className="rooms-hero-section">
        <div className="rooms-hero-overlay"></div>
        <div className="rooms-hero-content">
          <h1>Our Rooms & Suites</h1>
          <p>Relax, recharge and enjoy exceptional comfort.</p>
        </div>
      </section>

      {/* 2. Introduction */}
      <section className="rooms-intro-section">
        <span className="section-subtitle">STAY IN COMFORT</span>
        <h2 className="section-title">Rooms Designed Around You</h2>
        <p className="intro-description">
          Every sanctuary at Serenity Grand Hotel balances contemporary luxury with timeless warmth. 
          Indulge in plush bedding, elegant marble bathrooms, and refined touches crafted to make your stay unforgettable.
        </p>
      </section>

      {/* 3. Room Filter Bar (UI Only) */}
      <section className="filter-bar-section">
        <form className="filter-form" onSubmit={handleApplyFilters}>
          <div className="filter-group">
            <label htmlFor="roomType">Room Type</label>
            <select 
              id="roomType" 
              value={roomType} 
              onChange={(e) => setRoomType(e.target.value)}
            >
              <option value="all">All Types</option>
              <option value="deluxe">Deluxe Room</option>
              <option value="executive">Executive</option>
              <option value="suite">Suite</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="guests">Guests</label>
            <select 
              id="guests" 
              value={guests} 
              onChange={(e) => setGuests(e.target.value)}
            >
              <option value="all">Any Capacity</option>
              <option value="2">Up to 2 Guests</option>
              <option value="3">Up to 3 Guests</option>
              <option value="4">4+ Guests</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priceRange">Price Range</label>
            <select 
              id="priceRange" 
              value={priceRange} 
              onChange={(e) => setPriceRange(e.target.value)}
            >
              <option value="all">All Prices</option>
              <option value="under300">Under $300</option>
              <option value="300to600">$300 - $600</option>
              <option value="over600">$600+</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="view">View</label>
            <select 
              id="view" 
              value={view} 
              onChange={(e) => setView(e.target.value)}
            >
              <option value="all">All Views</option>
              <option value="ocean">Ocean View</option>
              <option value="garden">Garden View</option>
              <option value="city">City Skyline</option>
            </select>
          </div>

          <button type="submit" className="btn-primary filter-submit-btn">
            Apply Filters
          </button>
        </form>
      </section>

      {/* 4. Room Grid */}
      <section className="rooms-grid-section">
        <div className="rooms-grid-container">
          {roomsData.map((room) => (
            <div key={room.id} className="room-card">
              {/* Image with zoom wrapper */}
              <div className="room-card-img-wrapper">
                <img src={room.image} alt={room.name} className="room-card-img" />
                <span className="room-rating-badge">{room.rating}</span>
              </div>

              {/* Card Details */}
              <div className="room-card-body">
                <div className="room-card-header">
                  <h3 className="room-name">{room.name}</h3>
                  <div className="room-price-tag">
                    ${room.price} <span>/ night</span>
                  </div>
                </div>

                <p className="room-short-desc">{room.description}</p>

                {/* Specs List */}
                <div className="room-specs-list">
                  <span>👥 {room.guests}</span>
                  <span>🛏️ {room.bed}</span>
                  <span>📐 {room.size}</span>
                </div>

                {/* Action Buttons */}
                <div className="room-card-actions">
                  <Link to={`/rooms/${room.id}`} className="btn-secondary card-action-btn">
                    View Details
                  </Link>
                  <Link to={`/rooms/${room.id}`} className="btn-primary card-action-btn">
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. Why Stay With Us */}
      <section className="why-stay-section">
        <div className="why-stay-container">
          <div className="section-header">
            <span className="section-subtitle">THE SERENITY DIFFERENCE</span>
            <h2 className="section-title">Why Stay With Us</h2>
          </div>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">💎</div>
              <h3>Best Price</h3>
              <p>Guaranteed best direct booking rates with exclusive luxury perks included.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛏️</div>
              <h3>Premium Comfort</h3>
              <p>Hand-crafted Egyptian cotton linens and tailored pillow menus in every room.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">🛎️</div>
              <h3>24/7 Service</h3>
              <p>Round-the-clock dedicated concierge and personalized room service.</p>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📶</div>
              <h3>Free WiFi</h3>
              <p>Ultra-fast high-speed optical fiber wireless internet across all areas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Final CTA */}
      <section className="final-cta-section">
        <div className="final-cta-content">
          <h2>Find Your Perfect Room</h2>
          <p>Your sanctuary of elegance and peaceful relaxation is just a click away.</p>
          <Link to="/rooms" className="btn-primary cta-btn">
            Book Your Stay
          </Link>
        </div>
      </section>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
};

export default Rooms;