import React, { useState } from 'react';
import '../css/Activities.css';

/**
 * Activities Page Component for Serenity Grand Hotel Admin Panel.
 * Manages hotel experiences, recreation, wellness, and guest activities
 * with full UI search, filtering, CRUD modals, and status toggles.
 */
const Activities = () => {
  // Dummy Initial Activities Data
  const initialActivities = [
    {
      id: 1,
      name: 'Sunset Beach Walk',
      category: 'Adventure',
      duration: '1.5 Hours',
      location: 'Private Beachfront',
      price: '$25',
      priceType: 'Paid',
      status: 'Active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'A guided serene evening walk along the golden shores of Colombo.',
      fullDesc: 'Experience the breathtaking coastal sunset with a complimentary tropical refreshment. Guided by our local environmental experts.',
      days: ['Monday', 'Wednesday', 'Friday', 'Sunday'],
      startTime: '17:30',
      endTime: '19:00',
      order: 1
    },
    {
      id: 2,
      name: 'Spa & Wellness Experience',
      category: 'Wellness',
      duration: '2 Hours',
      location: 'Serenity Spa Pavilion',
      price: '$120',
      priceType: 'Paid',
      status: 'Active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Holistic Ayurvedic massage and herbal hydrotherapy.',
      fullDesc: 'Rejuvenate your body and mind with signature organic oils and professional therapists certified in ancient healing techniques.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      startTime: '09:00',
      endTime: '11:00',
      order: 2
    },
    {
      id: 3,
      name: 'Swimming Pool Experience',
      category: 'Recreation',
      duration: 'Flexible',
      location: 'Infinity Ocean Pool',
      price: 'Free',
      priceType: 'Complimentary',
      status: 'Active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Unlimited access to infinity pool with poolside lounge service.',
      fullDesc: 'Relax in temperature-controlled waters while enjoying ocean breezes. Sun loungers and plush towels are provided complimentary.',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
      startTime: '07:00',
      endTime: '20:00',
      order: 3
    },
    {
      id: 4,
      name: 'Yoga & Meditation',
      category: 'Wellness',
      duration: '1 Hour',
      location: 'Garden Lawn Gazebo',
      price: 'Free',
      priceType: 'Complimentary',
      status: 'Active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Morning mindfulness session guided by certified yoga masters.',
      fullDesc: 'Greet the sunrise with gentle hatha yoga movements and deep meditation sequences suitable for all fitness levels.',
      days: ['Tuesday', 'Thursday', 'Saturday'],
      startTime: '06:30',
      endTime: '07:30',
      order: 4
    },
    {
      id: 5,
      name: 'Sri Lankan Cooking Class',
      category: 'Dining',
      duration: '2.5 Hours',
      location: 'Grand Culinary Studio',
      price: '$65',
      priceType: 'Paid',
      status: 'Active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Master authentic curry spicing and traditional coconut rotti.',
      fullDesc: 'Hands-on culinary session with Executive Chef. Includes market spice tour, recipe booklet, and a 3-course tasting lunch.',
      days: ['Wednesday', 'Saturday'],
      startTime: '11:00',
      endTime: '13:30',
      order: 5
    },
    {
      id: 6,
      name: 'Cultural Tour',
      category: 'Adventure',
      duration: '4 Hours',
      location: 'City Heritage Sites',
      price: '$85',
      priceType: 'Paid',
      status: 'Inactive',
      featured: false,
      image: 'https://images.unsplash.com/photo-1588598198321-9735fd52233f?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Exclusive chauffeured tour of historic temples and colonial architecture.',
      fullDesc: 'Private air-conditioned limousine transport with expert local historian guide. All entrance fees and tea stops included.',
      days: ['Sunday'],
      startTime: '08:30',
      endTime: '12:30',
      order: 6
    },
    {
      id: 7,
      name: 'Family Game Night',
      category: 'Family',
      duration: '2 Hours',
      location: 'Kids & Family Lounge',
      price: 'Free',
      priceType: 'Complimentary',
      status: 'Active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1610890716171-6b1bb98ffd09?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Board games, video console tournaments, and snack buffets.',
      fullDesc: 'Fun-filled evening for guests of all ages featuring giant Jenga, trivia challenges, and complimentary mocktails.',
      days: ['Friday'],
      startTime: '19:00',
      endTime: '21:00',
      order: 7
    },
    {
      id: 8,
      name: 'Live Music Evening',
      category: 'Entertainment',
      duration: '3 Hours',
      location: 'The Sapphire Lounge Bar',
      price: 'Free',
      priceType: 'Complimentary',
      status: 'Active',
      featured: true,
      image: 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=400&q=80',
      shortDesc: 'Acoustic jazz standards and classical saxophone performances.',
      fullDesc: 'Enjoy world-class musical performances paired with signature mixology cocktails and premium cigar selections.',
      days: ['Thursday', 'Friday', 'Saturday'],
      startTime: '20:00',
      endTime: '23:00',
      order: 8
    }
  ];

  // Primary State
  const [activities, setActivities] = useState(initialActivities);

  // Filter States
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [featuredFilter, setFeaturedFilter] = useState('All');

  // Modal States
  const [showAddEditModal, setShowAddEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  // Active Selected Activity & Form Data
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    category: 'Wellness',
    shortDesc: '',
    fullDesc: '',
    duration: '1 Hour',
    location: '',
    price: '',
    priceType: 'Paid',
    days: ['Monday', 'Wednesday', 'Friday'],
    startTime: '09:00',
    endTime: '10:00',
    order: 1,
    status: 'Active',
    featured: false,
    image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=400&q=80'
  });

  // Category List Options
  const categories = ['Wellness', 'Recreation', 'Adventure', 'Family', 'Dining', 'Entertainment', 'Events'];
  const weekDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

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

  // Open Add Modal
  const handleOpenAdd = () => {
    setSelectedActivity(null);
    setFormData({
      name: '',
      category: 'Wellness',
      shortDesc: '',
      fullDesc: '',
      duration: '1 Hour',
      location: '',
      price: '',
      priceType: 'Paid',
      days: ['Monday', 'Wednesday'],
      startTime: '09:00',
      endTime: '10:00',
      order: activities.length + 1,
      status: 'Active',
      featured: false,
      image: 'https://images.unsplash.com/photo-1544161515-4ab6ce6db874?auto=format&fit=crop&w=400&q=80'
    });
    setImagePreview('');
    setShowAddEditModal(true);
  };

  // Open Edit Modal
  const handleOpenEdit = (act) => {
    setSelectedActivity(act);
    setFormData({ ...act });
    setImagePreview(act.image);
    setShowAddEditModal(true);
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

  // Day Checkbox Toggle Handler
  const handleDayToggle = (day) => {
    const currentDays = formData.days || [];
    if (currentDays.includes(day)) {
      setFormData({ ...formData, days: currentDays.filter((d) => d !== day) });
    } else {
      setFormData({ ...formData, days: [...currentDays, day] });
    }
  };

  // Local Image Upload Handler (UI Only)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImagePreview(url);
      setFormData({ ...formData, image: url });
    }
  };

  // Save Activity Form Submit Handler
  const handleSaveActivity = (e) => {
    e.preventDefault();
    if (selectedActivity) {
      // Update Existing
      setActivities(activities.map((a) => (a.id === selectedActivity.id ? { ...formData, id: a.id } : a)));
    } else {
      // Add New
      const newAct = {
        ...formData,
        id: Date.now()
      };
      setActivities([newAct, ...activities]);
    }
    setShowAddEditModal(false);
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
        <button className="btn btn-luxury-gold mt-3 mt-md-0" onClick={handleOpenAdd}>
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
                          onClick={() => handleOpenEdit(act)}
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
          MODAL 1: ADD / EDIT ACTIVITY MODAL
         ========================================================================== */}
      {showAddEditModal && (
        <div className="modal-backdrop-custom">
          <div className="modal-dialog-custom">
            <div className="modal-content-custom">
              <div className="modal-header-custom d-flex justify-content-between align-items-center border-bottom pb-3">
                <h5 className="brand-font mb-0 text-navy">
                  <i className="bi bi-journal-plus me-2 text-gold"></i>
                  {selectedActivity ? 'Edit Activity' : 'Add New Activity'}
                </h5>
                <button className="btn-close-custom" onClick={() => setShowAddEditModal(false)}>
                  <i className="bi bi-x-lg"></i>
                </button>
              </div>

              <form onSubmit={handleSaveActivity} className="pt-3">
                <div className="row g-3 modal-body-scroll">
                  {/* Activity Name */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Activity Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Sunset Beach Walk"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                    />
                  </div>

                  {/* Category */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Category *</label>
                    <select
                      className="form-select"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    >
                      {categories.map((c) => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>

                  {/* Short Description */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Short Description *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Brief summary for card preview"
                      value={formData.shortDesc}
                      onChange={(e) => setFormData({ ...formData, shortDesc: e.target.value })}
                      required
                    />
                  </div>

                  {/* Full Description */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Full Description</label>
                    <textarea
                      className="form-control"
                      rows="3"
                      placeholder="Detailed activity description and inclusions"
                      value={formData.fullDesc}
                      onChange={(e) => setFormData({ ...formData, fullDesc: e.target.value })}
                    ></textarea>
                  </div>

                  {/* Duration */}
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Duration *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. 2 Hours"
                      value={formData.duration}
                      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                      required
                    />
                  </div>

                  {/* Location */}
                  <div className="col-12 col-md-8">
                    <label className="form-label small fw-semibold">Location *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. Oceanfront Pavilion"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      required
                    />
                  </div>

                  {/* Price */}
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Price *</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="e.g. $45 or Free"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                    />
                  </div>

                  {/* Price Type */}
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Price Type</label>
                    <select
                      className="form-select"
                      value={formData.priceType}
                      onChange={(e) => setFormData({ ...formData, priceType: e.target.value })}
                    >
                      <option value="Paid">Paid</option>
                      <option value="Complimentary">Complimentary</option>
                    </select>
                  </div>

                  {/* Display Order */}
                  <div className="col-12 col-md-4">
                    <label className="form-label small fw-semibold">Display Order</label>
                    <input
                      type="number"
                      className="form-control"
                      value={formData.order}
                      onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 1 })}
                    />
                  </div>

                  {/* Start & End Time */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Starting Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.startTime}
                      onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    />
                  </div>
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Ending Time</label>
                    <input
                      type="time"
                      className="form-control"
                      value={formData.endTime}
                      onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    />
                  </div>

                  {/* Available Days Checkboxes */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold d-block mb-2">Available Days</label>
                    <div className="d-flex flex-wrap gap-2">
                      {weekDays.map((day) => {
                        const isChecked = (formData.days || []).includes(day);
                        return (
                          <div key={day} className="form-check form-check-inline">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id={`day-${day}`}
                              checked={isChecked}
                              onChange={() => handleDayToggle(day)}
                            />
                            <label className="form-check-label small" htmlFor={`day-${day}`}>
                              {day.slice(0, 3)}
                            </label>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Activity Image & Preview */}
                  <div className="col-12">
                    <label className="form-label small fw-semibold">Activity Image</label>
                    <input type="file" className="form-control mb-2" accept="image/*" onChange={handleImageChange} />
                    {(imagePreview || formData.image) && (
                      <div className="modal-img-preview-box">
                        <img src={imagePreview || formData.image} alt="Preview" className="img-preview" />
                      </div>
                    )}
                  </div>

                  {/* Status & Featured Options */}
                  <div className="col-12 col-md-6">
                    <label className="form-label small fw-semibold">Status</label>
                    <select
                      className="form-select"
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                  </div>

                  <div className="col-12 col-md-6 d-flex align-items-end">
                    <div className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="featuredCheck"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                      />
                      <label className="form-check-label fw-semibold small text-navy" htmlFor="featuredCheck">
                        Mark as Featured Activity
                      </label>
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setShowAddEditModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-luxury-gold">
                    Save Activity
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

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