import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { CATEGORIES } from '../data/services';
import '../css/Services.css';



export default function Services() {
  const { services, setServices } = useAdminData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Modals state
  const [viewService, setViewService] = useState(null);
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
          onClick={() => navigate('/admin/services/add')}
        >
          <i className="bi bi-plus-lg"></i>
          <span>Add Service</span>
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
                        onClick={() => navigate(`/admin/services/edit/${srv.id}`)}
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

            <div className="modal-body-custom modal-scrollable-body">
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

            <div className="d-flex justify-content-end pt-3 border-top mt-auto">
              <button className="btn btn-secondary" onClick={() => setViewService(null)}>
                Close
              </button>
            </div>
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