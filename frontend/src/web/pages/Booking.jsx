import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Footer from '../components/Footer';
import { bookingRooms } from '../data/rooms';
import '../css/Booking.css';

// Local date as YYYY-MM-DD (used for the "min" attribute on date inputs)
const todayString = () => new Date().toLocaleDateString('en-CA');

const formatDate = (value) =>
  new Date(`${value}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

const countNights = (checkIn, checkOut) => {
  if (!checkIn || !checkOut) return 0;
  const diff = Math.round((new Date(checkOut) - new Date(checkIn)) / 86400000);
  return diff > 0 ? diff : 0;
};

const clampNumber = (value, min, max, fallback) => {
  const n = Number(value);
  return Number.isInteger(n) && n >= min && n <= max ? String(n) : fallback;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function Booking() {
  const [searchParams] = useSearchParams();

  // Values can be pre-filled from the URL, e.g. /booking?room=2&checkIn=2026-10-01&checkOut=2026-10-05&adults=2
  const [form, setForm] = useState(() => {
    const roomParam = searchParams.get('room');
    return {
      fullName: '',
      email: '',
      phone: '',
      roomId: bookingRooms.some((r) => r.id === roomParam) ? roomParam : '',
      checkIn: searchParams.get('checkIn') || '',
      checkOut: searchParams.get('checkOut') || '',
      adults: clampNumber(searchParams.get('adults'), 1, 6, '2'),
      children: clampNumber(searchParams.get('children'), 0, 4, '0'),
      requests: '',
    };
  });
  const [errors, setErrors] = useState({});
  const [confirmation, setConfirmation] = useState(null);

  const selectedRoom = bookingRooms.find((r) => r.id === form.roomId);
  const nights = countNights(form.checkIn, form.checkOut);
  const total = selectedRoom ? selectedRoom.price * nights : 0;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const validate = () => {
    const next = {};
    if (!form.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!EMAIL_PATTERN.test(form.email.trim())) next.email = 'Please enter a valid email address.';
    if (form.phone.replace(/\D/g, '').length < 7) next.phone = 'Please enter a valid phone number.';
    if (!form.roomId) next.roomId = 'Please choose a room.';
    if (!form.checkIn) next.checkIn = 'Select a check-in date.';
    else if (form.checkIn < todayString()) next.checkIn = 'Check-in cannot be in the past.';
    if (!form.checkOut) next.checkOut = 'Select a check-out date.';
    else if (form.checkIn && form.checkOut <= form.checkIn) next.checkOut = 'Check-out must be after check-in.';
    return next;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    // TODO: send the booking to the backend API (POST /api/bookings) once it exists.
    // Field names match the admin Bookings page: guest, room, checkIn, checkOut, guestsCount, amount.
    const reference = `SGH-${Math.floor(1000 + Math.random() * 9000)}`;
    setConfirmation({ reference, ...form, roomName: selectedRoom.name, nights, total });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setConfirmation(null);
    setErrors({});
    setForm((prev) => ({ ...prev, roomId: '', checkIn: '', checkOut: '', requests: '' }));
  };

  return (
    <div className="booking-page">
      {/* HERO */}
      <section className="booking-hero">
        <div className="booking-hero-overlay"></div>
        <div className="booking-hero-content">
          <h1 className="booking-hero-title">Book Your Stay</h1>
          <p className="booking-hero-subtitle">Reserve your room at Serenity Grand Hotel in a few simple steps.</p>
        </div>
      </section>

      <section className="booking-section">
        <div className="booking-container">
          {confirmation ? (
            /* SUCCESS VIEW */
            <div className="booking-confirmation" role="status">
              <div className="booking-confirmation-icon" aria-hidden="true">✓</div>
              <h2>Booking Request Received</h2>
              <p className="booking-confirmation-text">
                Thank you, {confirmation.fullName}. A confirmation will be sent to <strong>{confirmation.email}</strong>.
              </p>

              <div className="booking-reference">
                <span>Reference</span>
                <strong>{confirmation.reference}</strong>
              </div>

              <dl className="booking-confirmation-details">
                <div><dt>Room</dt><dd>{confirmation.roomName}</dd></div>
                <div><dt>Check-in</dt><dd>{formatDate(confirmation.checkIn)}</dd></div>
                <div><dt>Check-out</dt><dd>{formatDate(confirmation.checkOut)}</dd></div>
                <div><dt>Nights</dt><dd>{confirmation.nights}</dd></div>
                <div>
                  <dt>Guests</dt>
                  <dd>
                    {confirmation.adults} adult{confirmation.adults === '1' ? '' : 's'}
                    {Number(confirmation.children) > 0 && `, ${confirmation.children} child${confirmation.children === '1' ? '' : 'ren'}`}
                  </dd>
                </div>
                <div><dt>Estimated total</dt><dd>${confirmation.total.toLocaleString()}</dd></div>
              </dl>

              <div className="booking-confirmation-actions">
                <button type="button" className="booking-btn-outline" onClick={handleReset}>Make Another Booking</button>
                <Link to="/" className="booking-btn-gold">Back to Home</Link>
              </div>
            </div>
          ) : (
            <div className="booking-layout">
              {/* FORM */}
              <form className="booking-form-card" onSubmit={handleSubmit} noValidate>
                <h2 className="booking-card-title">Guest Details</h2>

                <div className="booking-field">
                  <label htmlFor="fullName">Full Name</label>
                  <input id="fullName" name="fullName" type="text" autoComplete="name" value={form.fullName} onChange={handleChange} aria-invalid={!!errors.fullName} />
                  {errors.fullName && <span className="booking-error">{errors.fullName}</span>}
                </div>

                <div className="booking-row">
                  <div className="booking-field">
                    <label htmlFor="email">Email</label>
                    <input id="email" name="email" type="email" autoComplete="email" value={form.email} onChange={handleChange} aria-invalid={!!errors.email} />
                    {errors.email && <span className="booking-error">{errors.email}</span>}
                  </div>
                  <div className="booking-field">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="tel" autoComplete="tel" value={form.phone} onChange={handleChange} aria-invalid={!!errors.phone} />
                    {errors.phone && <span className="booking-error">{errors.phone}</span>}
                  </div>
                </div>

                <h2 className="booking-card-title booking-card-title-spaced">Stay Details</h2>

                <div className="booking-field">
                  <label htmlFor="roomId">Room</label>
                  <select id="roomId" name="roomId" value={form.roomId} onChange={handleChange} aria-invalid={!!errors.roomId}>
                    <option value="">Select a room</option>
                    {bookingRooms.map((room) => (
                      <option key={room.id} value={room.id}>
                        {room.name} - ${room.price} / night
                      </option>
                    ))}
                  </select>
                  {errors.roomId && <span className="booking-error">{errors.roomId}</span>}
                </div>

                <div className="booking-row">
                  <div className="booking-field">
                    <label htmlFor="checkIn">Check-in</label>
                    <input id="checkIn" name="checkIn" type="date" min={todayString()} value={form.checkIn} onChange={handleChange} aria-invalid={!!errors.checkIn} />
                    {errors.checkIn && <span className="booking-error">{errors.checkIn}</span>}
                  </div>
                  <div className="booking-field">
                    <label htmlFor="checkOut">Check-out</label>
                    <input id="checkOut" name="checkOut" type="date" min={form.checkIn || todayString()} value={form.checkOut} onChange={handleChange} aria-invalid={!!errors.checkOut} />
                    {errors.checkOut && <span className="booking-error">{errors.checkOut}</span>}
                  </div>
                </div>

                <div className="booking-row">
                  <div className="booking-field">
                    <label htmlFor="adults">Adults</label>
                    <select id="adults" name="adults" value={form.adults} onChange={handleChange}>
                      {[1, 2, 3, 4, 5, 6].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                  <div className="booking-field">
                    <label htmlFor="children">Children</label>
                    <select id="children" name="children" value={form.children} onChange={handleChange}>
                      {[0, 1, 2, 3, 4].map((n) => (
                        <option key={n} value={n}>{n}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="booking-field">
                  <label htmlFor="requests">Special Requests <span className="booking-optional">(optional)</span></label>
                  <textarea id="requests" name="requests" rows="4" value={form.requests} onChange={handleChange} placeholder="Late check-in, airport pickup, celebrations..." />
                </div>

                <button type="submit" className="booking-submit">Confirm Booking</button>
              </form>

              {/* SUMMARY */}
              <aside className="booking-summary-card">
                <h2 className="booking-card-title">Your Stay</h2>

                {selectedRoom ? (
                  <>
                    <p className="booking-summary-room">{selectedRoom.name}</p>
                    <ul className="booking-summary-list">
                      <li><span>Rate</span><span>${selectedRoom.price} / night</span></li>
                      <li><span>Check-in</span><span>{form.checkIn ? formatDate(form.checkIn) : '-'}</span></li>
                      <li><span>Check-out</span><span>{form.checkOut ? formatDate(form.checkOut) : '-'}</span></li>
                      <li><span>Nights</span><span>{nights || '-'}</span></li>
                      <li>
                        <span>Guests</span>
                        <span>
                          {form.adults} adult{form.adults === '1' ? '' : 's'}
                          {Number(form.children) > 0 && `, ${form.children} child${form.children === '1' ? '' : 'ren'}`}
                        </span>
                      </li>
                    </ul>
                    <div className="booking-summary-total">
                      <span>Estimated total</span>
                      <strong>{nights ? `$${total.toLocaleString()}` : '-'}</strong>
                    </div>
                  </>
                ) : (
                  <p className="booking-summary-empty">Choose a room and your dates to see your booking summary.</p>
                )}

                <p className="booking-summary-note">
                  The final amount is confirmed by our reservations team. Need help? <Link to="/contact">Contact us</Link>.
                </p>
              </aside>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Booking;
