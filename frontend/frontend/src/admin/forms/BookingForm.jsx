import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout from './FormPageLayout';
import '../css/Bookings.css';

const LIST_PATH = '/admin/bookings';

/**
 * New Reservation form page  ->  /admin/bookings/add
 */
export default function BookingForm() {
  const navigate = useNavigate();
  const { bookings, setBookings } = useAdminData();

  const [newReservation, setNewReservation] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomName: 'Grand Deluxe Ocean View',
    roomType: 'Deluxe',
    roomNumber: '101',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    amount: '',
    paymentStatus: 'Pending',
    status: 'Confirmed'
  });

  const goBack = () => navigate(LIST_PATH);

  // Add Reservation Handler
  const handleCreateReservation = (e) => {
    e.preventDefault();
    const createdBooking = {
      id: `SGH-${Math.floor(1000 + Math.random() * 9000)}`,
      guest: {
        name: newReservation.guestName,
        email: newReservation.guestEmail,
        phone: newReservation.guestPhone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      },
      room: {
        name: newReservation.roomName,
        type: newReservation.roomType,
        number: newReservation.roomNumber
      },
      checkIn: newReservation.checkIn,
      checkOut: newReservation.checkOut,
      guestsCount: {
        adults: Number(newReservation.adults),
        children: Number(newReservation.children)
      },
      amount: Number(newReservation.amount),
      paymentStatus: newReservation.paymentStatus,
      status: newReservation.status
    };

    setBookings([createdBooking, ...bookings]);
    goBack();
  };

  return (
    <FormPageLayout
      title="New Reservation"
      subtitle="Create a new guest booking entry"
      icon="bi-calendar-plus-fill"
      backTo={LIST_PATH}
      backLabel="Back to Bookings"
      maxWidth={900}
    >
      <form onSubmit={handleCreateReservation} className="form-page-form">
        <div className="modal-body-scrollable pe-1">
          <div className="row g-3 mb-3">
            {/* Guest Details */}
            <div className="col-12">
              <h6 className="text-uppercase text-gold fw-bold fs-8 tracking-wider mb-2">1. Guest Information</h6>
            </div>
      
            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Guest Full Name</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="e.g. Lord Edward Sterling"
                value={newReservation.guestName}
                onChange={e => setNewReservation({ ...newReservation, guestName: e.target.value })}
              />
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Email Address</label>
              <input
                type="email"
                className="form-control luxury-select"
                required
                placeholder="e.g. e.sterling@domain.com"
                value={newReservation.guestEmail}
                onChange={e => setNewReservation({ ...newReservation, guestEmail: e.target.value })}
              />
            </div>

            <div className="col-12">
              <label className="form-label fs-7 fw-semibold">Phone Number</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="e.g. +94 701 709 967"
                value={newReservation.guestPhone}
                onChange={e => setNewReservation({ ...newReservation, guestPhone: e.target.value })}
              />
            </div>

            {/* Accommodation Details */}
            <div className="col-12 pt-2">
              <h6 className="text-uppercase text-gold fw-bold fs-8 tracking-wider mb-2">2. Accommodation & Dates</h6>
            </div>

            <div className="col-12 col-md-6">
              <label className="form-label fs-7 fw-semibold">Room Name</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="e.g. Royal Penthouse Suite"
                value={newReservation.roomName}
                onChange={e => setNewReservation({ ...newReservation, roomName: e.target.value })}
              />
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label fs-7 fw-semibold">Room Type</label>
              <select
                className="form-select luxury-select"
                value={newReservation.roomType}
                onChange={e => setNewReservation({ ...newReservation, roomType: e.target.value })}
              >
                <option value="Penthouse">Penthouse</option>
                <option value="Presidential">Presidential</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Villa">Villa</option>
                <option value="Suite">Suite</option>
              </select>
            </div>

            <div className="col-6 col-md-3">
              <label className="form-label fs-7 fw-semibold">Room Number</label>
              <input
                type="text"
                className="form-control luxury-select"
                required
                placeholder="PH-01"
                value={newReservation.roomNumber}
                onChange={e => setNewReservation({ ...newReservation, roomNumber: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Check-In Date</label>
              <input
                type="date"
                className="form-control luxury-select"
                required
                value={newReservation.checkIn}
                onChange={e => setNewReservation({ ...newReservation, checkIn: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Check-Out Date</label>
              <input
                type="date"
                className="form-control luxury-select"
                required
                value={newReservation.checkOut}
                onChange={e => setNewReservation({ ...newReservation, checkOut: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Adults</label>
              <input
                type="number"
                min="1"
                className="form-control luxury-select"
                required
                value={newReservation.adults}
                onChange={e => setNewReservation({ ...newReservation, adults: e.target.value })}
              />
            </div>

            <div className="col-6">
              <label className="form-label fs-7 fw-semibold">Children</label>
              <input
                type="number"
                min="0"
                className="form-control luxury-select"
                required
                value={newReservation.children}
                onChange={e => setNewReservation({ ...newReservation, children: e.target.value })}
              />
            </div>

            {/* Financials & Status */}
            <div className="col-12 pt-2">
              <h6 className="text-uppercase text-gold fw-bold fs-8 tracking-wider mb-2">3. Financials & Status</h6>
            </div>

            <div className="col-12 col-md-4">
              <label className="form-label fs-7 fw-semibold">Total Amount ($)</label>
              <input
                type="number"
                className="form-control luxury-select"
                required
                placeholder="3500"
                value={newReservation.amount}
                onChange={e => setNewReservation({ ...newReservation, amount: e.target.value })}
              />
            </div>

            <div className="col-6 col-md-4">
              <label className="form-label fs-7 fw-semibold">Payment Status</label>
              <select
                className="form-select luxury-select"
                value={newReservation.paymentStatus}
                onChange={e => setNewReservation({ ...newReservation, paymentStatus: e.target.value })}
              >
                <option value="Paid in Full">Paid in Full</option>
                <option value="Deposit Paid (50%)">Deposit Paid (50%)</option>
                <option value="Pending">Pending</option>
              </select>
            </div>

            <div className="col-6 col-md-4">
              <label className="form-label fs-7 fw-semibold">Booking Status</label>
              <select
                className="form-select luxury-select"
                value={newReservation.status}
                onChange={e => setNewReservation({ ...newReservation, status: e.target.value })}
              >
                <option value="Confirmed">Confirmed</option>
                <option value="Pending">Pending</option>
                <option value="Checked In">Checked In</option>
              </select>
            </div>
          </div>
        </div>

        {/* Form Actions */}
        <div className="d-flex justify-content-end gap-2 pt-3 border-top flex-shrink-0">
          <button
            type="button"
            className="btn btn-secondary"
            onClick={goBack}
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-luxury-gold">
            Create Reservation
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}
