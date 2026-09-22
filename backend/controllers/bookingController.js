import Booking from '../models/Booking.js';
import Room from '../models/Room.js';
import { crudController, asyncHandler } from './crudController.js';

const crud = crudController(Booking);

const DAY_MS = 86400000;
const DATE_PATTERN = /^\d{4}-\d{2}-\d{2}$/; // YYYY-MM-DD (what <input type="date"> sends)

// SGH-1092 style reference; retries if it already exists
const generateReference = async () => {
  for (let i = 0; i < 10; i += 1) {
    const reference = `SGH-${Math.floor(1000 + Math.random() * 9000)}`;
    if (!(await Booking.findOne({ where: { reference } }))) return reference;
  }
  return `SGH-${Date.now()}`;
};

// Public: the website Booking form.
// The visitor can NOT choose status / payment / amount - the server sets those.
// Body: { fullName, email, phone, roomId, checkIn, checkOut, adults, children, requests }
const create = asyncHandler(async (req, res) => {
  const { fullName, email, phone, roomId, checkIn, checkOut, adults, children, requests } = req.body || {};

  if (!DATE_PATTERN.test(checkIn) || !DATE_PATTERN.test(checkOut)) {
    return res.status(400).json({ message: 'Dates must be in YYYY-MM-DD format.' });
  }
  const nights = Math.round((new Date(checkOut) - new Date(checkIn)) / DAY_MS);
  if (nights < 1) {
    return res.status(400).json({ message: 'Check-out must be after check-in.' });
  }

  const room = await Room.findByPk(roomId);
  if (!room) return res.status(400).json({ message: 'Selected room does not exist.' });

  const booking = await Booking.create({
    reference: await generateReference(),
    guestName: fullName,
    guestEmail: email,
    guestPhone: phone,
    roomId: room.id,
    roomName: room.name,
    roomType: room.type,
    roomNumber: room.number,
    checkIn,
    checkOut,
    adults: Number(adults) || 1,
    children: Number(children) || 0,
    amount: Number(room.price) * nights, // calculated on the server, never trusted from the browser
    status: 'Pending',
    paymentStatus: 'Pending',
    requests,
  });

  res.status(201).json({
    reference: booking.reference,
    roomName: booking.roomName,
    nights,
    amount: Number(booking.amount),
  });
});

export default { ...crud, create };
