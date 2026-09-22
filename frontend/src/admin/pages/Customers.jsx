import React, { useState } from 'react';
import '../css/Customers.css';

const INITIAL_CUSTOMERS = [
  {
    id: 1,
    name: 'Lady Eleanor Vance',
    email: 'e.vance@royalnet.co.uk',
    phone: '+44 20 7946 0912',
    address: '45 Kensington Palace Gardens, London, UK',
    regDate: '2024-03-15',
    totalBookings: 12,
    lastVisit: '2026-10-12',
    status: 'Returning',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1092', room: 'Royal Penthouse Suite', date: '2026-10-12', amount: '$14,700' },
      { id: 'SGH-0980', room: 'Presidential Ocean Suite', date: '2026-05-20', amount: '$11,400' }
    ]
  },
  {
    id: 2,
    name: 'Lord Harrison Ford',
    email: 'harrison.f@skydance.com',
    phone: '+1 310 555 0199',
    address: '10200 Sunset Blvd, Los Angeles, CA, USA',
    regDate: '2026-09-01',
    totalBookings: 1,
    lastVisit: '2026-10-14',
    status: 'New',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1093', room: 'Presidential Ocean Suite', date: '2026-10-14', amount: '$11,400' }
    ]
  },
  {
    id: 3,
    name: 'Dr. Sophia Sterling',
    email: 's.sterling@cambridge.edu',
    phone: '+44 1223 337799',
    address: '12 Trinity Street, Cambridge, UK',
    regDate: '2025-01-10',
    totalBookings: 6,
    lastVisit: '2026-10-10',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1094', room: 'Grand Deluxe Ocean View', date: '2026-10-10', amount: '$3,250' }
    ]
  },
  {
    id: 4,
    name: 'Alexander Wright',
    email: 'awright@capitalventures.com',
    phone: '+1 212 555 0148',
    address: '740 Park Avenue, New York, NY, USA',
    regDate: '2023-11-20',
    totalBookings: 18,
    lastVisit: '2026-10-01',
    status: 'Returning',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1095', room: 'Executive Garden Villa', date: '2026-10-01', amount: '$9,500' }
    ]
  },
  {
    id: 5,
    name: 'Camilla Rothschild',
    email: 'camilla@rothschild-art.fr',
    phone: '+33 1 42 68 55 00',
    address: '18 Avenue Montaigne, Paris, France',
    regDate: '2026-08-14',
    totalBookings: 2,
    lastVisit: '2026-10-25',
    status: 'New',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1096', room: 'Serenity Diplomatic Suite', date: '2026-10-25', amount: '$6,200' }
    ]
  },
  {
    id: 6,
    name: 'Viktor Morozov',
    email: 'v.morozov@investcorp.ch',
    phone: '+41 22 819 3000',
    address: 'Rue du Rhône 42, Geneva, Switzerland',
    regDate: '2025-06-05',
    totalBookings: 4,
    lastVisit: '2026-11-02',
    status: 'Active',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80',
    recentBookings: [
      { id: 'SGH-1097', room: 'Presidential Ocean Suite', date: '2026-11-02', amount: '$11,400' }
    ]
  }
];

export default function Customers() {
  const [customers, setCustomers] = useState(INITIAL_CUSTOMERS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [regDateFilter, setRegDateFilter] = useState('');

  // Modals state
  const [viewCustomer, setViewCustomer] = useState(null);
  const [editCustomer, setEditCustomer] = useState(null);
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
  const handleEditSave = (e) => {
    e.preventDefault();
    setCustomers(prev =>
      prev.map(c => (c.id === editCustomer.id ? editCustomer : c))
    );
    setEditCustomer(null);
  };

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
          className="btn btn-luxury-gold mt-3 mt-md-0 d-flex align-items-center gap-2"
          onClick={() => setEditCustomer({ id: Date.now(), name: '', email: '', phone: '', address: '', regDate: new Date().toISOString().split('T')[0], totalBookings: 0, lastVisit: '-', status: 'New', avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80', recentBookings: [] })}
        >
          <i className="bi bi-person-plus-fill"></i>
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
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
              title="Reset Filters"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setRegDateFilter('');
              }}
            >
              <i className="bi bi-arrow-counterclockwise me-1 d-none d-lg-inline"></i>
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
                      <div className="d-inline-flex gap-1">
                        <button
                          className="btn btn-action btn-outline-primary"
                          title="View Profile"
                          onClick={() => setViewCustomer(c)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        <button
                          className="btn btn-action btn-outline-warning text-dark"
                          title="Edit Customer"
                          onClick={() => setEditCustomer({ ...c })}
                        >
                          <i className="bi bi-pencil"></i>
                        </button>
                        <button
                          className="btn btn-action btn-outline-danger"
                          title="Delete Customer"
                          onClick={() => setDeleteCustomer(c)}
                        >
                          <i className="bi bi-trash"></i>
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
              <h2 className="h4 mb-0 text-primary-navy">Customer Profile</h2>
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
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">Email Address</span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.email}</span>
                  </div>
                </div>
                <div className="col-6">
                  <div className="p-3 border rounded-3 h-100 bg-white">
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">Phone Number</span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.phone}</span>
                  </div>
                </div>
                <div className="col-12">
                  <div className="p-3 border rounded-3 bg-white">
                    <span className="text-uppercase text-muted fs-8 fw-bold d-block mb-1">Residential Address</span>
                    <span className="fs-7 text-dark fw-medium">{viewCustomer.address}</span>
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
              <button className="btn btn-secondary" onClick={() => setViewCustomer(null)}>Close</button>
            </div>
          </div>
        </div>
      )}

      {/* 6. Edit / Add Modal */}
      {editCustomer && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <h2 className="h4 mb-0 text-primary-navy">
                {editCustomer.id ? 'Edit Customer Profile' : 'Add New Customer'}
              </h2>
              <button type="button" className="btn-close" onClick={() => setEditCustomer(null)}></button>
            </div>

            <form onSubmit={handleEditSave}>
              <div className="row g-3 mb-3">
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Full Name</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editCustomer.name}
                    onChange={e => setEditCustomer({ ...editCustomer, name: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fs-7 fw-semibold">Email Address</label>
                  <input
                    type="email"
                    className="form-control luxury-select"
                    required
                    value={editCustomer.email}
                    onChange={e => setEditCustomer({ ...editCustomer, email: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fs-7 fw-semibold">Phone Number</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    required
                    value={editCustomer.phone}
                    onChange={e => setEditCustomer({ ...editCustomer, phone: e.target.value })}
                  />
                </div>
                <div className="col-12">
                  <label className="form-label fs-7 fw-semibold">Address</label>
                  <input
                    type="text"
                    className="form-control luxury-select"
                    value={editCustomer.address}
                    onChange={e => setEditCustomer({ ...editCustomer, address: e.target.value })}
                  />
                </div>
                <div className="col-6">
                  <label className="form-label fs-7 fw-semibold">Status</label>
                  <select
                    className="form-select luxury-select"
                    value={editCustomer.status}
                    onChange={e => setEditCustomer({ ...editCustomer, status: e.target.value })}
                  >
                    <option value="New">New</option>
                    <option value="Returning">Returning</option>
                    <option value="Active">Active</option>
                  </select>
                </div>
                <div className="col-6">
                  <label className="form-label fs-7 fw-semibold">Registration Date</label>
                  <input
                    type="date"
                    className="form-control luxury-select"
                    value={editCustomer.regDate}
                    onChange={e => setEditCustomer({ ...editCustomer, regDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="d-flex justify-content-end gap-2 pt-3 border-top">
                <button type="button" className="btn btn-secondary" onClick={() => setEditCustomer(null)}>Cancel</button>
                <button type="submit" className="btn btn-luxury-gold">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 7. Delete Modal */}
      {deleteCustomer && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg text-center" style={{ maxWidth: '450px' }}>
            <div className="text-danger mb-3">
              <i className="bi bi-exclamation-triangle-fill fs-1"></i>
            </div>
            <h3 className="h4 text-dark mb-2">Delete Customer Profile?</h3>
            <p className="text-muted fs-7 mb-4">
              Are you sure you want to remove <strong>{deleteCustomer.name}</strong>? This action cannot be undone.
            </p>
            <div className="d-flex justify-content-center gap-2">
              <button className="btn btn-secondary px-4" onClick={() => setDeleteCustomer(null)}>Cancel</button>
              <button className="btn btn-danger px-4" onClick={handleDeleteConfirm}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}