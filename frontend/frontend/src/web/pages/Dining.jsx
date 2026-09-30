import React from 'react';
import Footer from '../components/Footer';
import '../css/Dining.css';

function Dining() {
  const restaurants = [
    {
      id: 1,
      name: 'The Grand Restaurant',
      image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=800&q=80',
      description: 'Indulge in an exquisite selection of international cuisine masterfully prepared by top chefs in an elegant fine dining environment.',
      hours: '6:30 AM - 10:30 PM',
    },
    {
      id: 2,
      name: 'Ocean View Café',
      image: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
      description: 'Relaxed beachfront dining offering artisanal coffees, freshly baked pastries, light bites, and panoramic ocean vistas.',
      hours: '7:00 AM - 8:00 PM',
    },
    {
      id: 3,
      name: 'Sunset Lounge',
      image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80',
      description: 'Sip signature cocktails and fine wines while enjoying handcrafted gourmet tapas in a sophisticated evening atmosphere.',
      hours: '4:00 PM - 1:00 AM',
    },
  ];

  const mealExperiences = [
    {
      id: 1,
      title: 'Gourmet Breakfast',
      image: 'https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?auto=format&fit=crop&w=600&q=80',
      description: 'Start your day with freshly brewed coffee, tropical fruits, hot pastries, and custom egg selections.',
      time: '6:30 AM - 10:30 AM',
    },
    {
      id: 2,
      title: 'Coastal Lunch',
      image: 'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?auto=format&fit=crop&w=600&q=80',
      description: 'Enjoy crisp seasonal salads, fresh local seafood, and refreshing cold drinks under the tropical shade.',
      time: '12:30 PM - 3:00 PM',
    },
    {
      id: 3,
      title: 'Candlelight Dinner',
      image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80',
      description: 'An enchanting multi-course dining experience paired with sommelier-curated vintage wines.',
      time: '7:00 PM - 10:30 PM',
    },
  ];

  const galleryImages = [
    { id: 1, src: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=600&q=80', alt: 'Fine dining dish' },
    { id: 2, src: 'https://images.unsplash.com/photo-1559339352-11d035aa65de?auto=format&fit=crop&w=600&q=80', alt: 'Cocktails at bar' },
    { id: 3, src: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=600&q=80', alt: 'Artisan Pizza' },
    { id: 4, src: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80', alt: 'Dessert plate' },
    { id: 5, src: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80', alt: 'Gourmet steak' },
    { id: 6, src: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=600&q=80', alt: 'Wine pouring' },
  ];

  return (
    <div className="dining-page">
      {/* 1. HERO SECTION */}
      <section className="dining-hero">
        <div className="dining-hero-overlay"></div>
        <div className="dining-hero-content">
          <h1 className="dining-hero-title">Exceptional Dining</h1>
          <p className="dining-hero-subtitle">Savor unforgettable flavors and extraordinary moments.</p>
        </div>
      </section>

      {/* 2. INTRODUCTION SECTION */}
      <section className="dining-intro">
        <div className="dining-container text-center">
          <span className="section-small-label">DINE WITH US</span>
          <h2 className="section-title">A Culinary Journey Awaits</h2>
          <div className="gold-divider"></div>
          <p className="section-description">
            At Serenity Grand Hotel, every dish is crafted as a masterpiece. From authentic Sri Lankan spice infusions to refined international gastronomy, our talented culinary team brings passion and art to your table. Immerse yourself in remarkable ocean views, world-class ambience, and flawless service.
          </p>
        </div>
      </section>

      {/* 3. RESTAURANTS SECTION */}
      <section className="dining-restaurants">
        <div className="dining-container">
          <div className="restaurants-grid">
            {restaurants.map((restaurant) => (
              <div key={restaurant.id} className="restaurant-card">
                <div className="restaurant-image-wrapper">
                  <img src={restaurant.image} alt={restaurant.name} className="restaurant-image" />
                </div>
                <div className="restaurant-info">
                  <h3 className="restaurant-name">{restaurant.name}</h3>
                  <p className="restaurant-desc">{restaurant.description}</p>
                  <div className="restaurant-hours">
                    <span className="hours-icon">🕒</span> {restaurant.hours}
                  </div>
                  <button className="btn-menu">Explore Menu</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. MEAL EXPERIENCE SECTION */}
      <section className="meal-experiences">
        <div className="dining-container">
          <div className="text-center">
            <span className="section-small-label">CURATED MENUS</span>
            <h2 className="section-title">Daily Culinary Experiences</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="meal-grid">
            {mealExperiences.map((meal) => (
              <div key={meal.id} className="meal-card">
                <div className="meal-image-wrapper">
                  <img src={meal.image} alt={meal.title} className="meal-image" />
                </div>
                <div className="meal-card-content">
                  <span className="meal-time">{meal.time}</span>
                  <h3 className="meal-title">{meal.title}</h3>
                  <p className="meal-desc">{meal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOOD GALLERY SECTION */}
      <section className="dining-gallery">
        <div className="dining-container">
          <div className="text-center">
            <span className="section-small-label">VISUAL DELIGHTS</span>
            <h2 className="section-title">Culinary Gallery</h2>
            <div className="gold-divider"></div>
          </div>
          <div className="gallery-grid">
            {galleryImages.map((img) => (
              <div key={img.id} className="gallery-item">
                <img src={img.src} alt={img.alt} className="gallery-img" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. SPECIAL DINING CTA */}
      <section className="dining-cta">
        <div className="dining-cta-overlay"></div>
        <div className="dining-cta-content">
          <h2 className="cta-title">Make Every Meal Memorable</h2>
          <p className="cta-text">Enjoy exceptional cuisine in an unforgettable setting.</p>
          <button className="btn-cta-gold">Reserve a Table</button>
        </div>
      </section>

      {/* 7. FOOTER */}
      <Footer />
    </div>
  );
}

export default Dining;