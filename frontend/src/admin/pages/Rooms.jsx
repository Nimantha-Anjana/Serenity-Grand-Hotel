import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Rooms.css';

/**
 * Rooms Component for Serenity Grand Hotel Admin Panel.
 * Handles room inventory browsing, multi-criteria filtering, view modal,
 * and delete confirmation handling. Add/Edit lives in forms/RoomForm.jsx.
 */
const Rooms = () => {
  // Static initial room dataset

  // States
  const { rooms, setRooms } = useAdminData();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priceFilter, setPriceFilter] = useState('');

  // Modals state management
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [selectedRoom, setSelectedRoom] = useState(null);

  // Filter logic
  const filteredRooms = rooms.filter((room) => {
    const matchesSearch =
      room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      room.number.includes(searchQuery);

    const matchesType = typeFilter === '' || room.type === typeFilter;
    const matchesStatus = statusFilter === '' || room.status === statusFilter;

    let matchesPrice = true;
    if (priceFilter === 'under500') matchesPrice = room.price < 500;
    if (priceFilter === '500to1000') matchesPrice = room.price >= 500 && room.price <= 1000;
    if (priceFilter === 'over1000') matchesPrice = room.price > 1000;

    return matchesSearch && matchesType && matchesStatus && matchesPrice;
  });

  const handleResetFilters = () => {
    setSearchQuery('');
    setTypeFilter('');
    setStatusFilter('');
    setPriceFilter('');
  };

  // Open view / delete modals (add + edit now live on their own form pages)
  const openViewModal = (room) => {
    setSelectedRoom(room);
    setShowViewModal(true);
  };

  const openDeleteModal = (room) => {
    setSelectedRoom(room);
    setShowDeleteModal(true);
  };

  const handleDeleteConfirm = () => {
    setRooms(rooms.filter((r) => r.id !== selectedRoom.id));
    setShowDeleteModal(false);
  };

  return (
    <div className="rooms-container">
      {/* 1. Page Header */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center mb-4">
        <div>
          <h2 className="brand-font page-title">Rooms Management</h2>
          <p className="text-muted small mb-0">Manage hotel room inventory, rates, and operational status.</p>
        </div>
        <button type="button" className="btn btn-luxury-gold mt-3 mt-md-0" onClick={() => navigate('/admin/rooms/add')}>
          <i className="bi bi-plus-lg me-2"></i>Add New Room
        </button>
      </div>

      {/* 2. Filter & Search Panel */}
      <div className="luxury-card filter-card p-3 p-md-4 mb-4">
        <div className="row g-3">
          <div className="col-12 col-md-4 col-lg-3">
            <div className="input-group search-group">
              <span className="input-group-text bg-white border-end-0">
                <i className="bi bi-search text-muted"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0"
                placeholder="Search room name or #..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <select
              className="form-select custom-select"
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="">All Room Types</option>
              <option value="Deluxe Room">Deluxe Room</option>
              <option value="Executive Room">Executive Room</option>
              <option value="Suite">Suite</option>
              <option value="Family Room">Family Room</option>
              <option value="Presidential Suite">Presidential Suite</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <select
              className="form-select custom-select"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">All Statuses</option>
              <option value="Available">Available</option>
              <option value="Occupied">Occupied</option>
              <option value="Reserved">Reserved</option>
              <option value="Maintenance">Maintenance</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-2">
            <select
              className="form-select custom-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
            >
              <option value="">All Prices</option>
              <option value="under500">Under $500</option>
              <option value="500to1000">$500 - $1,000</option>
              <option value="over1000">Over $1,000</option>
            </select>
          </div>

          <div className="col-12 col-sm-6 col-md-3 col-lg-3 d-flex gap-2 justify-content-end">
            <button type="button" className="btn btn-luxury-navy w-100">
              <i className="bi bi-funnel me-1"></i>Filter
            </button>
            <button type="button" className="btn btn-outline-secondary w-100" onClick={handleResetFilters}>
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* 3. Rooms Table */}
      <div className="luxury-card p-3 p-md-4">
        <div className="table-responsive">
          <table className="table rooms-table align-middle mb-0">
            <thead>
              <tr>
                <th>Image</th>
                <th>Room #</th>
                <th>Room Name</th>
                <th>Type</th>
                <th>Price / Night</th>
                <th>Guests</th>
                <th>Bed Type</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <tr key={room.id}>
                    <td>
                      <img src={room.image} alt={room.name} className="room-thumb-img" />
                    </td>
                    <td>
                      <span className="badge-room-num">#{room.number}</span>
                    </td>
                    <td>
                      <div className="fw-bold text-navy">{room.name}</div>
                      <span className="extra-small text-muted">{room.size}</span>
                    </td>
                    <td>
                      <span className="badge-type">{room.type}</span>
                    </td>
                    <td className="fw-bold text-gold">${room.price}</td>
                    <td>
                      <i className="bi bi-people me-1 text-muted"></i>
                      {room.guests} Max
                    </td>
                    <td className="small text-muted">{room.bedType}</td>
                    <td>
                      <span className={`status-badge ${room.status.toLowerCase()}`}>
                        {room.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <div className="btn-group action-btn-group">
                        <button
                          type="button"
                          className="btn btn-action view"
                          title="View Details"
                          onClick={() => openViewModal(room)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-action edit"
                          title="Edit Room"
                          onClick={() => navigate(`/admin/rooms/edit/${room.id}`)}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          type="button"
                          className="btn btn-action delete"
                          title="Delete Room"
                          onClick={() => openDeleteModal(room)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-4 text-muted">
                    No rooms found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* 5. View Room Modal */}
      {showViewModal && selectedRoom && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal-dialog">
            <div className="luxury-card modal-content-box p-4">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="brand-font mb-0">{selectedRoom.name}</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowViewModal(false)}
                ></button>
              </div>
              <div className="view-room-body">
                <img
                  src={selectedRoom.image}
                  alt={selectedRoom.name}
                  className="w-100 rounded mb-3 view-modal-img"
                />
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <span className="badge-room-num">Room #{selectedRoom.number}</span>
                  <span className={`status-badge ${selectedRoom.status.toLowerCase()}`}>
                    {selectedRoom.status}
                  </span>
                </div>
                <h5 className="text-gold fw-bold mb-3">${selectedRoom.price} / Night</h5>
                <p className="text-muted small mb-3">{selectedRoom.description}</p>
                <div className="row g-2 mb-3 small">
                  <div className="col-6"><strong>Type:</strong> {selectedRoom.type}</div>
                  <div className="col-6"><strong>Size:</strong> {selectedRoom.size}</div>
                  <div className="col-6"><strong>Guests:</strong> {selectedRoom.guests} Persons</div>
                  <div className="col-6"><strong>Bed:</strong> {selectedRoom.bedType}</div>
                  <div className="col-12"><strong>View:</strong> {selectedRoom.view}</div>
                </div>
                <div className="amenities-box pt-2 border-top">
                  <h6 className="small fw-bold mb-2">Amenities:</h6>
                  <div className="d-flex flex-wrap gap-1">
                    {selectedRoom.amenities &&
                      selectedRoom.amenities.map((item, idx) => (
                        <span key={idx} className="badge bg-light text-dark border">
                          {item}
                        </span>
                      ))}
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end mt-4">
                <button
                  type="button"
                  className="btn btn-luxury-navy"
                  onClick={() => setShowViewModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 6. Delete Confirmation Modal */}
      {showDeleteModal && selectedRoom && (
        <div className="modal-backdrop-custom">
          <div className="custom-modal-dialog delete-dialog">
            <div className="luxury-card modal-content-box p-4 text-center">
              <div className="delete-icon-box mx-auto mb-3">
                <i className="bi bi-exclamation-triangle-fill text-danger"></i>
              </div>
              <h4 className="brand-font">Delete Room #{selectedRoom.number}?</h4>
              <p className="text-muted small">
                Are you sure you want to delete <strong>{selectedRoom.name}</strong>? This action cannot be undone.
              </p>
              <div className="d-flex justify-content-center gap-2 mt-4">
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger px-4"
                  onClick={handleDeleteConfirm}
                >
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

export default Rooms;