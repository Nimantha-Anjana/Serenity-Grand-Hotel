import React, { useState } from 'react';
import Footer from '../components/Footer'; // Adjust path if needed
import '../css/Contact.css';

const Contact = () => {
  // Booking Form State
  const [bookingData, setBookingData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    checkIn: '',
    checkOut: '',
    adults: '1',
    children: '0',
    roomType: 'deluxe',
    specialRequests: ''
  });

  // Contact Form State
  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  // Accordion State for FAQ
  const [activeFaq, setActiveFaq] = useState(null);

  const handleBookingChange = (e) => {
    setBookingData({ ...bookingData, [e.target.name]: e.target.value });
  };

  const handleContactChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your booking request! We will contact you shortly.');
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! Our team will get back to you soon.');
  };

  const toggleFaq = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const faqs = [
    {
      question: 'What time is check-in?',
      answer: 'Standard check-in time is 2:00 PM, and check-out is 12:00 PM. Early check-in or late check-out can be requested based on availability.'
    },
    {
      question: 'Do you provide airport transfers?',
      answer: 'Yes, we provide private airport pick-up and drop-off services upon request. Please notify us of your flight details at least 24 hours in advance.'
    },
    {
      question: 'Is WiFi available?',
      answer: 'High-speed complimentary Wi-Fi is available across all luxury suites, dining areas, and public hotel spaces.'
    },
    {
      question: 'Can I cancel my booking?',
      answer: 'Cancellations made up to 48 hours prior to arrival are eligible for a full refund. Please review specific rate terms during booking.'
    }
  ];

  return (
    <div className="contact-page">
      {/* 1. HERO SECTION */}
      <header className="hero-section">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Plan Your Stay</h1>
          <p>We're here to help make your stay exceptional.</p>
        </div>
      </header>

      {/* 2. CONTACT INFORMATION CARDS */}
      <section className="contact-info-section container">
        <div className="info-grid">
          <div className="info-card">
            <div className="info-icon">📍</div>
            <h3>Location</h3>
            <p>123 Galle Road, Colombo, Sri Lanka</p>
          </div>
          <div className="info-card">
            <div className="info-icon">📞</div>
            <h3>Phone</h3>
            <p>+94 11 234 5678</p>
          </div>
          <div className="info-card">
            <div className="info-icon">✉️</div>
            <h3>Email</h3>
            <p>info@serenitygrand.com</p>
          </div>
          <div className="info-card">
            <div className="info-icon">⏰</div>
            <h3>Reception</h3>
            <p>Open 24 Hours</p>
          </div>
        </div>
      </section>

      {/* FORMS & MAP SECTION CONTAINER */}
      <section className="forms-section container">
        <div className="forms-grid">
          
          {/* 3. BOOKING FORM */}
          <div className="form-wrapper booking-form-wrapper">
            <div className="section-title-wrapper">
              <h2>Reserve Your Luxury Suite</h2>
              <div className="gold-divider"></div>
            </div>

            <form onSubmit={handleBookingSubmit} className="styled-form">
              <div className="form-row">
                <div className="form-group">
                  <label>First Name</label>
                  <input
                    type="text"
                    name="firstName"
                    value={bookingData.firstName}
                    onChange={handleBookingChange}
                    required
                    placeholder="John"
                  />
                </div>
                <div className="form-group">
                  <label>Last Name</label>
                  <input
                    type="text"
                    name="lastName"
                    value={bookingData.lastName}
                    onChange={handleBookingChange}
                    required
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={bookingData.email}
                    onChange={handleBookingChange}
                    required
                    placeholder="john@example.com"
                  />
                </div>
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={bookingData.phone}
                    onChange={handleBookingChange}
                    required
                    placeholder="+94 7X XXX XXXX"
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Check In</label>
                  <input
                    type="date"
                    name="checkIn"
                    value={bookingData.checkIn}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Check Out</label>
                  <input
                    type="date"
                    name="checkOut"
                    value={bookingData.checkOut}
                    onChange={handleBookingChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Adults</label>
                  <select name="adults" value={bookingData.adults} onChange={handleBookingChange}>
                    <option value="1">1 Adult</option>
                    <option value="2">2 Adults</option>
                    <option value="3">3 Adults</option>
                    <option value="4+">4+ Adults</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Children</label>
                  <select name="children" value={bookingData.children} onChange={handleBookingChange}>
                    <option value="0">None</option>
                    <option value="1">1 Child</option>
                    <option value="2">2 Children</option>
                    <option value="3+">3+ Children</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Room Type</label>
                <select name="roomType" value={bookingData.roomType} onChange={handleBookingChange}>
                  <option value="deluxe">Deluxe Ocean Suite</option>
                  <option value="grand">Grand Executive Suite</option>
                  <option value="presidential">Presidential Suite</option>
                  <option value="family">Family Luxury Suite</option>
                </select>
              </div>

              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  name="specialRequests"
                  rows="3"
                  value={bookingData.specialRequests}
                  onChange={handleBookingChange}
                  placeholder="Airport pickup, dietary needs, late arrival..."
                ></textarea>
              </div>

              <button type="submit" className="btn btn-primary">
                Request Booking
              </button>
            </form>
          </div>

          {/* RIGHT COLUMN: CONTACT FORM + MAP */}
          <div className="side-column">
            
            {/* 4. CONTACT FORM */}
            <div className="form-wrapper contact-form-wrapper">
              <div className="section-title-wrapper">
                <h2>Send Us a Message</h2>
                <div className="gold-divider"></div>
              </div>

              <form onSubmit={handleContactSubmit} className="styled-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    required
                    placeholder="Your Full Name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    required
                    placeholder="yourname@domain.com"
                  />
                </div>

                <div className="form-group">
                  <label>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={contactData.subject}
                    onChange={handleContactChange}
                    required
                    placeholder="General Inquiry / Dining / Spa"
                  />
                </div>

                <div className="form-group">
                  <label>Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={contactData.message}
                    onChange={handleContactChange}
                    required
                    placeholder="How can we assist you today?"
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-secondary">
                  Send Message
                </button>
              </form>
            </div>

            {/* 5. MAP SECTION (STATIC PLACEHOLDER) */}
            <div className="map-card">
              <div className="map-placeholder-bg">
                <div className="map-grid-pattern"></div>
                <div className="map-pin">
                  <span className="pin-pulse"></span>
                  📍
                </div>
                <div className="map-card-info">
                  <h3>Serenity Grand Hotel</h3>
                  <p>Colombo, Sri Lanka</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. FAQ SECTION */}
      <section className="faq-section container">
        <div className="section-title-wrapper text-center">
          <h2>Frequently Asked Questions</h2>
          <div className="gold-divider center"></div>
        </div>

        <div className="faq-accordion">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`faq-item ${activeFaq === index ? 'active' : ''}`}
              onClick={() => toggleFaq(index)}
            >
              <div className="faq-question">
                <h3>{faq.question}</h3>
                <span className="faq-toggle-icon">
                  {activeFaq === index ? '−' : '+'}
                </span>
              </div>
              {activeFaq === index && (
                <div className="faq-answer">
                  <p>{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* 7. FINAL CTA */}
      <section className="cta-section">
        <div className="cta-content container">
          <h2>Have Questions?</h2>
          <p>Our team is always happy to assist you.</p>
          <a href="tel:+94112345678" className="btn btn-gold">
            Call Us
          </a>
        </div>
      </section>

      {/* 8. FOOTER */}
      <Footer />
    </div>
  );
};

export default Contact;