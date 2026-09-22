import React, { useState } from 'react';
import '../css/Bookings.css';

const INITIAL_BOOKINGS = [
  {
    id: 'SGH-1092',
    guest: { name: 'Lady Eleanor Vance', email: 'e.vance@royalnet.co.uk', phone: '+44 20 7946 0912', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Royal Penthouse Suite', type: 'Penthouse', number: 'PH-01' },
    checkIn: '2026-10-12',
    checkOut: '2026-10-18',
    guestsCount: { adults: 2, children: 1 },
    amount: 14700,
    paymentStatus: 'Paid in Full',
    status: 'Confirmed'
  },
  {
    id: 'SGH-1093',
    guest: { name: 'Lord Harrison Ford', email: 'harrison.f@skydance.com', phone: '+1 310 555 0199', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Presidential Ocean Suite', type: 'Presidential', number: '702' },
    checkIn: '2026-10-14',
    checkOut: '2026-10-20',
    guestsCount: { adults: 2, children: 0 },
    amount: 11400,
    paymentStatus: 'Deposit Paid (50%)',
    status: 'Pending'
  },
  {
    id: 'SGH-1094',
    guest: { name: 'Dr. Sophia Sterling', email: 's.sterling@cambridge.edu', phone: '+44 1223 337799', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Grand Deluxe Ocean View', type: 'Deluxe', number: '415' },
    checkIn: '2026-10-10',
    checkOut: '2026-10-15',
    guestsCount: { adults: 1, children: 0 },
    amount: 3250,
    paymentStatus: 'Paid in Full',
    status: 'Checked In'
  },
  {
    id: 'SGH-1095',
    guest: { name: 'Alexander Wright', email: 'awright@capitalventures.com', phone: '+1 212 555 0148', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Executive Garden Villa', type: 'Villa', number: 'V-04' },
    checkIn: '2026-10-01',
    checkOut: '2026-10-06',
    guestsCount: { adults: 4, children: 2 },
    amount: 9500,
    paymentStatus: 'Paid in Full',
    status: 'Completed'
  },
  {
    id: 'SGH-1096',
    guest: { name: 'Camilla Rothschild', email: 'camilla@rothschild-art.fr', phone: '+33 1 42 68 55 00', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Serenity Diplomatic Suite', type: 'Suite', number: '601' },
    checkIn: '2026-10-25',
    checkOut: '2026-10-30',
    guestsCount: { adults: 2, children: 0 },
    amount: 6200,
    paymentStatus: 'Refunded',
    status: 'Cancelled'
  },
  {
    id: 'SGH-1097',
    guest: { name: 'Viktor Morozov', email: 'v.morozov@investcorp.ch', phone: '+41 22 819 3000', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Presidential Ocean Suite', type: 'Presidential', number: '701' },
    checkIn: '2026-11-02',
    checkOut: '2026-11-08',
    guestsCount: { adults: 2, children: 1 },
    amount: 11400,
    paymentStatus: 'Pending',
    status: 'Pending'
  }
];

export default function Bookings() {
  const [bookings, setBookings] = useState(INITIAL_BOOKINGS);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [roomTypeFilter, setRoomTypeFilter] = useState('All');
  const [checkInFilter, setCheckInFilter] = useState('');
  const [checkOutFilter, setCheckOutFilter] = useState('');
  
  // Modal State
  const [selectedBooking, setSelectedBooking] = useState(null);

  // Status Handlers
  const handleUpdateStatus = (id, newStatus) => {
    setBookings(prev =>
      prev.map(b => (b.id === id ? { ...b, status: newStatus } : b))
    );
    if (selectedBooking && selectedBooking.id === id) {
      setSelectedBooking(prev => ({ ...prev, status: newStatus }));
    }
  };

  // Filter Logic
  const filteredBookings = bookings.filter(b => {
    const matchesSearch =
      b.guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.id.toLowerCase().includes(searchTerm.toLowerCase());
      
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    const matchesRoomType = roomTypeFilter === 'All' || b.room.type === roomTypeFilter;
    const matchesCheckIn = !checkInFilter || b.checkIn >= checkInFilter;
    const matchesCheckOut = !checkOutFilter || b.checkOut <= checkOutFilter;

    return matchesSearch && matchesStatus && matchesRoomType && matchesCheckIn && matchesCheckOut;
  });

  // Calculate Summary Statistics
  const totalBookings = bookings.length;
  const pendingCount = bookings.filter(b => b.status === 'Pending').length;
  const confirmedCount = bookings.filter(b => b.status === 'Confirmed' || b.status === 'Checked In').length;
  const cancelledCount = bookings.filter(b => b.status === 'Cancelled').length;

  const renderStatusBadge = (status) => {
    switch (status) {
      case 'Confirmed':
        return <span className="badge-booking badge-confirmed"><i className="bi bi-check-circle-fill me-1"></i>Confirmed</span>;
      case 'Pending':
        return <span className="badge-booking badge-pending"><i className="bi bi-hourglass-split me-1"></i>Pending</span>;
      case 'Checked In':
        return <span className="badge-booking badge-checked-in"><i className="bi bi-key-fill me-1"></i>Checked In</span>;
      case 'Completed':
        return <span className="badge-booking badge-completed"><i className="bi bi-award-fill me-1"></i>Completed</span>;
      case 'Cancelled':
        return <span className="badge-booking badge-cancelled"><i className="bi bi-x-circle-fill me-1"></i>Cancelled</span>;
      default:
        return <span className="badge-booking">{status}</span>;
    }
  };

  return (
    <div className="bookings-page">
      {/* Header Section */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center mb-4">
        <div>
          <h1 className="h2 mb-1 text-primary-navy fw-bold">Bookings</h1>
          <p className="text-muted mb-0">Manage and monitor hotel reservations for Serenity Grand Hotel.</p>
        </div>
        <button className="btn btn-luxury-gold mt-3 mt-md-0 d-flex align-items-center gap-2">
          <i className="bi bi-plus-lg"></i>
          <span>New Reservation</span>
        </button>
      </div>

      {/* Statistics Cards */}
      <div className="row g-3 mb-4">
        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-navy-subtle text-primary">
              <i className="bi bi-journal-bookmark fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Total Bookings</div>
              <div className="h3 mb-0 fw-bold text-dark">{totalBookings}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-warning-subtle text-warning">
              <i className="bi bi-clock-history fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Pending</div>
              <div className="h3 mb-0 fw-bold text-dark">{pendingCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-success-subtle text-success">
              <i className="bi bi-check2-circle fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Confirmed</div>
              <div className="h3 mb-0 fw-bold text-dark">{confirmedCount}</div>
            </div>
          </div>
        </div>

        <div className="col-12 col-sm-6 col-xl-3">
          <div className="card card-luxury border-0 p-3 d-flex flex-row align-items-center gap-3">
            <div className="stat-icon bg-danger-subtle text-danger">
              <i className="bi bi-slash-circle fs-4"></i>
            </div>
            <div>
              <div className="text-muted fs-7 text-uppercase fw-semibold tracking-wider">Cancelled</div>
              <div className="h3 mb-0 fw-bold text-dark">{cancelledCount}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filter and Search Toolbar */}
      <div className="card card-luxury p-3 mb-4 border-0">
        <div className="row g-3">
          {/* Search Box */}
          <div className="col-12 col-md-4 col-lg-3">
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0 text-muted">
                <i className="bi bi-search"></i>
              </span>
              <input
                type="text"
                className="form-control border-start-0 ps-0 search-input"
                placeholder="Search guest or Booking ID..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Status Filter */}
          <div className="col-6 col-md-2 col-lg-2">
            <select
              className="form-select luxury-select"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Checked In">Checked In</option>
              <option value="Completed">Completed</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          {/* Room Type Filter */}
          <div className="col-6 col-md-2 col-lg-2">
            <select
              className="form-select luxury-select"
              value={roomTypeFilter}
              onChange={e => setRoomTypeFilter(e.target.value)}
            >
              <option value="All">All Room Types</option>
              <option value="Penthouse">Penthouse</option>
              <option value="Presidential">Presidential</option>
              <option value="Deluxe">Deluxe</option>
              <option value="Villa">Villa</option>
              <option value="Suite">Suite</option>
            </select>
          </div>

          {/* Check-In Date */}
          <div className="col-6 col-md-2 col-lg-2">
            <input
              type="date"
              className="form-control luxury-select"
              value={checkInFilter}
              onChange={e => setCheckInFilter(e.target.value)}
              title="Check-In From"
            />
          </div>

          {/* Check-Out Date */}
          <div className="col-6 col-md-2 col-lg-2">
            <input
              type="date"
              className="form-control luxury-select"
              value={checkOutFilter}
              onChange={e => setCheckOutFilter(e.target.value)}
              title="Check-Out To"
            />
          </div>

          {/* Filter Reset Button */}
          <div className="col-12 col-lg-1 d-flex justify-content-end">
            <button
              className="btn btn-outline-secondary w-100 d-flex align-items-center justify-content-center"
              title="Reset Filters"
              onClick={() => {
                setSearchTerm('');
                setStatusFilter('All');
                setRoomTypeFilter('All');
                setCheckInFilter('');
                setCheckOutFilter('');
              }}
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
          </div>
        </div>
      </div>

      {/* Bookings Table */}
      <div className="card card-luxury border-0 overflow-hidden mb-4">
        <div className="table-responsive">
          <table className="table luxury-table align-middle mb-0">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Guest</th>
                <th>Room</th>
                <th>Check-In</th>
                <th>Check-Out</th>
                <th>Guests</th>
                <th>Amount</th>
                <th>Status</th>
                <th className="text-end">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBookings.length > 0 ? (
                filteredBookings.map((b) => (
                  <tr key={b.id}>
                    <td className="fw-bold text-primary-navy">{b.id}</td>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <img
                          src={b.guest.avatar}
                          alt={b.guest.name}
                          className="rounded-circle guest-avatar"
                        />
                        <div>
                          <div className="fw-semibold text-dark fs-7">{b.guest.name}</div>
                          <div className="text-muted fs-8">{b.guest.email}</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <div className="fw-medium text-dark fs-7">{b.room.name}</div>
                      <span className="badge bg-light text-muted border fs-8">Room {b.room.number}</span>
                    </td>
                    <td className="fs-7 text-dark">{b.checkIn}</td>
                    <td className="fs-7 text-dark">{b.checkOut}</td>
                    <td className="fs-7 text-dark">
                      {b.guestsCount.adults} Adults, {b.guestsCount.children} Child
                    </td>
                    <td className="fw-bold text-dark fs-7">${b.amount.toLocaleString()}</td>
                    <td>{renderStatusBadge(b.status)}</td>
                    <td className="text-end">
                      <div className="d-inline-flex gap-1">
                        <button
                          className="btn btn-action btn-outline-primary"
                          title="View Details"
                          onClick={() => setSelectedBooking(b)}
                        >
                          <i className="bi bi-eye"></i>
                        </button>
                        {b.status === 'Pending' && (
                          <button
                            className="btn btn-action btn-outline-success"
                            title="Confirm Booking"
                            onClick={() => handleUpdateStatus(b.id, 'Confirmed')}
                          >
                            <i className="bi bi-check-lg"></i>
                          </button>
                        )}
                        {b.status !== 'Cancelled' && b.status !== 'Completed' && (
                          <button
                            className="btn btn-action btn-outline-danger"
                            title="Cancel Booking"
                            onClick={() => handleUpdateStatus(b.id, 'Cancelled')}
                          >
                            <i className="bi bi-x-lg"></i>
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center py-5 text-muted">
                    <i className="bi bi-inbox fs-1 d-block mb-2 text-secondary"></i>
                    No bookings found matching the selected criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        <div className="d-flex flex-column flex-sm-row justify-content-between align-items-center p-3 border-top border-light">
          <span className="text-muted fs-7 mb-2 mb-sm-0">
            Showing <strong className="text-dark">{filteredBookings.length}</strong> of <strong className="text-dark">{totalBookings}</strong> reservations
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
                <button className="page-link">2</button>
              </li>
              <li className="page-item">
                <button className="page-link"><i className="bi bi-chevron-right"></i></button>
              </li>
            </ul>
          </nav>
        </div>
      </div>

      {/* Booking Details Modal */}
      {selectedBooking && (
        <div className="modal-backdrop-custom d-flex align-items-center justify-content-center">
          <div className="card card-luxury modal-content-custom border-0 p-4 shadow-lg">
            <div className="d-flex justify-content-between align-items-center pb-3 mb-3 border-bottom">
              <div>
                <h2 className="h4 mb-0 text-primary-navy">Reservation Details</h2>
                <span className="text-muted fs-7">Booking Ref: <strong>{selectedBooking.id}</strong></span>
              </div>
              <button
                type="button"
                className="btn-close"
                onClick={() => setSelectedBooking(null)}
              ></button>
            </div>

            <div className="modal-body-custom">
              {/* Guest Information */}
              <div className="p-3 mb-3 bg-light rounded-3">
                <h6 className="text-uppercase text-gold fw-bold fs-8 tracking-wider mb-2">Guest Profile</h6>
                <div className="d-flex align-items-center gap-3">
                  <img
                    src={selectedBooking.guest.avatar}
                    alt={selectedBooking.guest.name}
                    className="rounded-circle modal-guest-avatar"
                  />
                  <div>
                    <h5 className="mb-0 text-dark fw-bold">{selectedBooking.guest.name}</h5>
                    <div className="text-muted fs-7">{selectedBooking.guest.email}</div>
                    <div className="text-muted fs-7">{selectedBooking.guest.phone}</div>
                  </div>
                </div>
              </div>

              {/* Reservation & Room Summary */}
              <div className="row g-3 mb-3">
                <div className="col-6">
                  <div className="p-3 border rounded-3 h-100">
                    <h6 className="text-uppercase text-muted fs-8 fw-bold mb-2">Accommodation</h6>
                    <div className="fw-bold text-dark">{selectedBooking.room.name}</div>
                    <div className="text-muted fs-7">Room Number: {selectedBooking.room.number}</div>
                    <div className="text-muted fs-7">Type: {selectedBooking.room.type}</div>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 border rounded-3 h-100">
                    <h6 className="text-uppercase text-muted fs-8 fw-bold mb-2">Dates & Guests</h6>
                    <div className="fs-7"><strong>Check-In:</strong> {selectedBooking.checkIn}</div>
                    <div className="fs-7"><strong>Check-Out:</strong> {selectedBooking.checkOut}</div>
                    <div className="fs-7"><strong>Guests:</strong> {selectedBooking.guestsCount.adults} Adults, {selectedBooking.guestsCount.children} Children</div>
                  </div>
                </div>
              </div>

              {/* Financials & Status */}
              <div className="row g-3 mb-4">
                <div className="col-6">
                  <div className="p-3 border rounded-3 bg-white">
                    <h6 className="text-uppercase text-muted fs-8 fw-bold mb-1">Total Payment</h6>
                    <div className="h4 mb-1 text-primary-navy fw-bold">${selectedBooking.amount.toLocaleString()}</div>
                    <span className="badge bg-success-subtle text-success fs-8">{selectedBooking.paymentStatus}</span>
                  </div>
                </div>

                <div className="col-6">
                  <div className="p-3 border rounded-3 bg-white">
                    <h6 className="text-uppercase text-muted fs-8 fw-bold mb-1">Current Status</h6>
                    <div className="mt-2">{renderStatusBadge(selectedBooking.status)}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Modal Actions */}
            <div className="d-flex justify-content-end gap-2 pt-3 border-top">
              {selectedBooking.status === 'Pending' && (
                <button
                  className="btn btn-luxury-gold me-auto"
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'Confirmed')}
                >
                  Confirm Booking
                </button>
              )}
              {selectedBooking.status !== 'Cancelled' && (
                <button
                  className="btn btn-outline-danger"
                  onClick={() => handleUpdateStatus(selectedBooking.id, 'Cancelled')}
                >
                  Cancel Booking
                </button>
              )}
              <button className="btn btn-secondary" onClick={() => setSelectedBooking(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}