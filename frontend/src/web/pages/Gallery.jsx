import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import { galleryImages } from '../data/gallery';
import '../css/Gallery.css';

function Gallery() {
  const [category, setCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);

  // Only images that the admin has marked as "Published" appear on the website
  const published = useMemo(
    () =>
      galleryImages
        .filter((img) => img.status === 'Published')
        .sort((a, b) => a.displayOrder - b.displayOrder),
    []
  );

  const categories = useMemo(
    () => ['All', ...new Set(published.map((img) => img.category))],
    [published]
  );

  const visible = useMemo(
    () => (category === 'All' ? published : published.filter((img) => img.category === category)),
    [published, category]
  );

  const isOpen = activeIndex !== null;

  const handleCategory = (cat) => {
    setCategory(cat);
    setActiveIndex(null);
  };

  const showPrev = () => setActiveIndex((i) => (i - 1 + visible.length) % visible.length);
  const showNext = () => setActiveIndex((i) => (i + 1) % visible.length);

  // Keyboard controls + scroll lock while the lightbox is open
  useEffect(() => {
    if (!isOpen) return undefined;

    const total = visible.length;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveIndex(null);
      if (e.key === 'ArrowLeft') setActiveIndex((i) => (i - 1 + total) % total);
      if (e.key === 'ArrowRight') setActiveIndex((i) => (i + 1) % total);
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen, visible.length]);

  const activeImage = isOpen ? visible[activeIndex] : null;

  return (
    <div className="gallery-page">
      {/* 1. HERO */}
      <section className="gallery-hero">
        <div className="gallery-hero-overlay"></div>
        <div className="gallery-hero-content">
          <h1 className="gallery-hero-title">Our Gallery</h1>
          <p className="gallery-hero-subtitle">A glimpse into the elegance and serenity of our hotel.</p>
        </div>
      </section>

      {/* 2. FILTERS + GRID */}
      <section className="gallery-section">
        <div className="gallery-container">
          <div className="gallery-heading">
            <span className="gallery-label">PHOTO GALLERY</span>
            <h2 className="gallery-title">Moments Worth Remembering</h2>
            <div className="gallery-divider"></div>
          </div>

          <div className="gallery-filters" role="tablist" aria-label="Gallery categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={category === cat}
                className={`gallery-filter-btn ${category === cat ? 'active' : ''}`}
                onClick={() => handleCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="gallery-grid">
            {visible.map((img, index) => (
              <button
                key={img.id}
                type="button"
                className="gallery-item"
                onClick={() => setActiveIndex(index)}
                aria-label={`View ${img.title}`}
              >
                <img src={img.url} alt={img.title} loading="lazy" className="gallery-item-img" />
                <div className="gallery-item-overlay">
                  <span className="gallery-item-category">{img.category}</span>
                  <span className="gallery-item-title">{img.title}</span>
                </div>
              </button>
            ))}
          </div>

          {visible.length === 0 && <p className="gallery-empty">No photos in this category yet.</p>}
        </div>
      </section>

      {/* 3. CTA */}
      <section className="gallery-cta">
        <h2>Ready to Experience It Yourself?</h2>
        <p>Book your stay and step into the scenes you have just seen.</p>
        <Link to="/booking" className="gallery-cta-btn">Book Your Stay</Link>
      </section>

      {/* LIGHTBOX */}
      {activeImage && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={activeImage.title} onClick={() => setActiveIndex(null)}>
          <button type="button" className="lightbox-close" aria-label="Close" onClick={() => setActiveIndex(null)}>
            &times;
          </button>

          {visible.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-prev"
              aria-label="Previous image"
              onClick={(e) => {
                e.stopPropagation();
                showPrev();
              }}
            >
              &#8249;
            </button>
          )}

          <figure className="lightbox-figure" onClick={(e) => e.stopPropagation()}>
            <img src={activeImage.url} alt={activeImage.title} className="lightbox-img" />
            <figcaption className="lightbox-caption">
              <span className="lightbox-category">{activeImage.category}</span>
              <h3>{activeImage.title}</h3>
              <p>{activeImage.description}</p>
              <span className="lightbox-counter">
                {activeIndex + 1} / {visible.length}
              </span>
            </figcaption>
          </figure>

          {visible.length > 1 && (
            <button
              type="button"
              className="lightbox-nav lightbox-next"
              aria-label="Next image"
              onClick={(e) => {
                e.stopPropagation();
                showNext();
              }}
            >
              &#8250;
            </button>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Gallery;
