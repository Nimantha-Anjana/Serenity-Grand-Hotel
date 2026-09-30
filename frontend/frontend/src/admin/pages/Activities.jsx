import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Activities.css';

/**
 * Activities Page Component for Serenity Grand Hotel Admin Panel.
 * Manages hotel experiences, recreation, wellness, and guest activities
 * with full UI search, filtering, CRUD modals, and status toggles.
 */
const Activities = () => {
  // Dummy Initial Activities Data

  // Primary State
  const { activities, setActivities } = useAdminData();
  const navigate = useNavigate();

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Modal States
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Active Selected Activity (view / delete modals)
  const [selectedActivity, setSelectedActivity] = useState(null);
  // Category List Options
  const categories = ['Wellness', 'Recreation', 'Adventure', 'Family', 'Dining', 'Entertainment', 'Events'];

  // Stats Calculations
  const totalActivities = activities.length;
  const activeActivities = activities.filter((a) => a.status === 'Active').length;
  const featuredActivities = activities.filter((a) => a.featured).length;
  const inactiveActivities = activities.filter((a) => a.status === 'Inactive').length;

  // Filter Handling Logic
  const filteredActivities = activities.filter((act) => {
    const matchesSearch = act.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          act.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || act.category === categoryFilter;
    const matchesStatus = statusFilter === 'All' || act.status === statusFilter;
    const matchesFeatured = featuredFilter === 'All' || 
                            (featuredFilter === 'Featured' && act.featured) || 
                            (featuredFilter === 'Not Featured' && !act.featured);

    return matchesSearch && matchesCategory && matchesStatus && matchesFeatured;
  });

  // Quick Status Toggle Handler
  const handleToggleStatus = (id) => {
    setActivities(activities.map((act) => {
      if (act.id === id) {
        return { ...act, status: act.status === 'Active' ? 'Inactive' : 'Active' };
      }
      return act;
    }));
  };

  // Quick Featured Toggle Handler
  const handleToggleFeatured = (id) => {
    setActivities(activities.map((act) => {
      if (act.id === id) {
        return { ...act, featured: !act.featured };
      }
      return act;
    }));
  };

  // Open View Modal
  const handleOpenView = (act) => {
    setSelectedActivity(act);
    setShowViewModal(true);
  };

  // Open Delete Modal
  const handleOpenDelete = (act) => {
    setSelectedActivity(act);
    setShowDeleteModal(true);
  };

  // Delete Confirm Handler
  const handleDeleteConfirm = () => {
    if (selectedActivity) {
      setActivities(activities.filter((a) => a.id !== selectedActivity.id));
    }
    setShowDeleteModal(false);
  };

  // Filter Reset Handler
  const handleResetFilters = () => {
    setSearchTerm('');
    setCategoryFilter('All');
    setStatusFilter('All');
    setFeaturedFilter('All');
  };

  return (
    <div className="activities-container">
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title mb-1">Activities</h2>
          <p className="text-muted small mb-0">Manage hotel activities, experiences, and guest recreations.</p>
        </div>
        <button className="btn btn-luxury-gold mt-3 mt-md-0" onClick={() => navigate('/admin/activities/add')}>
          <i className="bi bi-plus-lg me-2"></i>Add Activity
        </button>
      </div>

      {/* 2. Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="luxury-card stat-card p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="stat-label extra-small text-muted text-uppercase fw-bold">Total Activities</span>
                <h3 className="brand-font stat-number mb-0 mt-1">{totalActivities}</h3>
              </div>
              <div className="stat-icon-box total">
                <i className="bi bi-compass-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="luxury-card stat-card p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="stat-label extra-small text-muted text-uppercase fw-bold">Active Activities</span>
                <h3 className="brand-font stat-number mb-0 mt-1">{activeActivities}</h3>
              </div>
              <div className="stat-icon-box active-bg">
                <i className="bi bi-check-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="luxury-card stat-card p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="stat-label extra-small text-muted text-uppercase fw-bold">Featured Activities</span>
                <h3 className="brand-font stat-number mb-0 mt-1">{featuredActivities}</h3>
              </div>
              <div className="stat-icon-box featured">
                <i className="bi bi-star-fill"></i>
              </div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="luxury-card stat-card p-3">
            <div className="d-flex align-items-center justify-content-between">
              <div>
                <span className="stat-label extra-small text-muted text-uppercase fw-bold">Inactive Activities</span>
                <h3 className="brand-font stat-number mb-0 mt-1">{inactiveActivities}</h3>
              </div>
              <div className="stat-icon-box inactive">
                <i className="bi bi-slash-circle-fill"></i>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filter Toolbar */}
      <div className="luxury-card filter-card p-3 mb-4">
        <div className="row g-3 align-items-center">
          {/* Search Box */}
          <div className="col-12 col-md-4 col-xl-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search activities..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <select
              className="form-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* Status Dropdown */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <select
              className="form-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Status</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          {/* Featured Dropdown */}
          <div className="col-12 col-sm-6 col-md-3 col-xl-2">
            <select
              className="form-select"
              value={featuredFilter}
              onChange={(e) => setFeaturedFilter(e.target.value)}
            >
              <option value="All">All Featured</option>
              <option value="Featured">Featured Only</option>
              <option value="Not Featured">Not Featured</option>
            </select>
          </div>

          {/* Reset Button */}
          <div className="col-12 col-sm-6 col-md-2 col-xl-3 text-sm-end">
            <button className="btn btn-outline-secondary w-100 w-sm-auto" onClick={handleResetFilters}>
              <i className="bi bi-arrow-counterclockwise me-1"></i>Reset
            </button>
          </div>
        </div>
      </div>

      {/* 4. Activity Table Section */}
      <div className="luxury-card table-card p-0 mb-4 overflow-hidden">
        <div className="table-responsive">
          <table className="table align-middle mb-0 custom-activity-table">
            <thead>
              <tr>
                <th scope="col" style={{ width: '80px' }}>Image</th>
                <th scope="col">Activity Name</th>
                <th scope="col">Category</th>
                <th scope="col">Duration</th>
                <th scope="col">Location</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Featured</th>
                <th scope="col" className="text-end" style={{ width: '130px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredActivities.length > 0 ? (
                filteredActivities.map((act) => (
                  <tr key={act.id}>
                    {/* Image Thumbnail */}
                    <td>
                      <img src={act.image} alt={act.name} className="activity-thumb-img" />
                    </td>

                    {/* Name & Short Description */}
                    <td>
                      <div className="fw-bold text-navy">{act.name}</div>
                      <span className="extra-small text-muted d-block text-truncate" style={{ maxWidth: '220px' }}>
                        {act.shortDesc}
                      </span>
                    </td>

                    {/* Category Badge */}
                    <td>
                      <span className="badge category-badge">{act.category}</span>
                    </td>

                    {/* Duration */}
                    <td className="small text-muted">
                      <i className="bi bi-clock me-1"></i>{act.duration}
                    </td>

                    {/* Location */}
                    <td className="small text-muted">
                      <i className="bi bi-geo-alt me-1"></i>{act.location}
                    </td>

                    {/* Price */}
                    <td>
                      <span className={`fw-semibold ${act.priceType === 'Complimentary' ? 'text-success' : 'text-navy'}`}>
                        {act.price}
                      </span>
                    </td>

                    {/* Quick Status Toggle Switch */}
                    <td>
                      <div className="form-check form-switch d-flex align-items-center gap-2">
                        <input
                          className="form-check-input custom-switch"
                          type="checkbox"
                          checked={act.status === 'Active'}
                          onChange={() => handleToggleStatus(act.id)}
                        />
                        <span className={`badge ${act.status === 'Active' ? 'badge-status-active' : 'badge-status-inactive'}`}>
                          {act.status}
                        </span>
                      </div>
                    </td>

                    {/* Featured Toggle Star */}
                    <td>
                      <button
                        type="button"
                        className={`btn-star-toggle ${act.featured ? 'active' : ''}`}
                        onClick={() => handleToggleFeatured(act.id)}
                        title={act.featured ? 'Click to Unfeature' : 'Click to Feature'}
                      >
                        <i className={`bi ${act.featured ? 'bi-star-fill' : 'bi-star'}`}></i>
                        <span className="extra-small ms-1">{act.featured ? 'Featured' : 'Standard'}</span>
                      </button>
                    </td>

                    {/* Actions Group */}
                    <td className="text-end">
                      <div className="btn-group action-btn-group">
                        <button
                          className="btn btn-sm btn-action-view"
                          onClick={() => handleOpenView(act)}
                          title="View Details"
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-action-edit"
                          onClick={() => navigate(`/admin/activities/edit/${act.id}`)}
                          title="Edit Activity"
                        >
                          <i className="bi bi-pencil-fill"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-action-delete"
                          onClick={() => handleOpenDelete(act)}
                          title="Delete Activity"
                        >
                          <i className="bi bi-trash-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5">
                    <i className="bi bi-inbox fs-1 text-muted d-block mb-2"></i>
                    <p className="text-muted mb-0">No activities match your filter criteria.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination */}
        <div className="d-flex flex-column flex-sm-row align-items-center justify-content-between p-3 border-top bg-light-cream">
          <span className="extra-small text-muted mb-2 mb-sm-0">
            Showing {filteredActivities.length} of {totalActivities} entries
          </span>
          <ul className="pagination pagination-sm mb-0 custom-pagination">
            <li className="page-item disabled">
              <span className="page-link">Previous</span>
            </li>
            <li className="page-item active">
              <span className="page-link">1</span>
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
        </div>
      </div>

      {/* ==========================================================================
          MODAL 2: VIEW ACTIVITY DETAILS MODAL
         ========================================================================== */}
      {showViewModal && selectedActivity && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog-custom modal-dialog-lg">
            <div className="modal-content-custom">
              <div className="modal-header-custom d-flex justify-content-between align-items-center border-bottom pb-3">
                <h5 className="brand-font mb-0 text-navy">
                  <i className="bi bi-info-circle-fill me-2 text-gold"></i>
                  Activity Details
                </h5>
                <button className="btn-close-custom" onClick={() => setShowViewModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <div className="pt-3 modal-body-scroll">
                <div className="row g-4">
                  {/* Large Image Showcase */}
                  <div className="col-12 col-md-5">
                    <img
                      src={selectedActivity.image}
                      alt={selectedActivity.name}
                      className="w-100 rounded modal-view-img"
                    />
                    <div className="d-flex gap-2 mt-3 justify-content-center">
                      <span className={`badge ${selectedActivity.status === 'Active' ? 'badge-status-active' : 'badge-status-inactive'}`}>
                        {selectedActivity.status}
                      </span>
                      {selectedActivity.featured && (
                        <span className="badge bg-gold text-white">
                          <i className="bi bi-star-fill me-1"></i>Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Details Information */}
                  <div className="col-12 col-md-7">
                    <span className="badge category-badge mb-2">{selectedActivity.category}</span>
                    <h3 className="brand-font text-navy mb-2">{selectedActivity.name}</h3>
                    <p className="text-muted small mb-3">{selectedActivity.fullDesc || selectedActivity.shortDesc}</p>

                    <div className="view-detail-list bg-light-cream p-3 rounded border">
                      <div className="detail-item mb-2">
                        <span className="fw-semibold text-navy">Duration:</span> {selectedActivity.duration}
                      </div>
                      <div className="detail-item mb-2">
                        <span className="fw-semibold text-navy">Location:</span> {selectedActivity.location}
                      </div>
                      <div className="detail-item mb-2">
                        <span className="fw-semibold text-navy">Price:</span>{' '}
                        <span className="fw-bold text-gold">{selectedActivity.price}</span> ({selectedActivity.priceType})
                      </div>
                      <div className="detail-item mb-2">
                        <span className="fw-semibold text-navy">Schedule Time:</span>{' '}
                        {selectedActivity.startTime} - {selectedActivity.endTime}
                      </div>
                      <div className="detail-item">
                        <span className="fw-semibold text-navy d-block mb-1">Available Days:</span>
                        <div className="d-flex flex-wrap gap-1">
                          {(selectedActivity.days || []).map((d) => (
                            <span key={d} className="badge bg-white text-navy border">
                              {d}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-end border-top pt-3 mt-4">
                <button type="button" className="btn btn-luxury-navy" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ==========================================================================
          MODAL 3: DELETE CONFIRMATION MODAL
         ========================================================================== */}
      {showDeleteModal && selectedActivity && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog-custom modal-dialog-sm text-center">
            <div className="modal-content-custom p-4">
              <div className="delete-icon-circle mx-auto mb-3">
                <i className="bi bi-exclamation-triangle-fill text-danger fs-2"></i>
              </div>
              <h5 className="brand-font text-navy mb-2">Delete Activity?</h5>
              <p className="text-muted small mb-4">
                Are you sure you want to delete <strong>"{selectedActivity.name}"</strong>? This action cannot be undone in demo mode.
              </p>

              <div className="d-flex justify-content-center gap-2">
                <button className="btn btn-outline-secondary px-4" onClick={() => setShowDeleteModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-danger px-4" onClick={handleDeleteConfirm}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;