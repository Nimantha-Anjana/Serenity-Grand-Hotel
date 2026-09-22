import React, { useState } from 'react';
import '../css/Services.css';

const INITIAL_SERVICES = [
  {
    id: 1,
    name: 'Airport Transfer',
    shortDesc: 'Comfortable private transportation from the airport to the hotel.',
    fullDesc: 'Enjoy seamless, stress-free travel with our luxury chauffeur service. Vehicles are equipped with high-speed Wi-Fi, refreshments, and climate control.',
    category: 'Transportation',
    price: 'From $35',
    availability: '24/7 Service',
    openingTime: '00:00',
    closingTime: '23:59',
    icon: 'bi-car-front-fill',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: true
  },
  {
    id: 2,
    name: 'Spa & Wellness',
    shortDesc: 'Relax and refresh with our professional spa treatments.',
    fullDesc: 'Indulge in holistic body massages, organic facials, and aromatherapy tailored by world-class spa therapists in an atmosphere of ultimate tranquil luxury.',
    category: 'Wellness',
    price: 'From $40',
    availability: 'Daily',
    openingTime: '08:00',
    closingTime: '21:00',
    icon: 'bi-flower2',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: true
  },
  {
    id: 3,
    name: 'Room Service',
    shortDesc: 'Enjoy delicious meals and beverages delivered directly to your room.',
    fullDesc: 'Order from our curated in-room dining menu crafted by top Mediterranean chefs. Delivered fresh, hot, and elegant right to your door at any hour.',
    category: 'Dining',
    price: 'Available 24/7',
    availability: '24/7 Service',
    openingTime: '00:00',
    closingTime: '23:59',
    icon: 'bi-cup-hot-fill',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: false
  },
  {
    id: 4,
    name: 'Laundry Service',
    shortDesc: 'Professional laundry and pressing service for hotel guests.',
    fullDesc: 'Same-day eco-friendly dry cleaning, delicate garment care, and express pressing services handled by experienced valet personnel.',
    category: 'Guest Services',
    price: 'From $10',
    availability: 'Weekdays & Weekends',
    openingTime: '07:00',
    closingTime: '19:00',
    icon: 'bi-basket2-fill',
    image: 'https://images.unsplash.com/photo-1517677208171-0bc6725a3e60?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: false
  },
  {
    id: 5,
    name: 'Event & Wedding Services',
    shortDesc: 'Complete event planning and elegant wedding arrangements.',
    fullDesc: 'Host grand celebrations in our oceanfront ballrooms. Our dedicated event coordinators manage floral decor, gourmet catering, audio-visual setups, and guest stays.',
    category: 'Events',
    price: 'Contact us',
    availability: 'By Appointment',
    openingTime: '09:00',
    closingTime: '18:00',
    icon: 'bi-stars',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: true
  },
  {
    id: 6,
    name: 'Airport Pickup',
    shortDesc: 'Private airport pickup service available for hotel guests.',
    fullDesc: 'Personalized meet-and-greet service right at the arrival lounge. Luggage handling included with luxury SUV fleet options.',
    category: 'Transportation',
    price: 'From $35',
    availability: '24/7 Service',
    openingTime: '00:00',
    closingTime: '23:59',
    icon: 'bi-taxi-front-fill',
    image: 'https://images.unsplash.com/photo-1563720223185-11003d516935?w=500&auto=format&fit=crop&q=80',
    status: 'Inactive',
    isFeatured: false
  },
  {
    id: 7,
    name: 'Business Center',
    shortDesc: 'Professional workspace and business facilities for guests.',
    fullDesc: 'Equipped with high-speed workstations, secure printing, scanning, private video-conferencing pods, and secretarial support upon request.',
    category: 'Business',
    price: 'Complimentary',
    availability: 'Daily',
    openingTime: '06:00',
    closingTime: '22:00',
    icon: 'bi-laptop',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: false
  },
  {
    id: 8,
    name: 'Fitness Center',
    shortDesc: 'Modern fitness equipment and wellness facilities.',
    fullDesc: 'State-of-the-art TechnoGym cardio machinery, free weights, personal trainers on request, and complimentary sauna access.',
    category: 'Recreation',
    price: 'Complimentary',
    availability: 'Daily',
    openingTime: '05:00',
    closingTime: '23:00',
    icon: 'bi-heart-pulse-fill',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=500&auto=format&fit=crop&q=80',
    status: 'Active',
    isFeatured: true
  }
];

const CATEGORIES = ['All', 'Wellness', 'Transportation', 'Dining', 'Events', 'Business', 'Recreation', 'Guest Services'];

export default function Services() {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Modals state
  const [viewService, setViewService] = useState(null);
  const [editService, setEditService] = useState(null);
  const [deleteService, setDeleteService] = useState(null);

  // Filter Logic
  const filteredServices = services.filter((s) => {
    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.shortDesc.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory = categoryFilter === 'All' || s.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || s.status === statusFilter;
    const matchesFeatured =
      featuredFilter === 'All' ||
      (featuredFilter === 'Featured' && s.isFeatured) ||
      (featuredFilter === 'Regular' && !s.isFeatured);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  // Calculate Statistics
  const totalCount = services.length;
  const activeCount = services.filter((s) => s.status === 'Active').length;
  const inactiveCount = services.filter((s) => s.status === 'Inactive').length;
  const featuredCount = services.filter((s) => s.isFeatured).length;

  // Form Submission (Add/Edit)
  const handleSaveService = (e) => {
    e.preventDefault();
    if (editService.id) {
      setServices((prev) => prev.map((s) => (s.id === editService.id ? editService : s)));
    } else {
      setServices((prev) => [...prev, { ...editService, id: Date.now() }]);
    }
    setEditService(null);
  };

  // Delete Action
  const handleDeleteConfirm = () => {
    setServices((prev) => prev.filter((s) => s.id !== deleteService.id));
    setDeleteService(null);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setFeaturedFilter('All');
  };

  return (
    <div className="services-page">
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h2 mb-1 text-primary-navy fw-bold">Services</h1>
          <p className="text-muted mb-0">Manage hotel services and guest experiences.</p>
        </div>
        <button
          className="btn btn-luxury-gold mt-3 mt-md-0 d-flex align-items-center gap-2"
          onClick={() =>
            setEditService({
              name: '',
              shortDesc: '',
              fullDesc: '',
              category: 'Wellness',
              price: '',
              availability: 'Daily',
              openingTime: '08:00',
              closingTime: '20:00',
              icon: 'bi-stars',
              image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=500&auto=format&fit=crop&q=80',
              status: 'Active',
              isFeatured: false
            })
          }
        >
          <i className="bi bi-plus-lg"></i>
          <span>+ Add Service</span>
        </button>
      </div>

      {/* 2. Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-navy-subtle text-primary">
              <i className="bi bi-grid-3x3-gap-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Total Services</div>
              <div className="h3 mb-0 fw-bold text-dark">{totalCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-check-circle-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Active Services</div>
              <div className="h3 mb-0 fw-bold text-dark">{activeCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-danger-subtle text-danger">
              <i className="bi bi-x-circle-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Inactive Services</div>
              <div className="h3 mb-0 fw-bold text-dark">{inactiveCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-gold-subtle text-gold">
              <i className="bi bi-star-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Featured Services</div>
              <div className="h3 mb-0 fw-bold text-dark">{featuredCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="card card-luxury p-3 mb-4 border-0">
        <div className="row g-3">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 search-input"
                placeholder="Search service..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select luxury-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="col-6 col-md-2 col-lg-2">
            <select
              className="form-select luxury-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-2">
            <select
              className="form-select luxury-select"
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              <option value="All">All Types</option>
              <option value="Featured">Featured Only</option>
              <option value="Regular">Regular Only</option>
            </select>
          </div>

          <div className="col-6 col-md-12 col-lg-3 d-flex gap-2 justify-content-end">
            <button className="btn btn-luxury-navy flex-grow-1" title="Apply Filter">
              <i className="bi bi-funnel me-1"></i>Filter
            </button>
            <button
              className="btn btn-outline-secondary d-flex align-items-center justify-content-center"
              title="Reset Filters"
              onClick={handleResetFilters}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Services Grid Cards */}
      <div className="row g-4 mb-4">
        {filteredServices.length > 0 ? (
          filteredServices.map((srv) => (
            <div className="col-12 col-md-6 col-lg-4" key={srv.id}>
              <div className="card card-luxury service-card h-100 border-0 overflow-hidden">
                <div className="service-img-wrapper position-relative">
                  <img src={srv.image} alt={srv.name} className="card-img-top service-img" />
                  
                  {/* Badges Container */}
                  <div className="position-absolute top-0 start-0 m-3 d-flex flex-column gap-1">
                    {srv.isFeatured && (
                      <span className="badge bg-gold text-dark font-weight-bold shadow-sm">
                        <i className="bi bi-star-fill me-1"></i>Featured
                      </span>
                    )}
                  </div>
                  
                  <span
                    className={`badge service-status-badge position-absolute top-0 end-0 m-3 ${
                      srv.status === 'Active' ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {srv.status}
                  </span>
                </div>

                <div className="card-body p-4 d-flex flex-column">
                  <div className="d-flex align-items-center gap-2 mb-2">
                    <i className={`bi ${srv.icon} text-gold fs-5`}></i>
                    <h3 className="card-title h5 text-dark fw-bold mb-0">{srv.name}</h3>
                  </div>

                  <span className="badge bg-light text-muted border border-light align-self-start mb-2 fs-8">
                    {srv.category}
                  </span>

                  <p className="text-muted fs-7 mb-3 service-short-desc">{srv.shortDesc}</p>

                  <div className="mt-auto pt-3 border-top border-light">
                    <div className="d-flex justify-content-between align-items-center mb-3">
                      <span className="text-muted fs-8 d-flex align-items-center gap-1">
                        <i className="bi bi-clock text-primary-navy"></i>
                        {srv.availability}
                      </span>
                      <span className="fw-bold text-gold fs-7">{srv.price}</span>
                    </div>

                    <div className="d-flex gap-2">
                      <button
                        className="btn btn-sm btn-outline-primary flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        onClick={() => setViewService(srv)}
                      >
                        <i className="bi bi-eye"></i> View
                      </button>
                      <button
                        className="btn btn-sm btn-outline-warning text-dark flex-grow-1 d-flex align-items-center justify-content-center gap-1"
                        onClick={() => setEditService({ ...srv })}
                      >
                        <i className="bi bi-pencil"></i> Edit
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger d-flex align-items-center justify-content-center"
                        onClick={() => setDeleteService(srv)}
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="card card-luxury border-0 p-5 text-center text-muted">
              <i className="bi bi-grid-3x3-gap fs-1 d-block mb-2 text-secondary"></i>
              No hotel services found matching your filters.
            </div>
          </div>
        )}
      </div>

      {/* 5. Pagination */}
      <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 card card-luxury border-0 mb-4">
        <span className="text-muted fs-7 mb-2 mb-sm-0">
          Showing <strong className="text-dark">{filteredServices.length}</strong> of{' '}
          <strong className="text-dark">{totalCount}</strong> services
        </span>
        <nav>
          <ul className="pagination pagination-sm mb-0 luxury-pagination">
            <li className="page-item disabled">
              <button className="page-link">Previous</button>
            </li>
            <li className="page-item active">
              <button className="page-link">1</button>
            </li>
            <li className="page-item">
              <button className="page-link">2</button>
            </li>
            <li className="page-item">
              <button className="page-link">3</button>
            </li>
            <li className="page-item">
              <button className="page-link">Next</button>
            </li>
          </ul>
        </nav>
      </div>

      {/* 6. View Details Modal */}
      {viewService && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <div className="d-flex align-items-center gap-2">
                <i className={`bi ${viewService.icon} text-gold fs-4`}></i>
                <h2 className="h4 mb-0 text-primary-navy">{viewService.name}</h2>
              </div>
              <button type="button" className="btn-close" onClick={() => setViewService(null)}></button>
            </div>

            <div className="modal-body-custom">
              <div className="position-relative mb-3">
                <img
                  src={viewService.image}
                  alt={viewService.name}
                  className="w-100 rounded modal-service-img"
                />
                <div className="position-absolute top-0 end-0 m-3 d-flex gap-2">
                  {viewService.isFeatured && (
                    <span className="badge bg-gold text-dark fw-bold">Featured</span>
                  )}
                  <span
                    className={`badge ${
                      viewService.status === 'Active' ? 'bg-success' : 'bg-danger'
                    }`}
                  >
                    {viewService.status}
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <span className="badge bg-light text-dark border me-2">{viewService.category}</span>
                <span className="fw-bold text-gold fs-6">{viewService.price}</span>
              </div>

              <p className="text-dark fs-7 fw-semibold mb-2">{viewService.shortDesc}</p>
              <p className="text-muted fs-7 mb-4">{viewService.fullDesc || viewService.shortDesc}</p>

              <div className="row g-3 p-3 bg-light rounded-3 mb-2">
                <div className="col-6">
                  <span className="text-uppercase text-muted fs-8 fw-bold d-block">Availability</span>
                  <span className="fs-7 text-dark">{viewService.availability}</span>
                </div>
                <div className="col-6">
                  <span className="text-uppercase text-muted fs-8 fw-bold d-block">Operating Hours</span>
                  <span className="fs-7 text-dark">
                    {viewService.openingTime} - {viewService.closingTime}
                  </span>
                </div>
              </div>
            </div>

            <div className="d-flex justify-content-end pt-3 border-top">
              <button className="btn btn-secondary" onClick={() => setViewService(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 7. Add / Edit Service Modal */}
      {editService && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 className="h4 mb-0 text-primary-navy">
                {editService.id ? 'Edit Hotel Service' : 'Add New Service'}
              </h2>
              <button type="button" className="btn-close" onClick={() => setEditService(null)}></button>
            </div>

            <form onSubmit={handleSaveService}>
              <div className="row g-3 mb-3">
                <div className="col-12 col-md-8">
                  <label className="form-label fs-7 fw-semibold">Service Name</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editService.name}
                    onChange={(e) => setEditService({ ...editService, name: e.target.value })}
                  />
                </div>
                <div className="col-12 col-md-4">
                  <label className="form-label fs-7 fw-semibold">Category</label>
                  <select
                    className="form-select luxury-select"
                    value={editService.category}
                    onChange={(e) => setEditService({ ...editService, category: e.target.value })}
                  >
                    {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Short Description</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editService.shortDesc}
                    onChange={(e) => setEditService({ ...editService, shortDesc: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Full Description</label>
                  <textarea
                    className="form-control luxury-select"
                    rows="3"
                    value={editService.fullDesc}
                    onChange={(e) => setEditService({ ...editService, fullDesc: e.target.value })}
                  ></textarea>
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Price / Rate</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    placeholder="e.g. From $35 or Complimentary"
                    value={editService.price}
                    onChange={(e) => setEditService({ ...editService, price: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Availability</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    placeholder="e.g. Daily, 24/7 Service"
                    value={editService.availability}
                    onChange={(e) => setEditService({ ...editService, availability: e.target.value })}
                  />
                </div>

                <div className="col-6 col-md-3">
                  <label className="form-label fs-7 fw-semibold">Opening Time</label>
                  <input
                    type="time"
                    className="form-control luxury-select"
                    value={editService.openingTime}
                    onChange={(e) => setEditService({ ...editService, openingTime: e.target.value })}
                  />
                </div>

                <div className="col-6 col-md-3">
                  <label className="form-label fs-7 fw-semibold">Closing Time</label>
                  <input
                    type="time"
                    className="form-control luxury-select"
                    value={editService.closingTime}
                    onChange={(e) => setEditService({ ...editService, closingTime: e.target.value })}
                  />
                </div>

                <div className="col-12 col-md-6">
                  <label className="form-label fs-7 fw-semibold">Bootstrap Icon Class</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    placeholder="bi-stars"
                    value={editService.icon}
                    onChange={(e) => setEditService({ ...editService, icon: e.target.value })}
                  />
                </div>

                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Service Image URL (UI Only)</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    value={editService.image}
                    onChange={(e) => setEditService({ ...editService, image: e.target.value })}
                  />
                </div>

                <div className="col-6">
                  <label className="form-label fs-7 fw-semibold">Status</label>
                  <select
                    className="form-select luxury-select"
                    value={editService.status}
                    onChange={(e) => setEditService({ ...editService, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="col-6 d-flex align-items-end mb-2">
                  <div className="form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="featuredCheck"
                      checked={editService.isFeatured}
                      onChange={(e) => setEditService({ ...editService, isFeatured: e.target.checked })}
                    />
                    <label className="form-check-label fs-7 fw-semibold" htmlFor="featuredCheck">
                      Featured Service
                    </label>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" className="btn btn-secondary" onClick={() => setEditService(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-luxury-gold">
                  Save Service
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 8. Delete Confirmation Modal */}
      {deleteService && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div
            className="card card-luxury modal-content-custom border-0 p-4 shadow-lg text-center"
            style={{ maxWidth: '450px' }}
          >
            <div className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            </div>
            <h3 className="h4 text-dark mb-2">Delete Service?</h3>
            <p className="text-muted fs-7 mb-4">
              Are you sure you want to delete <strong>{deleteService.name}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary px-4" onClick={() => setDeleteService(null)}>
                Cancel
              </button>
              <button className="btn btn-danger px-4" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}