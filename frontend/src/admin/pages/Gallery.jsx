import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Gallery.css';

/**
 * Gallery Page Component for Serenity Grand Hotel Admin Panel.
 * Features a dynamic responsive grid, hovering quick actions, search & filters,
 * category stats, add/edit form modal, view preview modal, and delete confirmation modal.
 */
const Gallery = () => {
  // Static Dummy Gallery Dataset

  // States
  const { images, setImages } = useAdminData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state management
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);

  // Calculate Statistics
  const totalImages = images.length;
  const hotelImages = images.filter((img) => img.category === 'Hotel').length;
  const roomImages = images.filter((img) => img.category === 'Rooms').length;
  const diningImages = images.filter((img) => img.category === 'Dining').length;
  const facilityImages = images.filter((img) => img.category === 'Facilities').length;

  // Filter Logic
  const filteredImages = images.filter((img) => {
    const matchesSearch = img.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || img.category === categoryFilter;
    const matchesStatus = statusFilter === '' || img.status === statusFilter;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setStatusFilter('');
  };

  // Modal Handlers (add + edit now live on their own form pages)
  const openViewModal = (img) => {
    setSelectedImage(img);
    setShowViewModal(true);
  };

  const openDeleteModal = (img) => {
    setSelectedImage(img);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setImages(images.filter((img) => img.id !== selectedImage.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="gallery-container">
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title">Gallery Management</h2>
          <p className="text-muted small mb-0">Manage hotel images and gallery content for public display.</p>
        </div>
        <button type="button" className="btn btn-luxury-gold mt-3 mt-md-0" onClick={() => navigate('/admin/gallery/add')}>
          <i className="bi bi-plus-lg me-2"></i>Add Image
        </button>
      </div>

      {/* 2. Gallery Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-lg">
          <div className="luxury-card stat-card p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="stat-label d-block text-muted">Total Images</span>
              <h3 className="stat-number mb-0">{totalImages}</h3>
            </div>
            <div className="stat-icon-wrapper navy"><i className="bi bi-images"></i></div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          <div className="luxury-card stat-card p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="stat-label d-block text-muted">Hotel</span>
              <h3 className="stat-number mb-0">{hotelImages}</h3>
            </div>
            <div className="stat-icon-wrapper gold"><i className="bi bi-building"></i></div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          <div className="luxury-card stat-card p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="stat-label d-block text-muted">Rooms</span>
              <h3 className="stat-number mb-0">{roomImages}</h3>
            </div>
            <div className="stat-icon-wrapper navy"><i className="bi bi-door-open"></i></div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          <div className="luxury-card stat-card p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="stat-label d-block text-muted">Dining</span>
              <h3 className="stat-number mb-0">{diningImages}</h3>
            </div>
            <div className="stat-icon-wrapper gold"><i className="bi bi-cup-hot"></i></div>
          </div>
        </div>
        <div className="col-12 col-sm-6 col-lg">
          <div className="luxury-card stat-card p-3 d-flex align-items-center justify-content-between">
            <div>
              <span className="stat-label d-block text-muted">Facilities</span>
              <h3 className="stat-number mb-0">{facilityImages}</h3>
            </div>
            <div className="stat-icon-wrapper navy"><i className="bi bi-stars"></i></div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters */}
      <div className="luxury-card filter-card p-3 p-md-4 mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-4">
            <div className="input-group search-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search images by title..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3">
            <select
              className="form-select custom-select"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Hotel">Hotel</option>
              <option value="Rooms">Rooms</option>
              <option value="Dining">Dining</option>
              <option value="Facilities">Facilities</option>
              <option value="Events">Events</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-md-2">
            <select
              className="form-select custom-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Published">Published</option>
              <option value="Draft">Draft</option>
            </select>
          </div>

          <div className="col-12 col-md-3 d-flex gap-2">
            <button type="button" className="btn btn-luxury-navy w-100">
              <i className="bi bi-funnel me-1"></i>Filter
            </button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 4. Gallery Image Cards Grid */}
      <div className="row g-4 mb-4">
        {filteredImages.length > 0 ? (
          filteredImages.map((img) => (
            <div className="col-12 col-sm-6 col-lg-4 col-xl-3" key={img.id}>
              <div className="luxury-card gallery-card h-100 overflow-hidden">
                <div className="gallery-img-wrapper">
                  <img src={img.url} alt={img.title} className="gallery-img" />
                  {/* Image Hover Overlay with Action Buttons */}
                  <div className="gallery-overlay d-flex align-items-center justify-content-center gap-2">
                    <button
                      type="button"
                      className="btn-overlay-action view"
                      title="View Details"
                      onClick={() => openViewModal(img)}
                    >
                      <i className="bi bi-eye"></i>
                    </button>
                    <button
                      type="button"
                      className="btn-overlay-action edit"
                      title="Edit Image"
                      onClick={() => navigate(`/admin/gallery/edit/${img.id}`)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      type="button"
                      className="btn-overlay-action delete"
                      title="Delete Image"
                      onClick={() => openDeleteModal(img)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                  <span className={`status-badge-overlay ${img.status.toLowerCase()}`}>
                    {img.status}
                  </span>
                </div>
                <div className="p-3">
                  <div className="d-flex justify-content-between align-items-start mb-1">
                    <h6 className="fw-bold text-navy mb-0 text-truncate">{img.title}</h6>
                  </div>
                  <div className="d-flex justify-content-between align-items-center mt-2">
                    <span className="badge-category">{img.category}</span>
                    <span className="extra-small text-muted">
                      <i className="bi bi-calendar3 me-1"></i>{img.uploadDate}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="luxury-card p-5 text-center text-muted">
              <i className="bi bi-image fs-1 mb-2 d-block"></i>
              No gallery images match your current filter criteria.
            </div>
          </div>
        )}
      </div>

      {/* 9. Pagination UI */}
      <div className="d-flex justify-content-between align-items-center luxury-card p-3">
        <span className="small text-muted">Showing 1 to {filteredImages.length} of {images.length} images</span>
        <ul className="pagination custom-pagination mb-0">
          <li className="page-item disabled"><span className="page-link">Previous</span></li>
          <li className="page-item active"><span className="page-link">1</span></li>
          <li className="page-item"><span className="page-link">2</span></li>
          <li className="page-item"><span className="page-link">3</span></li>
          <li className="page-item"><span className="page-link">Next</span></li>
        </ul>
      </div>

      {/* 7. Image Preview Modal */}
      {showViewModal && selectedImage && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal-dialog">
            <div className="luxury-card modal-content-box p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="brand-font mb-0">{selectedImage.title}</h4>
                <button type="button" className="btn-close" onClick={() => setShowViewModal(false)}></button>
              </div>
              <div className="view-image-body">
                <img src={selectedImage.url} alt={selectedImage.title} className="w-100 rounded mb-3 modal-view-img" />
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <span className="badge-category">{selectedImage.category}</span>
                  <span className={`status-badge ${selectedImage.status.toLowerCase()}`}>
                    {selectedImage.status}
                  </span>
                </div>
                <p className="text-muted small">{selectedImage.description}</p>
                <div className="extra-small text-muted border-top pt-2 mt-3">
                  <strong>Upload Date:</strong> {selectedImage.uploadDate} | <strong>Order:</strong> #{selectedImage.displayOrder}
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button type="button" className="btn btn-luxury-navy" onClick={() => setShowViewModal(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 8. Delete Confirmation Modal */}
      {showDeleteModal && selectedImage && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal-dialog delete-dialog">
            <div className="luxury-card modal-content-box p-4 text-center">
              <div className="delete-icon-box mx-auto mb-3">
                <i className="bi bi-exclamation-triangle-fill text-danger"></i>
              </div>
              <h4 className="brand-font">Delete Image?</h4>
              <p className="text-muted small">
                Are you sure you want to delete <strong>"{selectedImage.title}"</strong>? This image will be removed from gallery options.
              </p>
              <div className="d-flex justify-content-center gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button type="button" className="btn btn-danger px-4" onClick={handleDeleteConfirm}>
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

export default Gallery;