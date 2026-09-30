export const INITIAL_BOOKINGS = [
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
    guest: { name: 'Viktor Morozov', email: 'v.morozov@investcorp.ch', phone: '+94701709967', avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&auto=format&fit=crop&q=80' },
    room: { name: 'Presidential Ocean Suite', type: 'Presidential', number: '701' },
    checkIn: '2026-11-02',
    checkOut: '2026-11-08',
    guestsCount: { adults: 2, children: 1 },
    amount: 11400,
    paymentStatus: 'Pending',
    status: 'Pending'
  }
];
