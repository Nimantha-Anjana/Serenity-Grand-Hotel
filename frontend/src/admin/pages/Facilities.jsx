import React, { useState } from 'react';
import '../css/Facilities.css';

const INITIAL_FACILITIES = [
  {
    id: 1,
    name: 'Swimming Pool',
    description: 'Temperature-controlled infinity pool overlooking the ocean with poolside beverage service.',
    hours: '06:00 AM - 10:00 PM',
    status: 'Active',
    icon: 'bi-water',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 2,
    name: 'Fitness Center',
    description: 'State-of-the-art gym equipped with Technogym machinery, free weights, and personal trainers.',
    hours: '24 Hours',
    status: 'Active',
    icon: 'bi-activity',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 3,
    name: 'Spa & Wellness',
    description: 'Holistic luxury treatments, steam baths, sauna, and customized aroma massage therapies.',
    hours: '08:00 AM - 09:00 PM',
    status: 'Active',
    icon: 'bi-flower1',
    image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 4,
    name: 'Free Wi-Fi',
    description: 'High-speed fiber optic Wi-Fi network accessible across all suites, dining venues, and open gardens.',
    hours: '24 Hours',
    status: 'Active',
    icon: 'bi-wifi',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 5,
    name: 'Restaurant',
    description: 'Award-winning Michelin-star dining featuring organic Mediterranean cuisine and fine wines.',
    hours: '07:00 AM - 11:00 PM',
    status: 'Active',
    icon: 'bi-cup-hot',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 6,
    name: 'Parking',
    description: 'Secure multi-level underground parking with complimentary 24/7 valet service.',
    hours: '24 Hours',
    status: 'Active',
    icon: 'bi-p-circle',
    image: 'https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 7,
    name: 'Airport Shuttle',
    description: 'Chauffeur-driven luxury sedan transfers between the hotel and international airport terminals.',
    hours: 'On Request',
    status: 'Inactive',
    icon: 'bi-bus-front',
    image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 8,
    name: 'Conference Hall',
    description: 'Grand ballroom equipped with advanced sound systems, HD projectors, and catering facilities.',
    hours: '08:00 AM - 10:00 PM',
    status: 'Active',
    icon: 'bi-building-gear',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=800&q=80'
  }
];

const AVAILABLE_ICONS = [
  { label: 'Water / Pool', value: 'bi-water' },
  { label: 'Fitness / Activity', value: 'bi-activity' },
  { label: 'Spa / Wellness', value: 'bi-flower1' },
  { label: 'Wi-Fi / Internet', value: 'bi-wifi' },
  { label: 'Dining / Food', value: 'bi-cup-hot' },
  { label: 'Parking', value: 'bi-p-circle' },
  { label: 'Shuttle / Car', value: 'bi-bus-front' },
  { label: 'Conference / Hall', value: 'bi-building-gear' },
  { label: 'Shield / Service', value: 'bi-shield-check' },
  { label: 'Stars / Luxury', value: 'bi-stars' }
];

export default function Facilities() {
  const [facilities, setFacilities] = useState(INITIAL_FACILITIES);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showModal, setShowModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    hours: '',
    status: 'Active',
    icon: 'bi-stars',
    image: ''
  });

  // Filter facilities based on search & status
  const filteredFacilities = facilities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  // Open Add Modal
  const handleOpenAddModal = () => {
    setEditingFacility(null);
    setFormData({
      name: '',
      description: '',
      hours: '',
      status: 'Active',
      icon: 'bi-stars',
      image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
    });
    setShowModal(true);
  };

  // Open Edit Modal
  const handleOpenEditModal = (facility) => {
    setEditingFacility(facility);
    setFormData({
      name: facility.name,
      description: facility.description,
      hours: facility.hours,
      status: facility.status,
      icon: facility.icon,
      image: facility.image
    });
    setShowModal(true);
  };

  // Handle Input Changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload Simulation
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fakeUrl = URL.createObjectURL(file);
      setFormData((prev) => ({ ...prev, image: fakeUrl }));
    }
  };

  // Save Facility (Add or Update)
  const handleSaveFacility = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) return;

    if (editingFacility) {
      setFacilities((prev) =>
        prev.map((item) =>
          item.id === editingFacility.id ? { ...item, ...formData } : item
        )
      );
    } else {
      const newFacility = {
        id: Date.now(),
        ...formData
      };
      setFacilities((prev) => [newFacility, ...prev]);
    }

    setShowModal(false);
  };

  // Delete Facility
  const handleDeleteFacility = (id) => {
    if (window.confirm('Are you sure you want to delete this facility?')) {
      setFacilities((prev) => prev.filter((item) => item.id !== id));
    }
  };

  return (
    <div className="facilities-container p-4">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row align-items-md-center justify-content-between mb-4 gap-3">
        <div>
          <h2 className="facilities-title mb-1">Facilities</h2>
          <p className="facilities-subtitle mb-0">Manage hotel facilities and services.</p>
        </div>
        <button className="btn btn-gold px-4 py-2" onClick={handleOpenAddModal}>
          <i className="bi bi-plus-circle me-2"></i> Add Facility
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="card shadow-sm border-0 mb-4 rounded-3 p-3 bg-white">
        <div className="row g-3 align-items-center">
          <div className="col-md-7 col-lg-8">
            <div className="input-group">
              <span className="input-group-text bg-light border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control bg-light border-start-0 ps-0"
                placeholder="Search facility name or description..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
          <div className="col-md-5 col-lg-4">
            <div className="d-flex align-items-center justify-content-md-end gap-2">
              <label className="text-muted small fw-bold text-nowrap">Filter Status:</label>
              <select
                className="form-select bg-light"
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
              >
                <option value="All">All Facilities</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Facility Grid */}
      <div className="row g-4">
        {filteredFacilities.length > 0 ? (
          filteredFacilities.map((facility) => (
            <div className="col-12 col-md-6 col-xl-4 col-xxl-3" key={facility.id}>
              <div className="card h-100 facility-card border-0 shadow-sm rounded-3 overflow-hidden">
                <div className="facility-img-wrapper position-relative">
                  <img
                    src={facility.image || 'https://via.placeholder.com/400x250'}
                    alt={facility.name}
                    className="card-img-top facility-img"
                  />
                  <div className="facility-icon-badge shadow">
                    <i className={`bi ${facility.icon}`}></i>
                  </div>
                  <span
                    className={`badge position-absolute top-0 end-0 m-3 px-3 py-2 rounded-pill status-badge ${
                      facility.status === 'Active' ? 'bg-success' : 'bg-secondary'
                    }`}
                  >
                    {facility.status}
                  </span>
                </div>

                <div className="card-body d-flex flex-column p-4">
                  <h5 className="card-title fw-bold text-navy mb-2">{facility.name}</h5>
                  <p className="card-text text-muted small flex-grow-1 mb-3">
                    {facility.description}
                  </p>
                  <div className="facility-hours d-flex align-items-center gap-2 mb-3">
                    <i className="bi bi-clock text-gold"></i>
                    <span className="small fw-medium text-navy">{facility.hours}</span>
                  </div>

                  <div className="d-flex gap-2 pt-2 border-top">
                    <button
                      className="btn btn-outline-navy btn-sm flex-fill d-flex align-items-center justify-content-center gap-1"
                      onClick={() => handleOpenEditModal(facility)}
                    >
                      <i className="bi bi-pencil-square"></i> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center justify-content-center px-3"
                      onClick={() => handleDeleteFacility(facility.id)}
                      title="Delete Facility"
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <div className="empty-state text-muted">
              <i className="bi bi-building-exclamation display-4 text-gold mb-3 d-block"></i>
              <h5>No Facilities Found</h5>
              <p className="small">Try adjusting your search criteria or add a new facility.</p>
            </div>
          </div>
        )}
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="modal-dialog-custom card border-0 shadow-lg rounded-3 p-4 bg-white">
            <div className="d-flex align-items-center justify-content-between border-bottom pb-3 mb-3">
              <h5 className="modal-title fw-bold text-navy mb-0">
                {editingFacility ? 'Edit Facility' : 'Add New Facility'}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={() => setShowModal(false)}
              ></button>
            </div>

            <form onSubmit={handleSaveFacility}>
              <div className="row g-3">
                {/* Name */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-navy">Facility Name</label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    required
                    placeholder="e.g. Grand Ballroom"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Hours */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-navy">Opening Hours</label>
                  <input
                    type="text"
                    className="form-control"
                    name="hours"
                    placeholder="e.g. 08:00 AM - 10:00 PM"
                    value={formData.hours}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Status */}
                <div className="col-md-6">
                  <label className="form-label small fw-bold text-navy">Status</label>
                  <select
                    className="form-select"
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                {/* Description */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-navy">Description</label>
                  <textarea
                    className="form-control"
                    name="description"
                    rows="3"
                    placeholder="Provide details about services, access, or guidelines..."
                    value={formData.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>

                {/* Icon Selection */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-navy">Select Icon</label>
                  <div className="input-group">
                    <span className="input-group-text bg-light">
                      <i className={`bi ${formData.icon}`}></i>
                    </span>
                    <select
                      className="form-select"
                      name="icon"
                      value={formData.icon}
                      onChange={handleInputChange}
                    >
                      {AVAILABLE_ICONS.map((item) => (
                        <option key={item.value} value={item.value}>
                          {item.label} ({item.value})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Image Upload UI */}
                <div className="col-12">
                  <label className="form-label small fw-bold text-navy">Facility Image</label>
                  <div className="d-flex align-items-center gap-3">
                    {formData.image && (
                      <img
                        src={formData.image}
                        alt="Preview"
                        className="rounded border"
                        style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                      />
                    )}
                    <input
                      type="file"
                      className="form-control"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </div>
                  <small className="text-muted d-block mt-1">
                    Upload an image or paste a URL below.
                  </small>
                  <input
                    type="text"
                    className="form-control mt-2"
                    name="image"
                    placeholder="Image URL (optional)"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              {/* Modal Actions */}
              <div className="d-flex justify-content-end gap-2 border-top pt-3 mt-4">
                <button
                  type="button"
                  className="btn btn-light px-4"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-gold px-4">
                  Save Facility
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}