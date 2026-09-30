import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import { messagesApi } from '../../services/api';
import '../css/Dashboard.css';

/**
 * Dashboard Page for Serenity Grand Hotel Admin Panel.
 * Includes KPI stats, room distribution breakdown, recent bookings table,
 * guest inquiry list, and quick shortcut actions.
 */
const Dashboard = () => {
  // All figures below are calculated from the live database data.
  const { rooms, bookings, customers } = useAdminData();
  const [recentMessages, setRecentMessages] = useState([]);

  useEffect(() => {
    let active = true;
    messagesApi.conversations()
      .then((rows) => {
        if (!active) return;
        setRecentMessages(rows.slice(0, 3).map((c) => {
          const last = c.messages?.[0];
          const other = c.participants?.map((p) => p.user).find((u) => u && u.role !== 'admin');
          return {
            id: c.id,
            sender: other?.name || c.subject || 'Guest',
            preview: last?.messageText || 'No messages yet.',
            time: last?.sentAt ? new Date(last.sentAt).toLocaleString() : '',
            unread: last ? !last.isRead && last.senderId === other?.id : false
          };
        }));
      })
      .catch(() => { if (active) setRecentMessages([]); });
    return () => { active = false; };
  }, []);

  const todayStr = new Date().toISOString().split('T')[0];
  const countRooms = (status) => rooms.filter((r) => r.status === status).length;
  const roomStatus = {
    total: rooms.length,
    available: countRooms('Available'),
    occupied: countRooms('Occupied'),
    reserved: countRooms('Reserved'),
    maintenance: countRooms('Maintenance')
  };
  const pct = (n) => (roomStatus.total ? Math.round((n / roomStatus.total) * 100) : 0);
  const bookingsToday = bookings.filter((b) => b.checkIn === todayStr).length;
  const newCustomers = customers.filter((c) => c.status === 'New').length;

  // 1. KPI Cards Data
  const stats = [
    { title: 'Total Rooms', value: String(roomStatus.total), change: `${roomStatus.maintenance} under maintenance`, isPositive: roomStatus.maintenance === 0, icon: 'bi-door-open-fill', iconBg: 'navy' },
    { title: 'Available Rooms', value: String(roomStatus.available), change: `${pct(roomStatus.available)}% inventory ready`, isPositive: true, icon: 'bi-check-circle-fill', iconBg: 'gold' },
    { title: "Today's Check-ins", value: String(bookingsToday), change: `${bookings.length} bookings in total`, isPositive: true, icon: 'bi-calendar2-check-fill', iconBg: 'navy' },
    { title: 'Total Customers', value: customers.length.toLocaleString(), change: `${newCustomers} without a booking yet`, isPositive: true, icon: 'bi-people-fill', iconBg: 'gold' }
  ];

  // 2. Recent Bookings (latest 5 from the database)
  const fmtDate = (d) => (d ? new Date(`${d}T00:00:00`).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '-');
  const recentBookings = bookings.slice(0, 5).map((b) => ({
    id: b.id,
    guest: b.guest.name,
    email: b.guest.email,
    room: `${b.room.name} (${b.room.number})`,
    checkIn: fmtDate(b.checkIn),
    checkOut: fmtDate(b.checkOut),
    status: b.status,
    amount: `$${Number(b.amount).toLocaleString()}`
  }));

  return (
    <div className="dashboard-container">
      {/* 1. Page Header */}
      <div className="dashboard-header mb-4">
        <div>
          <h2 className="dashboard-title brand-font">Dashboard Overview</h2>
          <p className="dashboard-subtitle text-muted mb-0">
            Welcome back, Admin. Here's what's happening at Serenity Grand Hotel today.
          </p>
        </div>
        <div className="header-actions mt-3 mt-md-0">
          <button type="button" className="btn btn-luxury-navy me-2">
            <i className="bi bi-download me-2"></i>Export Report
          </button>
          <Link to="/admin/bookings/add" className="btn btn-luxury-gold">
            <i className="bi bi-plus-lg me-2"></i>New Reservation
          </Link>
        </div>
      </div>

      {/* 2. Key Statistics Cards Grid */}
      <div className="row g-3 mb-4">
        {stats.map((item, index) => (
          <div className="col-12 col-sm-6 col-xl-3" key={index}>
            <div className="luxury-card stat-card p-3">
              <div className="d-flex align-items-center justify-content-between">
                <div>
                  <span className="stat-label text-muted d-block mb-1">{item.title}</span>
                  <h3 className="stat-number mb-1">{item.value}</h3>
                  <span className={`stat-change ${item.isPositive ? 'positive' : 'negative'}`}>
                    <i className={`bi ${item.isPositive ? 'bi-arrow-up-short' : 'bi-arrow-down-short'}`}></i>
                    {item.change}
                  </span>
                </div>
                <div className={`stat-icon-wrapper ${item.iconBg}`}>
                  <i className={`bi ${item.icon}`}></i>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 3. Main Content Grid: Bookings & Room Status */}
      <div className="row g-4 mb-4">
        {/* Recent Bookings Table */}
        <div className="col-12 col-xl-8">
          <div className="luxury-card p-4 h-100">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="section-title mb-1 brand-font">Recent Bookings</h5>
                <span className="text-muted small">Latest guest reservations</span>
              </div>
              <Link to="/admin/bookings" className="btn-link-gold text-decoration-none">
                View All Bookings <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>

            <div className="table-responsive">
              <table className="table custom-table align-middle mb-0">
                <thead>
                  <tr>
                    <th>Guest</th>
                    <th>Room</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Status</th>
                    <th>Amount</th>
                    <th className="text-end">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recentBookings.map((booking) => (
                    <tr key={booking.id}>
                      <td>
                        <div className="fw-semibold text-navy">{booking.guest}</div>
                        <div className="text-muted extra-small">{booking.email}</div>
                      </td>
                      <td className="small text-muted">{booking.room}</td>
                      <td className="small">{booking.checkIn}</td>
                      <td className="small">{booking.checkOut}</td>
                      <td>
                        <span className={`status-pill ${booking.status.toLowerCase().replace(/[-\s]/g, '')}`}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="fw-bold text-navy">{booking.amount}</td>
                      <td className="text-end">
                        <button type="button" className="btn btn-sm btn-icon-only">
                          <i className="bi bi-three-dots-vertical"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Room Availability Breakdown */}
        <div className="col-12 col-xl-4">
          <div className="luxury-card p-4 h-100 d-flex flex-column justify-content-between">
            <div>
              <h5 className="section-title mb-1 brand-font">Room Occupancy</h5>
              <span className="text-muted small d-block mb-4">Real-time status breakdown</span>

              {/* Status List with Progress Bars */}
              <div className="occupancy-progress-group mb-3">
                <div className="d-flex justify-content-between small fw-semibold mb-1">
                  <span>Available</span>
                  <span>{roomStatus.available} Rooms ({pct(roomStatus.available)}%)</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-gold" style={{ width: `${pct(roomStatus.available)}%` }}></div>
                </div>
              </div>

              <div className="occupancy-progress-group mb-3">
                <div className="d-flex justify-content-between small fw-semibold mb-1">
                  <span>Occupied</span>
                  <span>{roomStatus.occupied} Rooms ({pct(roomStatus.occupied)}%)</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-navy" style={{ width: `${pct(roomStatus.occupied)}%` }}></div>
                </div>
              </div>

              <div className="occupancy-progress-group mb-3">
                <div className="d-flex justify-content-between small fw-semibold mb-1">
                  <span>Reserved</span>
                  <span>{roomStatus.reserved} Rooms ({pct(roomStatus.reserved)}%)</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-info" style={{ width: `${pct(roomStatus.reserved)}%` }}></div>
                </div>
              </div>

              <div className="occupancy-progress-group mb-4">
                <div className="d-flex justify-content-between small fw-semibold mb-1">
                  <span>Maintenance</span>
                  <span>{roomStatus.maintenance} Rooms ({pct(roomStatus.maintenance)}%)</span>
                </div>
                <div className="progress custom-progress">
                  <div className="progress-bar bg-danger" style={{ width: `${pct(roomStatus.maintenance)}%` }}></div>
                </div>
              </div>
            </div>

            {/* Quick Status Cards Grid */}
            <div className="row g-2 text-center status-grid pt-3">
              <div className="col-6">
                <div className="status-box bg-light-cream rounded p-2">
                  <span className="d-block text-gold fw-bold h5 mb-0">{roomStatus.available}</span>
                  <span className="extra-small text-muted">Ready for Check-In</span>
                </div>
              </div>
              <div className="col-6">
                <div className="status-box bg-light-cream rounded p-2">
                  <span className="d-block text-navy fw-bold h5 mb-0">{roomStatus.occupied}</span>
                  <span className="extra-small text-muted">Currently In Stay</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Bottom Grid: Recent Messages & Quick Actions */}
      <div className="row g-4">
        {/* Recent Guest Messages */}
        <div className="col-12 col-lg-7 col-xl-8">
          <div className="luxury-card p-4">
            <div className="d-flex align-items-center justify-content-between mb-3">
              <div>
                <h5 className="section-title mb-1 brand-font">Guest Concierge Messages</h5>
                <span className="text-muted small">Inquiries requiring attention</span>
              </div>
              <Link to="/admin/messages" className="btn-link-gold text-decoration-none">
                Open Inbox <i className="bi bi-arrow-right ms-1"></i>
              </Link>
            </div>

            <div className="messages-list">
              {recentMessages.map((msg) => (
                <div key={msg.id} className={`message-item ${msg.unread ? 'unread' : ''}`}>
                  <div className="message-avatar">
                    {msg.sender.split(' ').map((n) => n[0]).join('')}
                  </div>
                  <div className="message-details flex-grow-1">
                    <div className="d-flex justify-content-between align-items-center mb-1">
                      <h6 className="message-sender mb-0">{msg.sender}</h6>
                      <span className="message-time extra-small text-muted">{msg.time}</span>
                    </div>
                    <p className="message-preview text-muted mb-0">{msg.preview}</p>
                  </div>
                  {msg.unread && <span className="unread-dot"></span>}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Shortcut Actions */}
        <div className="col-12 col-lg-5 col-xl-4">
          <div className="luxury-card p-4 h-100">
            <h5 className="section-title mb-1 brand-font">Quick Actions</h5>
            <span className="text-muted small d-block mb-3">Fast management shortcuts</span>

            <div className="quick-actions-grid">
              <Link to="/admin/rooms/add" className="quick-action-btn">
                <div className="action-icon bg-navy-light">
                  <i className="bi bi-door-open"></i>
                </div>
                <span>Add Room</span>
              </Link>

              <Link to="/admin/bookings" className="quick-action-btn">
                <div className="action-icon bg-gold-light">
                  <i className="bi bi-calendar-check"></i>
                </div>
                <span>View Bookings</span>
              </Link>

              <Link to="/admin/dining/menu/add" className="quick-action-btn">
                <div className="action-icon bg-navy-light">
                  <i className="bi bi-cup-hot"></i>
                </div>
                <span>Add Dining Item</span>
              </Link>

              <Link to="/admin/messages" className="quick-action-btn">
                <div className="action-icon bg-gold-light">
                  <i className="bi bi-chat-left-text"></i>
                </div>
                <span>View Messages</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;