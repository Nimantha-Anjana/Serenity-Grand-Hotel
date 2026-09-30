import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/home.css';

const Home = () => {
  // Booking Form State (UI Only)
  const [bookingData, setBookingData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '2 Guests',
    roomType: 'Deluxe Ocean View'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    alert(`Checking availability for ${bookingData.roomType} from ${bookingData.checkIn || 'selected date'} to ${bookingData.checkOut || 'selected date'}.`);
  };

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <p className="hero-subtitle">WELCOME TO SERENITY GRAND</p>
          <h1 className="hero-title">Experience Luxury, Comfort & Unforgettable Hospitality</h1>
          <div className="hero-buttons">
            <Link to="/rooms" className="btn-primary">
              Explore Rooms
            </Link>
            <Link to="/rooms" className="btn-secondary">
              Book Your Stay
            </Link>
          </div>
        </div>
      </section>

      {/* 2. BOOKING SEARCH SECTION */}
      <section className="booking-search-container">
        <form className="booking-search-card" onSubmit={handleSearchSubmit}>
          <div className="booking-field">
            <label htmlFor="checkIn">Check In</label>
            <input
              type="date"
              id="checkIn"
              name="checkIn"
              value={bookingData.checkIn}
              onChange={handleInputChange}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="checkOut">Check Out</label>
            <input
              type="date"
              id="checkOut"
              name="checkOut"
              value={bookingData.checkOut}
              onChange={handleInputChange}
            />
          </div>

          <div className="booking-field">
            <label htmlFor="guests">Guests</label>
            <select
              id="guests"
              name="guests"
              value={bookingData.guests}
              onChange={handleInputChange}
            >
              <option value="1 Guest">1 Guest</option>
              <option value="2 Guests">2 Guests</option>
              <option value="3 Guests">3 Guests</option>
              <option value="4+ Guests">4+ Guests</option>
            </select>
          </div>

          <div className="booking-field">
            <label htmlFor="roomType">Room Type</label>
            <select
              id="roomType"
              name="roomType"
              value={bookingData.roomType}
              onChange={handleInputChange}
            >
              <option value="Deluxe Ocean View">Deluxe Ocean View</option>
              <option value="Executive Suite">Executive Suite</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>
          </div>

          <button type="submit" className="btn-search">
            Check Availability
          </button>
        </form>
      </section>

      {/* 3. WELCOME SECTION */}
      <section className="welcome-section section-padding">
        <div className="container welcome-grid">
          <div className="welcome-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1000&q=80"
              alt="Serenity Grand Resort Exterior"
              className="welcome-image"
            />
          </div>
          <div className="welcome-text-content">
            <span className="section-badge">WELCOME TO SERENITY GRAND</span>
            <h2 className="section-heading">A Place Where Luxury Meets Comfort</h2>
            <p className="welcome-description">
              Nestled in a breathtaking location, Serenity Grand Hotel offers an unmatched blend of elegance, tranquility, and personalized service. Whether you are traveling for relaxation or business, our world-class accommodations, exquisite dining, and soothing spa facilities guarantee a memory to treasure forever.
            </p>
            <Link to="/facilities" className="btn-primary">
              Discover More
            </Link>
          </div>
        </div>
      </section>

      {/* 4. FEATURED ROOMS */}
      <section className="featured-rooms-section section-padding">
        <div className="container">
          <div className="section-title-wrapper text-center">
            <span className="section-badge">ACCOMMODATION</span>
            <h2 className="section-heading">Our Featured Rooms</h2>
            <p className="section-subheading">Choose the perfect room tailored for your stay and comfort.</p>
          </div>

          <div className="rooms-grid">
            {/* Room 1 */}
            <div className="room-card">
              <div className="room-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1618773928121-c32242e63f39?auto=format&fit=crop&w=800&q=80"
                  alt="Deluxe Ocean View"
                />
              </div>
              <div className="room-card-body">
                <h3 className="room-title">Deluxe Room</h3>
                <p className="room-desc">Spacious luxury room offering panoramic views of the ocean with modern amenities.</p>
                <div className="room-info">
                  <span>👤 2 Guests</span>
                  <span>🛏️ 1 King Bed</span>
                </div>
                <div className="room-card-footer">
                  <div className="room-price">
                    <strong>$250</strong> <span>/ night</span>
                  </div>
                  <Link to="/rooms/1" className="btn-secondary-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Room 2 */}
            <div className="room-card">
              <div className="room-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=800&q=80"
                  alt="Executive Suite"
                />
              </div>
              <div className="room-card-body">
                <h3 className="room-title">Executive Suite</h3>
                <p className="room-desc">Designed for high privacy and ultimate comfort with an exclusive living area.</p>
                <div className="room-info">
                  <span>👤 2 - 3 Guests</span>
                  <span>🛏️ 1 Super King Bed</span>
                </div>
                <div className="room-card-footer">
                  <div className="room-price">
                    <strong>$420</strong> <span>/ night</span>
                  </div>
                  <Link to="/rooms/2" className="btn-secondary-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>

            {/* Room 3 */}
            <div className="room-card">
              <div className="room-image-wrapper">
                <img
                  src="https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=800&q=80"
                  alt="Presidential Suite"
                />
              </div>
              <div className="room-card-body">
                <h3 className="room-title">Presidential Suite</h3>
                <p className="room-desc">The ultimate pinnacle of opulence featuring private balcony and VIP services.</p>
                <div className="room-info">
                  <span>👤 4 Guests</span>
                  <span>🛏️ 2 Master Bedrooms</span>
                </div>
                <div className="room-card-footer">
                  <div className="room-price">
                    <strong>$750</strong> <span>/ night</span>
                  </div>
                  <Link to="/rooms/3" className="btn-secondary-sm">
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. HOTEL FACILITIES */}
      <section className="facilities-section section-padding">
        <div className="container">
          <div className="section-title-wrapper text-center">
            <span className="section-badge">SERVICES & AMENITIES</span>
            <h2 className="section-heading">Hotel Facilities</h2>
            <p className="section-subheading">Enjoy top-tier amenities designed for luxury and comfort.</p>
          </div>

          <div className="facilities-grid">
            <div className="facility-card">
              <div className="facility-icon">🏊‍♂️</div>
              <h3>Swimming Pool</h3>
              <p>Infinity edge pool with temperature control and sun loungers.</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🧘‍♀️</div>
              <h3>Spa & Wellness</h3>
              <p>Rejuvenate your senses with luxury body therapies and massages.</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">🏋️‍♂️</div>
              <h3>Fitness Center</h3>
              <p>State-of-the-art gym equipment with personal trainers available.</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">☕</div>
              <h3>Café & Lounge</h3>
              <p>Relaxed atmosphere with fresh coffee, healthy snacks, and free Wi-Fi.</p>
            </div>

            <div className="facility-card">
              <div className="facility-icon">📶</div>
              <h3>Free High-Speed WiFi</h3>
              <p>Seamless connectivity available throughout the entire property.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. DINING PREVIEW */}
      <section className="dining-preview-section section-padding">
        <div className="container dining-grid">
          <div className="dining-text-content">
            <span className="section-badge">EXQUISITE DINING</span>
            <h2 className="section-heading">Savor Exceptional Flavors</h2>
            <p className="dining-description">
              Indulge in an extraordinary culinary journey created by international chefs. From fine dining seafood to relaxing poolside drinks, every dish is crafted with passion using fresh local ingredients.
            </p>
            <Link to="/dining" className="btn-primary">
              Explore Dining
            </Link>
          </div>
          <div className="dining-image-wrapper">
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80"
              alt="Serenity Grand Restaurant"
              className="dining-image"
            />
          </div>
        </div>
      </section>

      {/* 7. GALLERY */}
      <section className="gallery-section section-padding">
        <div className="container">
          <div className="section-title-wrapper text-center">
            <span className="section-badge">MEMORIES</span>
            <h2 className="section-heading">Photo Gallery</h2>
            <p className="section-subheading">A glimpse into the Serenity Grand experience.</p>
          </div>

          <div className="gallery-grid">
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80" alt="Spa Room" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1571896349842-33c89424de2d?auto=format&fit=crop&w=600&q=80" alt="Resort View" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80" alt="Lobby Lounge" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=600&q=80" alt="Pool Side" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=600&q=80" alt="Restaurant Dish" />
            </div>
            <div className="gallery-item">
              <img src="https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&w=600&q=80" alt="Sunset View" />
            </div>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <section className="testimonials-section section-padding">
        <div className="container">
          <div className="section-title-wrapper text-center">
            <span className="section-badge">GUEST REVIEWS</span>
            <h2 className="section-heading">What Our Guests Say</h2>
            <p className="section-subheading">Real stories from our beloved guests.</p>
          </div>

          <div className="testimonials-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-quote">
                "Our stay at Serenity Grand was beyond perfection. The staff was incredibly welcoming, and the ocean view from our room was breathtaking!"
              </p>
              <h4 className="guest-name">Sarah Williams</h4>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-quote">
                "An absolute haven of peace and luxury. The dining experience was world-class and the spa treatments restored our energy completely."
              </p>
              <h4 className="guest-name">Daniel Perera</h4>
            </div>

            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p className="testimonial-quote">
                "The attention to detail in every aspect of the service was top notch. We cannot wait to return for our next holiday season!"
              </p>
              <h4 className="guest-name">Emma Johnson</h4>
            </div>
          </div>
        </div>
      </section>

      {/* 9. FINAL CTA */}
      <section className="cta-section">
        <div className="cta-overlay"></div>
        <div className="container cta-content">
          <h2>Your Perfect Stay Awaits</h2>
          <p>Experience exceptional hospitality and unforgettable memories at Serenity Grand Hotel.</p>
          <Link to="/rooms" className="btn-primary-lg">
            Book Your Stay
          </Link>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;