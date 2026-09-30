import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import '../css/Customers.css';



export default function Customers() {
  const { customers, setCustomers } = useAdminData();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regDateFilter, setRegDateFilter] = useState('');

  // Modals state
  const [viewCustomer, setViewCustomer] = useState(null);
  const [deleteCustomer, setDeleteCustomer] = useState(null);

  // Filter Logic
  const filteredCustomers = customers.filter(c => {
    const matchesSearch =
      c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.phone.includes(searchTerm);

    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesRegDate = !regDateFilter || c.regDate >= regDateFilter;

    return matchesSearch && matchesStatus && matchesRegDate;
  });

  // Calculate Summary Statistics
  const totalCustomers = customers.length;
  const newCount = customers.filter(c => c.status === 'New').length;
  const returningCount = customers.filter(c => c.status === 'Returning').length;
  const activeCount = customers.filter(c => c.status === 'Active').length;

  // Handlers
  const handleDeleteConfirm = () => {
    setCustomers(prev => prev.filter(c => c.id !== deleteCustomer.id));
    setDeleteCustomer(null);
  };

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'New':
        return <span className="badge-cust badge-new"><i className="bi bi-star-fill me-1"></i>New</span>;
      case 'Returning':
        return <span className="badge-cust badge-returning"><i className="bi bi-arrow-repeat me-1"></i>Returning</span>;
      case 'Active':
        return <span className="badge-cust badge-active"><i className="bi bi-person-check-fill me-1"></i>Active</span>;
      default:
        return <span className="badge-cust">{status}</span>;
    }
  };

  return (
    <div className="customers-page">
      {/* 1. Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h2 mb-1 text-primary-navy fw-bold">Customers</h1>
          <p className="text-muted mb-0">View and manage hotel customer profiles & history.</p>
        </div>
        <button 
          className="btn btn-luxury-gold mt-3 mt-md-0 d-flex align-items-center gap-2 px-3 py-2"
          onClick={() => navigate('/admin/customers/add')}
        >
          <i className="bi bi-person-plus-fill fs-6"></i>
          <span>Add New Customer</span>
        </button>
      </div>

      {/* 2. Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-navy-subtle text-primary">
              <i className="bi bi-people-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Total Customers</div>
              <div className="h3 mb-0 fw-bold text-dark">{totalCustomers}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-info-subtle text-info">
              <i className="bi bi-person-plus fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">New Customers</div>
              <div className="h3 mb-0 fw-bold text-dark">{newCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-gold-subtle text-gold">
              <i className="bi bi-award-fill fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Returning</div>
              <div className="h3 mb-0 fw-bold text-dark">{returningCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-person-check fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Active Customers</div>
              <div className="h3 mb-0 fw-bold text-dark">{activeCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Search and Filters Toolbar */}
      <div className="card card-luxury p-3 mb-4 border-0">
        <div className="row g-3">
          <div className="col-12 col-md-5 col-lg-4">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 search-input"
                placeholder="Search by name, email or phone..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <select
              className="form-select luxury-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="New">New</option>
              <option value="Returning">Returning</option>
              <option value="Active">Active</option>
            </select>
          </div>

          <div className="col-6 col-md-3 col-lg-3">
            <input
              type="date"
              className="form-control luxury-select"
              value={regDateFilter}
              onChange={e => setRegDateFilter(e.target.value)}
              title="Registered From Date"
            />
          </div>

          <div className="col-12 col-md-1 col-lg-2 d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center gap-1"
              title="Reset Filters"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setRegDateFilter('');
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4. Customer Table */}
      <div className="card card-luxury border-0 overflow-hidden mb-4">
        <div className="table-responsive">
          <table className="table luxury-table align-middle mb-0">
            <thead>
              <tr>
                <th>Profile</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Total Bookings</th>
                <th>Last Visit</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map(c => (
                  <tr key={c.id}>
                    <td>
                      <img
                        src={c.avatar}
                        alt={c.name}
                        className="rounded-circle cust-table-avatar"
                      />
                    </td>
                    <td className="fw-bold text-dark fs-7">{c.name}</td>
                    <td className="text-muted fs-7">{c.email}</td>
                    <td className="text-dark fs-7">{c.phone}</td>
                    <td>
                      <span className="badge bg-light text-dark border fw-bold fs-7 px-2 py-1">
                        {c.totalBookings} Stay{c.totalBookings !== 1 ? 's' : ''}
                      </span>
                    </td>
                    <td className="text-dark fs-7">{c.lastVisit}</td>
                    <td>{renderStatusBadge(c.status)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-1 action-buttons">
                        <button
                          className="btn btn-action btn-outline-primary rounded-circle"
                          title="View Profile"
                          onClick={() => setViewCustomer(c)}
                        >
                          <i className="bi bi-eye-fill"></i>
                        </button>
                        <button
                          className="btn btn-action btn-outline-warning text-dark rounded-circle"
                          title="Edit Customer"
                          onClick={() => navigate(`/admin/customers/edit/${c.id}`)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-action btn-outline-danger rounded-circle"
                          title="Delete Customer"
                          onClick={() => setDeleteCustomer(c)}
                        >
                          <i className="bi bi-trash3-fill"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="text-center py-5 text-muted">
                    <i className="bi bi-person-x fs-1 d-block mb-2 text-secondary"></i>
                    No customers found matching the search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 border-top border-light">
          <span className="text-muted fs-7 mb-2 mb-sm-0">
            Showing <strong className="text-dark">{filteredCustomers.length}</strong> of <strong className="text-dark">{totalCustomers}</strong> guests
          </span>
          <nav>
            <ul className="pagination pagination-sm mb-0 luxury-pagination">
              <li className="page-item disabled">
                <button className="page-link"><i className="bi bi-chevron-left"></i></button>
              </li>
              <li className="page-item active">
                <button className="page-link">1</button>
              </li>
              <li className="page-item">
                <button className="page-link"><i className="bi bi-chevron-right"></i></button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* 5. View Details Modal */}
      {viewCustomer && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 className="h4 mb-0 text-primary-navy d-flex align-items-center gap-2">
                <i className="bi bi-person-badge-fill text-gold"></i>
                <span>Customer Profile</span>
              </h2>
              <button type="button" className="btn-close" onClick={() => setViewCustomer(null)}></button>
            </div>

            <div className="modal-body-custom">
              {/* Profile Header */}
              <div className="d-flex align-items-center gap-3 p-3 mb-3 bg-light rounded-3">
                <img
                  src={viewCustomer.avatar}
                  alt={viewCustomer.name}
                  className="rounded-circle modal-cust-avatar"
                />
                <div>
                  <h4 className="mb-1 text-dark fw-bold">{viewCustomer.name}</h4>
                  <div className="d-flex align-items-center gap-2">
                    {renderStatusBadge(viewCustomer.status)}
                    <span className="text-muted fs-8">Member since: {viewCustomer.regDate}</span>
                  </div>
                </div>
              </div>

              {/* Personal Details Grid */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="p-3 border rounded-3 h-100 bg-white">
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">
                      <i className="bi bi-envelope-fill me-1 text-gold"></i>Email Address
                    </span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.email}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border rounded-3 h-100 bg-white">
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">
                      <i className="bi bi-telephone-fill me-1 text-gold"></i>Phone Number
                    </span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.phone}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 border rounded-3 bg-white">
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">
                      <i className="bi bi-geo-alt-fill me-1 text-gold"></i>Residential Address
                    </span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.address || 'N/A'}</span>
                  </div>
                </div>
              </div>

              {/* Stats & History */}
              <div className="p-3 border rounded-3 mb-3 bg-white">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <h6 className="text-uppercase text-gold fw-bold fs-8 tracking-wider mb-0">Reservation History</h6>
                  <span className="badge bg-navy-subtle text-primary fs-8">{viewCustomer.totalBookings} Total Bookings</span>
                </div>
                
                {viewCustomer.recentBookings && viewCustomer.recentBookings.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-sm text-start mb-0 align-middle">
                      <thead>
                        <tr className="text-muted fs-8">
                          <th>REF</th>
                          <th>SUITE / ROOM</th>
                          <th>DATE</th>
                          <th className="text-end">AMOUNT</th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewCustomer.recentBookings.map(rb => (
                          <tr key={rb.id}>
                            <td className="fw-bold text-primary fs-8">{rb.id}</td>
                            <td className="fs-8">{rb.room}</td>
                            <td className="fs-8 text-muted">{rb.date}</td>
                            <td className="fs-8 text-end fw-bold">{rb.amount}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div className="text-muted fs-8 py-2">No recent stay records found.</div>
                )}
              </div>
            </div>

            <div className="d-flex justify-content-end pt-3 border-top">
              <button className="btn btn-secondary d-flex align-items-center gap-1" onClick={() => setViewCustomer(null)}>
                <i className="bi bi-x-circle"></i> Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 8. Delete Modal */}
      {deleteCustomer && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg text-center" style={{ maxWidth: '450px' }}>
            <div className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            </div>
            <h3 className="h4 text-dark mb-2 fw-bold">Delete Customer Profile?</h3>
            <p className="text-muted fs-7 mb-4">
              Are you sure you want to remove <strong>{deleteCustomer.name}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary px-4 d-flex align-items-center gap-1" onClick={() => setDeleteCustomer(null)}>
                <i className="bi bi-x-lg"></i> Cancel
              </button>
              <button className="btn btn-danger px-4 d-flex align-items-center gap-1" onClick={handleDeleteConfirm}>
                <i className="bi bi-trash3-fill"></i> Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}