import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import '../css/Activities.css';

const activitiesData = [
  {
    id: 1,
    title: 'Water Sports & Jet Skiing',
    category: 'Adventure',
    icon: 'bi-tsunami',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&auto=format&fit=crop&q=80',
    duration: '2 Hours',
    description: 'Experience the thrill of riding the waves on luxury jet skis and banana boats guided by certified instructors.'
  },
  {
    id: 2,
    title: 'Sunset Luxury Cruise',
    category: 'Leisure',
    icon: 'bi-water',
    image: 'https://images.unsplash.com/photo-1500514966906-fe245eea9344?w=600&auto=format&fit=crop&q=80',
    duration: '3 Hours',
    description: 'Sail into the horizon on a private yacht with champagne, gourmet snacks, and live acoustic music.'
  },
  {
    id: 3,
    title: 'Morning Beach Yoga',
    category: 'Wellness',
    icon: 'bi-heart-pulse',
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&auto=format&fit=crop&q=80',
    duration: '1 Hour',
    description: 'Rebalance your mind and body with guided meditation and yoga sessions right on the golden sands.'
  },
  {
    id: 4,
    title: 'Guided City Cultural Tour',
    category: 'Culture',
    icon: 'bi-compass',
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=600&auto=format&fit=crop&q=80',
    duration: 'Half Day',
    description: 'Explore historical landmarks, vibrant local markets, and ancient heritage spots in air-conditioned comfort.'
  },
  {
    id: 5,
    title: 'Culinary Masterclass',
    category: 'Dining',
    icon: 'bi-egg-fried',
    image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?w=600&auto=format&fit=crop&q=80',
    duration: '2.5 Hours',
    description: 'Learn the secrets of authentic Sri Lankan cuisine and international dishes with our Michelin-experienced executive chefs.'
  },
  {
    id: 6,
    title: 'Scuba Diving & Snorkeling',
    category: 'Adventure',
    icon: 'bi-mask',
    image: 'https://images.unsplash.com/photo-1544551763-77ef2d0cfc6c?w=600&auto=format&fit=crop&q=80',
    duration: '3 Hours',
    description: 'Discover vibrant coral reefs, exotic marine life, and historic shipwrecks with top-tier diving gear.'
  }
];

const Activities = () => {
  return (
    <div className="activities-page">
      {/* Hero Section */}
      <section className="activities-hero">
        <div className="activities-hero-overlay"></div>
        <div className="activities-hero-content">
          <span className="badge-luxury-gold mb-2">EXPERIENCE & ADVENTURE</span>
          <h1 className="activities-hero-title">Hotel Activities</h1>
          <p className="activities-hero-subtitle">
            Curated experiences to make your stay extraordinary and unforgettable.
          </p>
        </div>
      </section>

      {/* Intro Section */}
      <section className="activities-intro container text-center">
        <span className="section-label">CURATED FOR YOU</span>
        <h2 className="section-heading">Unforgettable Memories Await</h2>
        <div className="section-underline"></div>
        <p className="activities-intro-text">
          Whether you seek thrilling water adventures, relaxing wellness journeys, or rich cultural explorations, 
          Serenity Grand Hotel offers bespoke activities tailored to every guest's desire.
        </p>
      </section>

      {/* Activities Grid */}
      <section className="activities-grid-section container">
        <div className="activities-grid">
          {activitiesData.map((activity) => (
            <div key={activity.id} className="activity-card">
              <div className="activity-img-wrapper">
                <img src={activity.image} alt={activity.title} className="activity-img" />
                <span className="activity-category">{activity.category}</span>
                <div className="activity-icon-badge">
                  <i className={`bi ${activity.icon}`}></i>
                </div>
              </div>
              <div className="activity-card-body">
                <div className="activity-meta">
                  <span><i className="bi bi-clock me-1"></i>{activity.duration}</span>
                </div>
                <h3 className="activity-title">{activity.title}</h3>
                <p className="activity-desc">{activity.description}</p>
                <Link to="/contact" className="btn-activity-book">
                  Reserve Experience <i className="bi bi-arrow-right ms-1"></i>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="activities-cta text-center">
        <div className="activities-cta-overlay"></div>
        <div className="activities-cta-content container">
          <h2>Need a Customized Experience?</h2>
          <p>Our dedicated concierge team is ready to craft a personalized itinerary just for you.</p>
          <Link to="/contact" className="btn btn-luxury-gold btn-lg">
            Contact Concierge
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Activities;