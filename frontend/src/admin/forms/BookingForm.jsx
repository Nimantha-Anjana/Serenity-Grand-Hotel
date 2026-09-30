import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminData } from '../context/adminDataContext';
import FormPageLayout from './FormPageLayout';
import { validateBookingForm, showSuccessAlert } from '../components/ValidationAlerts';
import '../css/Bookings.css';

const LIST_PATH = '/admin/bookings';

export default function BookingForm() {
  const navigate = useNavigate();
  const { bookings, setBookings, rooms } = useAdminData();

  const [newReservation, setNewReservation] = useState({
    guestName: '',
    guestEmail: '',
    guestPhone: '',
    roomId: rooms[0]?.id ?? '',
    roomName: rooms[0]?.name ?? '',
    roomType: rooms[0]?.type ?? '',
    roomNumber: rooms[0]?.number ?? '',
    checkIn: '',
    checkOut: '',
    adults: 2,
    children: 0,
    amount: '',
    paymentStatus: 'Pending',
    status: 'Confirmed'
  });

  const goBack = () => navigate(LIST_PATH);

  // Total = room price x nights (the server calculates the final amount again).
  const withAmount = (data) => {
    const room = rooms.find((r) => String(r.id) === String(data.roomId));
    const nights = data.checkIn && data.checkOut
      ? Math.round((new Date(data.checkOut) - new Date(data.checkIn)) / 86400000)
      : 0;
    return { ...data, amount: room && nights > 0 ? room.price * nights : '' };
  };
  const changeField = (patch) => setNewReservation((prev) => withAmount({ ...prev, ...patch }));
  const changeRoom = (roomId) => {
    const room = rooms.find((r) => String(r.id) === String(roomId));
    changeField({ roomId, roomName: room?.name ?? '', roomType: room?.type ?? '', roomNumber: room?.number ?? '' });
  };

  const handleCreateReservation = (e) => {
    e.preventDefault();

    // Central Validation Check
    if (!validateBookingForm(newReservation)) return;

    const createdBooking = {
      id: `SGH-${Math.floor(1000 + Math.random() * 9000)}`,
      guest: {
        name: newReservation.guestName,
        email: newReservation.guestEmail,
        phone: newReservation.guestPhone,
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80'
      },
      room: {
        id: Number(newReservation.roomId),
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
    showSuccessAlert('Success!', 'Reservation created successfully.');
    goBack();
  };

  return (
    <FormPageLayout
      title="New Reservation"
      subtitle="Create a new guest booking entry"
      icon="bi-calendar-plus-fill"
      backTo={LIST_PATH}
      backLabel="Back to Bookings"
    >
      <form id="bookingForm" onSubmit={handleCreateReservation} className="form-page-form" noValidate>
        <div className="row g-3 mb-4">
          <div className="col-12 border-bottom pb-2">
            <h6 className="text-uppercase text-gold fw-bold tracking-wider mb-0">1. Guest Information</h6>
          </div>
    
          <div className="col-12 col-md-4">
            <label htmlFor="bookingGuestName" className="form-label fs-7 fw-semibold">Guest Full Name *</label>
            <input
              type="text"
              id="bookingGuestName"
              name="guestName"
              className="form-control"
              placeholder="e.g. Lord Edward Sterling"
              value={newReservation.guestName}
              onChange={e => setNewReservation({ ...newReservation, guestName: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="bookingGuestEmail" className="form-label fs-7 fw-semibold">Email Address *</label>
            <input
              type="email"
              id="bookingGuestEmail"
              name="guestEmail"
              className="form-control"
              placeholder="e.g. e.sterling@domain.com"
              value={newReservation.guestEmail}
              onChange={e => setNewReservation({ ...newReservation, guestEmail: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="bookingGuestPhone" className="form-label fs-7 fw-semibold">Phone Number *</label>
            <input
              type="text"
              id="bookingGuestPhone"
              name="guestPhone"
              className="form-control"
              placeholder="e.g. +94 701 709 967"
              value={newReservation.guestPhone}
              onChange={e => setNewReservation({ ...newReservation, guestPhone: e.target.value })}
            />
          </div>

          <div className="col-12 pt-3 border-bottom pb-2">
            <h6 className="text-uppercase text-gold fw-bold tracking-wider mb-0">2. Accommodation & Dates</h6>
          </div>

          <div className="col-12 col-md-6">
            <label htmlFor="bookingRoom" className="form-label fs-7 fw-semibold">Room *</label>
            <select
              id="bookingRoom"
              name="roomId"
              className="form-select"
              value={newReservation.roomId}
              onChange={e => changeRoom(e.target.value)}
            >
              {rooms.length === 0 && <option value="">No rooms available - add a room first</option>}
              {rooms.map(r => (
                <option key={r.id} value={r.id} disabled={r.status === 'Maintenance'}>
                  {r.number} - {r.name} ({r.type}) - ${r.price}/night{r.status === 'Maintenance' ? ' - maintenance' : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="col-12 col-md-3">
            <label htmlFor="bookingCheckIn" className="form-label fs-7 fw-semibold">Check-In Date *</label>
            <input
              type="date"
              id="bookingCheckIn"
              name="checkIn"
              className="form-control"
              value={newReservation.checkIn}
              onChange={e => changeField({ checkIn: e.target.value })}
            />
          </div>

          <div className="col-12 col-md-3">
            <label htmlFor="bookingCheckOut" className="form-label fs-7 fw-semibold">Check-Out Date *</label>
            <input
              type="date"
              id="bookingCheckOut"
              name="checkOut"
              className="form-control"
              value={newReservation.checkOut}
              onChange={e => changeField({ checkOut: e.target.value })}
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="bookingAdults" className="form-label fs-7 fw-semibold">Adults</label>
            <input
              type="number"
              id="bookingAdults"
              name="adults"
              min="1"
              className="form-control"
              value={newReservation.adults}
              onChange={e => setNewReservation({ ...newReservation, adults: e.target.value })}
            />
          </div>

          <div className="col-6 col-md-3">
            <label htmlFor="bookingChildren" className="form-label fs-7 fw-semibold">Children</label>
            <input
              type="number"
              id="bookingChildren"
              name="children"
              min="0"
              className="form-control"
              value={newReservation.children}
              onChange={e => setNewReservation({ ...newReservation, children: e.target.value })}
            />
          </div>

          <div className="col-12 pt-3 border-bottom pb-2">
            <h6 className="text-uppercase text-gold fw-bold tracking-wider mb-0">3. Financials & Status</h6>
          </div>

          <div className="col-12 col-md-4">
            <label htmlFor="bookingAmount" className="form-label fs-7 fw-semibold">Total Amount ($) *</label>
            <input
              type="number"
              id="bookingAmount"
              name="amount"
              className="form-control"
              placeholder="Select room and dates"
              value={newReservation.amount}
              readOnly
            />
          </div>

          <div className="col-6 col-md-4">
            <label htmlFor="bookingPaymentStatus" className="form-label fs-7 fw-semibold">Payment Status</label>
            <select
              id="bookingPaymentStatus"
              name="paymentStatus"
              className="form-select"
              value={newReservation.paymentStatus}
              onChange={e => setNewReservation({ ...newReservation, paymentStatus: e.target.value })}
            >
              <option value="Paid in Full">Paid in Full</option>
              <option value="Deposit Paid">Deposit Paid</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          <div className="col-6 col-md-4">
            <label htmlFor="bookingStatus" className="form-label fs-7 fw-semibold">Booking Status</label>
            <select
              id="bookingStatus"
              name="status"
              className="form-select"
              value={newReservation.status}
              onChange={e => setNewReservation({ ...newReservation, status: e.target.value })}
            >
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Checked In">Checked In</option>
            </select>
          </div>
        </div>

        <div className="d-flex justify-content-end gap-2 pt-3 border-top">
          <button type="button" id="btnBookingCancel" className="btn btn-secondary px-4" onClick={goBack}>
            Cancel
          </button>
          <button type="submit" id="btnBookingSubmit" className="btn btn-luxury-gold px-4">
            Create Reservation
          </button>
        </div>
      </form>
    </FormPageLayout>
  );
}