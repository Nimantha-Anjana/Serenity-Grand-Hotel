import React, { useState } from 'react';
import '../css/Gallery.css';

/**
 * Gallery Page Component for Serenity Grand Hotel Admin Panel.
 * Features a dynamic responsive grid, hovering quick actions, search & filters,
 * category stats, add/edit form modal, view preview modal, and delete confirmation modal.
 */
const Gallery = () => {
  // Static Dummy Gallery Dataset
  const initialImages = [
    {
      id: 1,
      title: 'Grand Hotel Exterior',
      category: 'Hotel',
      status: 'Published',
      uploadDate: '2026-02-10',
      description: 'Stunning night view of the main resort facade illuminated by warm architectural lighting.',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      displayOrder: 1
    },
    {
      id: 2,
      title: 'Luxury Lobby Salon',
      category: 'Hotel',
      status: 'Published',
      uploadDate: '2026-02-12',
      description: 'Double-height grand entrance hall featuring marble floors and custom gold chandelier.',
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=600&q=80',
      displayOrder: 2
    },
    {
      id: 3,
      title: 'Presidential Ocean Suite',
      category: 'Rooms',
      status: 'Published',
      uploadDate: '2026-02-14',
      description: 'Master suite with private oceanfront balcony and floor-to-ceiling panoramic glass.',
      url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?auto=format&fit=crop&w=600&q=80',
      displayOrder: 3
    },
    {
      id: 4,
      title: 'Ocean View Restaurant',
      category: 'Dining',
      status: 'Published',
      uploadDate: '2026-02-15',
      description: 'Michelin-starred fine dining setup facing the ocean during golden sunset hours.',
      url: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80',
      displayOrder: 4
    },
    {
      id: 5,
      title: 'Infinity Swimming Pool',
      category: 'Facilities',
      status: 'Published',
      uploadDate: '2026-02-18',
      description: 'Temperature-controlled rooftop pool seamlessly blending into the ocean horizon.',
      url: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
      displayOrder: 5
    },
    {
      id: 6,
      title: 'Royal Spa & Wellness',
      category: 'Facilities',
      status: 'Published',
      uploadDate: '2026-02-20',
      description: 'Tranquil aromatherapy treatment room with natural stone and bamboo aesthetics.',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=600&q=80',
      displayOrder: 6
    },
    {
      id: 7,
      title: 'Grand Ballroom Wedding',
      category: 'Events',
      status: 'Draft',
      uploadDate: '2026-02-22',
      description: 'Extravagant floral arrangement and banquet setting for luxury wedding receptions.',
      url: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
      displayOrder: 7
    },
    {
      id: 8,
      title: 'Sunset Lounge Bar',
      category: 'Dining',
      status: 'Published',
      uploadDate: '2026-02-25',
      description: 'Open-air cocktail bar featuring signature mixology and plush outdoor cabanas.',
      url: 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=80',
      displayOrder: 8
    }
  ];

  // States
  const [images, setImages] = useState(initialImages);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('');

  // Modals state management
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [modalMode, setModalMode] = useState('add'); // 'add' | 'edit'

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    category: 'Hotel',
    status: 'Published',
    description: '',
    url: '',
    displayOrder: 1
  });

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

  // Modal Handlers
  const openAddModal = () => {
    setModalMode('add');
    setFormData({
      title: '',
      category: 'Hotel',
      status: 'Published',
      description: '',
      url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=600&q=80',
      displayOrder: images.length + 1
    });
    setShowAddEditModal(true);
  };

  const openEditModal = (img) => {
    setModalMode('edit');
    setSelectedImage(img);
    setFormData({
      title: img.title,
      category: img.category,
      status: img.status,
      description: img.description,
      url: img.url,
      displayOrder: img.displayOrder
    });
    setShowAddEditModal(true);
  };

  const openViewModal = (img) => {
    setSelectedImage(img);
    setShowViewModal(true);
  };

  const openDeleteModal = (img) => {
    setSelectedImage(img);
    setShowDeleteModal(true);
  };

  // Static Form Submissions
  const handleSaveImage = (e) => {
    e.preventDefault();
    if (modalMode === 'add') {
      const newImg = {
        id: Date.now(),
        ...formData,
        uploadDate: new Date().toISOString().split('T')[0]
      };
      setImages([newImg, ...images]);
    } else {
      setImages(
        images.map((img) =>
          img.id === selectedImage.id ? { ...img, ...formData } : img
        )
      );
    }
    setShowAddEditModal(false);
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
        <button type="button" className="btn btn-luxury-gold mt-3 mt-md-0" onClick={openAddModal}>
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
                      onClick={() => openEditModal(img)}
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

      {/* 6. Add/Edit Image Modal */}
      {showAddEditModal && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal-dialog">
            <div className="luxury-card modal-content-box p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="brand-font mb-0">
                  {modalMode === 'add' ? 'Add Gallery Image' : 'Edit Gallery Image'}
                </h4>
                <button type="button" className="btn-close" onClick={() => setShowAddEditModal(false)}></button>
              </div>
              <form onSubmit={handleSaveImage}>
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Image Title</label>
                    <input
                      type="text"
                      className="form-control"
                      required
                      placeholder="e.g. Presidential Suite Bedroom"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Category</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      <option value="Hotel">Hotel</option>
                      <option value="Rooms">Rooms</option>
                      <option value="Dining">Dining</option>
                      <option value="Facilities">Facilities</option>
                      <option value="Events">Events</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Published">Published</option>
                      <option value="Draft">Draft</option>
                    </select>
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Image URL / Select</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="https://images.unsplash.com/..."
                      value={formData.url}
                      onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Display Order</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.displayOrder}
                      onChange={(e) => setFormData({ ...formData, displayOrder: e.target.value })}
                    />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Image Upload (UI Mock)</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Enter brief description of the photo..."
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    ></textarea>
                  </div>
                  {formData.url && (
                    <div className="col-12">
                      <label className="form-label small fw-semibold d-block">Preview</label>
                      <img src={formData.url} alt="Preview" className="img-thumbnail modal-preview-img" />
                    </div>
                  )}
                </div>
                <div className="d-flex justify-content-end gap-2 mt-4">
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={() => setShowAddEditModal(false)}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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