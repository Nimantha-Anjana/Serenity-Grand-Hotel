import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/RoomDetails.css';

// Gallery Image Collection
const galleryImages = [
  { id: 1, src: 'https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=1200&q=80', alt: 'Main Suite View' },
  { id: 2, src: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80', alt: 'Ocean View Balcony' },
  { id: 3, src: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80', alt: 'Marble Bathroom' },
  { id: 4, src: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80', alt: 'King Bed Detail' },
  { id: 5, src: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?auto=format&fit=crop&w=800&q=80', alt: 'Lounge Seating' },
];

// Similar Rooms Data
const similarRooms = [
  {
    id: '2',
    name: 'Deluxe Garden View',
    image: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80',
    price: 270,
    guests: '2 Guests',
    size: '40 m²',
  },
  {
    id: '3',
    name: 'Executive Room',
    image: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=800&q=80',
    price: 380,
    guests: '2 Guests',
    size: '50 m²',
  },
  {
    id: '4',
    name: 'Executive Suite',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80',
    price: 520,
    guests: '3 Guests',
    size: '75 m²',
  },
];

const RoomDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(galleryImages[0].src);

  // Send the chosen room + dates + guests to the Booking page
  const handleReserve = (e) => {
    e.preventDefault();
    const { checkin, checkout, guestSelect } = e.currentTarget.elements;
    const params = new URLSearchParams({
      room: id,
      checkIn: checkin.value,
      checkOut: checkout.value,
      adults: guestSelect.value,
    });
    navigate(`/booking?${params.toString()}`);
  };

  return (
    <div className="room-details-wrapper">
      <main className="details-main-content">
        {/* 1. Breadcrumb Navigation */}
        <nav className="breadcrumb-container" aria-label="Breadcrumb">
          <div className="breadcrumb-inner">
            <Link to="/">Home</Link>
            <span className="breadcrumb-separator">/</span>
            <Link to="/rooms">Rooms</Link>
            <span className="breadcrumb-separator">/</span>
            <span className="breadcrumb-current">Deluxe Ocean View</span>
          </div>
        </nav>

        <div className="details-layout-container">
          {/* Left Column: Gallery, Overview, Amenities, Description, Policies */}
          <div className="details-left-column">
            {/* 2. Room Image Gallery */}
            <section className="room-gallery-section">
              <div className="main-image-wrapper">
                <img src={activeImage} alt="Featured Room Display" className="gallery-main-img" />
              </div>
              <div className="gallery-thumbnails">
                {galleryImages.map((img) => (
                  <button
                    key={img.id}
                    className={`thumbnail-btn ${activeImage === img.src ? 'active' : ''}`}
                    onClick={() => setActiveImage(img.src)}
                  >
                    <img src={img.src} alt={img.alt} />
                  </button>
                ))}
              </div>
            </section>

            {/* 3. Room Information */}
            <section className="room-info-header">
              <div className="info-title-badge-flex">
                <h1>Deluxe Ocean View</h1>
                <div className="rating-badge">
                  <span className="stars">★★★★★</span>
                  <span className="rating-score">4.9 Guest Rating</span>
                </div>
              </div>

              <div className="price-tag-mobile">
                <span className="price-amount">$120</span>
                <span className="price-unit">/ Night</span>
              </div>

              <p className="room-short-summary">
                Experience quintessential coastal living in our Deluxe Ocean View room. Designed with modern luxury, panoramic glass windows, and a private open-air balcony overlooking the sea.
              </p>

              {/* Room Key Features */}
              <div className="key-specs-grid">
                <div className="spec-card">
                  <span className="spec-icon">👥</span>
                  <div className="spec-text">
                    <span className="spec-title">Occupancy</span>
                    <span className="spec-value">2 Guests</span>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">🛏️</span>
                  <div className="spec-text">
                    <span className="spec-title">Bed Type</span>
                    <span className="spec-value">1 King Bed</span>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">📐</span>
                  <div className="spec-text">
                    <span className="spec-title">Room Size</span>
                    <span className="spec-value">45 m²</span>
                  </div>
                </div>
                <div className="spec-card">
                  <span className="spec-icon">🌊</span>
                  <div className="spec-text">
                    <span className="spec-title">View</span>
                    <span className="spec-value">Ocean View</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 4. Room Amenities */}
            <section className="room-amenities-section">
              <h2 className="section-title-sm">Room Amenities</h2>
              <div className="amenities-grid">
                <div className="amenity-item">
                  <span className="amenity-icon">📶</span>
                  <span>Free WiFi</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">❄️</span>
                  <span>Air Conditioning</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">📺</span>
                  <span>Smart TV</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🍷</span>
                  <span>Mini Bar</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🛎️</span>
                  <span>Room Service</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">☕</span>
                  <span>Coffee Machine</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🌅</span>
                  <span>Private Balcony</span>
                </div>
                <div className="amenity-item">
                  <span className="amenity-icon">🔒</span>
                  <span>In-Room Safe</span>
                </div>
              </div>
            </section>

            {/* 5. Room Detailed Description */}
            <section className="room-description-section">
              <h2 className="section-title-sm">About This Room</h2>
              <p>
                The Deluxe Ocean View room offers a seamlessly balanced sanctuary for relaxation and modern living. Flooded with natural daylight through expansive floor-to-ceiling glass doors, the room opens out to a spacious private terrace overlooking serene turquoise ocean waters.
              </p>
              <p>
                Outfitted with custom-designed handcrafted furniture, an executive work desk, an ultra-plush King mattress with 500-thread-count linens, and an indulgent marble-finished ensuite bathroom equipped with a rainfall shower and luxury toiletries.
              </p>
            </section>

            {/* 7. Room Policies */}
            <section className="room-policies-section">
              <h2 className="section-title-sm">Hotel & Room Policies</h2>
              <div className="policies-grid">
                <div className="policy-item">
                  <span className="policy-label">Check-in</span>
                  <span className="policy-value">From 2:00 PM</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Check-out</span>
                  <span className="policy-value">Until 12:00 PM</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Pets</span>
                  <span className="policy-value">Not allowed</span>
                </div>
                <div className="policy-item">
                  <span className="policy-label">Smoking</span>
                  <span className="policy-value">Strictly Non-smoking</span>
                </div>
              </div>
            </section>
          </div>

          {/* Right Column: Sticky Booking Card */}
          <div className="details-right-column">
            {/* 6. Booking Card */}
            <div className="sticky-booking-card">
              <div className="booking-card-header">
                <div className="card-price-display">
                  <span className="amount">$120</span>
                  <span className="unit">/ Night</span>
                </div>
                <span className="best-rate-badge">Direct Booking Guarantee</span>
              </div>

              <form onSubmit={handleReserve} className="booking-form">
                <div className="form-group">
                  <label htmlFor="checkin">Check In</label>
                  <input type="date" id="checkin" defaultValue="2026-10-01" required />
                </div>

                <div className="form-group">
                  <label htmlFor="checkout">Check Out</label>
                  <input type="date" id="checkout" defaultValue="2026-10-05" required />
                </div>

                <div className="form-group">
                  <label htmlFor="guestSelect">Guests</label>
                  <select id="guestSelect" defaultValue="2">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                  </select>
                </div>

                <div className="booking-price-breakdown">
                  <div className="breakdown-row">
                    <span>$120 × 4 Nights</span>
                    <span>$480</span>
                  </div>
                  <div className="breakdown-row">
                    <span>Service & Tax</span>
                    <span>$40</span>
                  </div>
                  <div className="breakdown-row total">
                    <span>Total</span>
                    <span>$520</span>
                  </div>
                </div>

                <button type="submit" className="btn-primary reserve-submit-btn">
                  Reserve This Room
                </button>
              </form>

              <div className="booking-guarantees">
                <div className="guarantee-item">
                  <span className="check-icon">✓</span>
                  <span>Free cancellation up to 48 hours prior</span>
                </div>
                <div className="guarantee-item">
                  <span className="check-icon">✓</span>
                  <span>Best price guarantee direct rate</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 8. Similar Rooms Section */}
        <section className="similar-rooms-section">
          <div className="similar-rooms-container">
            <div className="section-header">
              <span className="section-subtitle">MORE ACCOMMODATIONS</span>
              <h2 className="section-title">Similar Rooms & Suites</h2>
            </div>

            <div className="similar-rooms-grid">
              {similarRooms.map((room) => (
                <div key={room.id} className="similar-card">
                  <div className="similar-img-wrapper">
                    <img src={room.image} alt={room.name} />
                  </div>
                  <div className="similar-card-body">
                    <h3>{room.name}</h3>
                    <div className="similar-meta">
                      <span>👥 {room.guests}</span>
                      <span>📐 {room.size}</span>
                    </div>
                    <div className="similar-footer">
                      <span className="similar-price">${room.price} <span>/ Night</span></span>
                      <Link to={`/rooms/${room.id}`} className="btn-secondary similar-btn">
                        View Details
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default RoomDetails;