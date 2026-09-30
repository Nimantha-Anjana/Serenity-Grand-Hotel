import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { services } from '../data/services';
import '../css/Services.css';

// Emoji per category (the public site does not use the admin's Bootstrap icons)
const CATEGORY_ICONS = {
  Wellness: '🧖',
  Transportation: '🚗',
  Dining: '🍽️',
  Events: '💐',
  Business: '💼',
  Recreation: '🏋️',
  'Guest Services': '🛎️',
};

// "08:00" -> "8:00 AM"
const formatTime = (time) => {
  const [h, m] = time.split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  const hour = h % 12 === 0 ? 12 : h % 12;
  return `${hour}:${String(m).padStart(2, '0')} ${suffix}`;
};

const formatHours = (service) =>
  service.openingTime === '00:00' && service.closingTime === '23:59'
    ? 'Open 24 hours'
    : `${formatTime(service.openingTime)} - ${formatTime(service.closingTime)}`;

function Services() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [openId, setOpenId] = useState(null);

  // Only services that the admin has marked "Active" appear on the website
  const activeServices = useMemo(() => services.filter((s) => s.status === 'Active'), []);

  const categories = useMemo(
    () => ['All', ...new Set(activeServices.map((s) => s.category))],
    [activeServices]
  );

  // Category lives in the URL (?category=Wellness) so it can be linked to, e.g. from /spa
  const requested = searchParams.get('category');
  const category = categories.includes(requested) ? requested : 'All';

  const handleCategory = (cat) => {
    setOpenId(null);
    if (cat === 'All') {
      setSearchParams({});
    } else {
      setSearchParams({ category: cat });
    }
  };

  const visible = category === 'All' ? activeServices : activeServices.filter((s) => s.category === category);

  return (
    <div className="services-page">
      {/* 1. HERO */}
      <section className="services-hero">
        <div className="services-hero-overlay"></div>
        <div className="services-hero-content">
          <h1 className="services-hero-title">Hotel Services</h1>
          <p className="services-hero-subtitle">Thoughtful extras that make every stay effortless.</p>
        </div>
      </section>

      {/* 2. FILTERS + GRID */}
      <section className="services-section">
        <div className="services-container">
          <div className="services-heading">
            <span className="services-label">AT YOUR SERVICE</span>
            <h2 className="services-title">Comfort, Care and Convenience</h2>
            <div className="services-divider"></div>
          </div>

          <div className="services-filters" role="tablist" aria-label="Service categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                className={`services-filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="services-grid">
            {visible.map((service) => {
              const isOpen = openId === service.id;
              return (
                <article key={service.id} className="service-card">
                  <div className="service-image-wrapper">
                    <img src={service.image} alt={service.name} loading="lazy" className="service-image" />
                    {service.isFeatured && <span className="service-badge">Featured</span>}
                    <span className="service-icon" aria-hidden="true">
                      {CATEGORY_ICONS[service.category] || '✨'}
                    </span>
                  </div>

                  <div className="service-info">
                    <span className="service-category">{service.category}</span>
                    <h3 className="service-name">{service.name}</h3>
                    <p className="service-desc">{isOpen ? service.fullDesc : service.shortDesc}</p>

                    <ul className="service-meta">
                      <li>
                        <span aria-hidden="true">🕒</span> {formatHours(service)}
                      </li>
                      <li>
                        <span aria-hidden="true">📅</span> {service.availability}
                      </li>
                    </ul>

                    <div className="service-footer">
                      <span className="service-price">{service.price}</span>
                      <button
                        type="button"
                        className="service-toggle"
                        aria-expanded={isOpen}
                        onClick={() => setOpenId(isOpen ? null : service.id)}
                      >
                        {isOpen ? 'Show Less' : 'Learn More'}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {visible.length === 0 && <p className="services-empty">No services in this category yet.</p>}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="services-cta">
        <h2>Need Something Special?</h2>
        <p>Our concierge team can arrange transfers, celebrations and personal requests for your stay.</p>
        <Link to="/contact" className="services-cta-btn">Contact Concierge</Link>
      </section>

      <Footer />
    </div>
  );
}

export default Services;
