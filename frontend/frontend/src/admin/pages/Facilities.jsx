import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Facilities.css';



export default function Facilities() {
  const { facilities, setFacilities } = useAdminData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  // Filter facilities based on search & status
  const filteredFacilities = facilities.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || item.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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
        <button className="btn btn-gold px-4 py-2" onClick={() => navigate('/admin/facilities/add')}>
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
                      onClick={() => navigate(`/admin/facilities/edit/${facility.id}`)}
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

    </div>
  );
}