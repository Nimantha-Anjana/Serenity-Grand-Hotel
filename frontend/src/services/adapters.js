// Adapters between the API (Sequelize models, camelCase) and the shapes the
// admin UI was originally built around (dummy data). Each entity has:
//   list(ctx)            -> Promise<raw rows>
//   fromApi(row, ctx)    -> UI object
//   create/update/remove -> persist a UI object
// `ctx` holds lookup lists (amenities, categories, restaurants...) shared by adapters.
import {
  roomsApi, amenitiesApi, activitiesApi, bookingsApi, customersApi,
  restaurantsApi, menuItemsApi, menuCategoriesApi, facilitiesApi,
  galleryApi, galleryCategoriesApi, servicesApi,
} from './api';

const DEFAULT_AVATAR = 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=100&auto=format&fit=crop&q=80';

/* ---------- small helpers ---------- */
export const hhmm = (t) => (t ? String(t).slice(0, 5) : '');
const to12 = (t) => {
  const [h, m] = String(t).split(':').map(Number);
  const suffix = h >= 12 ? 'PM' : 'AM';
  return `${String(h % 12 || 12).padStart(2, '0')}:${String(m).padStart(2, '0')} ${suffix}`;
};
export const hoursString = (open, close) => {
  if (!open && !close) return '';
  const o = hhmm(open), c = hhmm(close);
  if (o === '00:00' && (c === '23:59' || c === '24:00')) return '24 Hours';
  return `${to12(o)} - ${to12(c)}`;
};
const to24 = (h, m, ap) => {
  let hour = Number(h) % 12;
  if (/pm/i.test(ap)) hour += 12;
  return `${String(hour).padStart(2, '0')}:${m}:00`;
};
export const parseHours = (str = '') => {
  if (/24\s*hours?/i.test(str)) return { openingTime: '00:00:00', closingTime: '23:59:00' };
  const m = String(str).match(/(\d{1,2}):(\d{2})\s*(AM|PM)\s*-\s*(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!m) return { openingTime: null, closingTime: null };
  return { openingTime: to24(m[1], m[2], m[3]), closingTime: to24(m[4], m[5], m[6]) };
};
const toTime = (v) => (v ? (String(v).length === 5 ? `${v}:00` : v) : null);
const num = (v) => Number(String(v ?? '').replace(/[^0-9.]/g, '')) || 0;
// blob:/data: URLs cannot be stored (they only exist in the browser session)
const cleanImage = (v) => (!v || /^(blob:|data:)/i.test(v) ? undefined : v);
const serverId = (x) => x._id ?? x.id;
const lower = (s) => String(s || '').trim().toLowerCase();

async function idForName(list, api, name, extra = {}) {
  const found = list.find((x) => lower(x.name) === lower(name));
  if (found) return found.id;
  const created = await api.create({ name, ...extra });
  list.push(created);
  return created.id;
}

/* ---------- rooms ---------- */
const rooms = {
  list: () => roomsApi.list(),
  fromApi: (r) => ({
    id: r.id, number: r.roomNumber, name: r.roomName, type: r.roomType,
    price: Number(r.pricePerNight), guests: r.maxGuests, bedType: r.bedType || '',
    status: r.status, size: r.roomSize || '', view: r.viewType || '',
    description: r.description || '', amenities: (r.amenities || []).map((a) => a.name),
    image: r.image || '',
  }),
  toApi: async (x, ctx) => ({
    roomNumber: String(x.number), roomName: x.name, roomType: x.type,
    pricePerNight: num(x.price), maxGuests: Number(x.guests) || 1,
    bedType: x.bedType || null, roomSize: x.size || null, viewType: x.view || null,
    description: x.description || null, status: x.status, image: cleanImage(x.image),
    amenityIds: await Promise.all((x.amenities || []).map((n) => idForName(ctx.amenities, amenitiesApi, n))),
  }),
  create: async (x, ctx) => roomsApi.create(await rooms.toApi(x, ctx)),
  update: async (x, ctx) => roomsApi.update(x.id, await rooms.toApi(x, ctx)),
  remove: (x) => roomsApi.remove(x.id),
};

/* ---------- activities ---------- */
const activities = {
  list: () => activitiesApi.list(),
  fromApi: (a) => ({
    id: a.id, name: a.name, category: a.category || '', duration: a.duration || '',
    location: a.location || '', price: `$${Number(a.price)}`, priceType: a.priceType,
    status: a.status, featured: !!a.isFeatured, image: a.image || '',
    shortDesc: a.shortDescription || '', fullDesc: a.fullDescription || '',
    days: (a.days || []).map((d) => d.dayOfWeek), startTime: hhmm(a.startingTime),
    endTime: hhmm(a.endingTime), order: a.displayOrder,
  }),
  toApi: (x) => ({
    name: x.name, category: x.category, duration: x.duration, location: x.location,
    price: x.priceType === 'Complimentary' ? 0 : num(x.price), priceType: x.priceType || 'Paid',
    status: x.status || 'Active', isFeatured: !!x.featured, image: cleanImage(x.image),
    shortDescription: x.shortDesc, fullDescription: x.fullDesc, days: x.days || [],
    startingTime: toTime(x.startTime), endingTime: toTime(x.endTime), displayOrder: Number(x.order) || 0,
  }),
  create: (x) => activitiesApi.create(activities.toApi(x)),
  update: (x) => activitiesApi.update(x.id, activities.toApi(x)),
  remove: (x) => activitiesApi.remove(x.id),
};

/* ---------- bookings (UI id = booking reference, `_id` = database id) ---------- */
const bookings = {
  list: () => bookingsApi.list(),
  fromApi: (b) => ({
    id: b.bookingReference, _id: b.id,
    guest: {
      name: b.customer?.name || '', email: b.customer?.email || '',
      phone: b.customer?.phone || '', avatar: b.customer?.avatar || DEFAULT_AVATAR,
    },
    room: { id: b.roomId, name: b.room?.roomName || '', type: b.room?.roomType || '', number: b.room?.roomNumber || '' },
    checkIn: b.checkIn, checkOut: b.checkOut,
    guestsCount: { adults: b.adults, children: b.children },
    amount: Number(b.totalAmount), paymentStatus: b.paymentStatus, status: b.bookingStatus,
  }),
  create: async (x) => {
    // Admin-created reservation: find/create the guest by e-mail, then set statuses.
    const created = await bookingsApi.publicCreate({
      fullName: x.guest.name, email: x.guest.email, phone: x.guest.phone,
      roomId: x.room.id, checkIn: x.checkIn, checkOut: x.checkOut,
      adults: x.guestsCount.adults, children: x.guestsCount.children,
    });
    const patch = {};
    if (x.status && x.status !== created.bookingStatus) patch.bookingStatus = x.status;
    if (x.paymentStatus && x.paymentStatus !== created.paymentStatus) patch.paymentStatus = x.paymentStatus;
    return Object.keys(patch).length ? bookingsApi.update(created.id, patch) : created;
  },
  update: (x) => bookingsApi.update(serverId(x), { bookingStatus: x.status, paymentStatus: x.paymentStatus }),
  remove: (x) => bookingsApi.remove(serverId(x)),
};

/* ---------- customers (users with role = customer) ---------- */
const customers = {
  list: () => customersApi.list(),
  fromApi: (u, ctx) => {
    const mine = (ctx.bookingsRaw || []).filter((b) => b.customerId === u.id)
      .sort((a, b) => String(b.checkIn).localeCompare(String(a.checkIn)));
    return {
      id: u.id, name: u.name, email: u.email, phone: u.phone || '',
      address: u.customerProfile?.address || '',
      regDate: String(u.createdAt || '').slice(0, 10),
      totalBookings: mine.length, lastVisit: mine[0]?.checkIn || '-',
      status: mine.length > 1 ? 'Returning' : mine.length === 1 ? 'Active' : 'New',
      avatar: u.avatar || DEFAULT_AVATAR,
      recentBookings: mine.slice(0, 5).map((b) => ({
        id: b.bookingReference, room: b.room?.roomName || '', date: b.checkIn,
        amount: `$${Number(b.totalAmount).toLocaleString()}`,
      })),
    };
  },
  create: (x) => customersApi.create({ name: x.name, email: x.email, phone: x.phone, address: x.address }),
  update: (x) => customersApi.update(x.id, { name: x.name, phone: x.phone, address: x.address }),
  remove: (x) => customersApi.remove(x.id),
};

/* ---------- restaurants & menu items ---------- */
const restaurants = {
  list: () => restaurantsApi.list(),
  fromApi: (r) => ({
    id: r.id, name: r.name, cuisine: r.cuisine || '', hours: hoursString(r.openingTime, r.closingTime),
    location: r.location || '', status: r.status, image: r.image || '', description: r.description || '',
  }),
  toApi: (x) => ({
    name: x.name, cuisine: x.cuisine, ...parseHours(x.hours), location: x.location,
    status: x.status || 'Open', image: cleanImage(x.image), description: x.description || null,
  }),
  create: (x) => restaurantsApi.create(restaurants.toApi(x)),
  update: (x) => restaurantsApi.update(x.id, restaurants.toApi(x)),
  remove: (x) => restaurantsApi.remove(x.id),
};

const menuItems = {
  list: () => menuItemsApi.list(),
  fromApi: (m) => ({
    id: m.id, name: m.name, category: m.category?.name || '', price: Number(m.price),
    availability: m.availability, description: m.description || '', image: m.image || '',
    restaurantId: m.restaurantId,
  }),
  toApi: async (x, ctx) => ({
    // The UI has no restaurant picker, so new items go to the first restaurant unless one is set.
    restaurantId: x.restaurantId || ctx.restaurants[0]?.id,
    categoryId: await idForName(ctx.menuCategories, menuCategoriesApi, x.category || 'Main Course'),
    name: x.name, price: num(x.price), availability: x.availability || 'Available',
    description: x.description || null, image: cleanImage(x.image),
  }),
  create: async (x, ctx) => menuItemsApi.create(await menuItems.toApi(x, ctx)),
  update: async (x, ctx) => menuItemsApi.update(x.id, await menuItems.toApi(x, ctx)),
  remove: (x) => menuItemsApi.remove(x.id),
};

/* ---------- facilities ---------- */
const facilities = {
  list: () => facilitiesApi.list(),
  fromApi: (f) => ({
    id: f.id, name: f.name, description: f.description || '', hours: hoursString(f.openingTime, f.closingTime),
    status: f.status, icon: f.icon || '', image: f.image || '',
  }),
  toApi: (x) => ({
    name: x.name, description: x.description, ...parseHours(x.hours),
    icon: x.icon, image: cleanImage(x.image), status: x.status || 'Active',
  }),
  create: (x) => facilitiesApi.create(facilities.toApi(x)),
  update: (x) => facilitiesApi.update(x.id, facilities.toApi(x)),
  remove: (x) => facilitiesApi.remove(x.id),
};

/* ---------- gallery ---------- */
const images = {
  list: () => galleryApi.list(),
  fromApi: (g) => ({
    id: g.id, title: g.title || '', category: g.category?.name || '', status: g.status,
    uploadDate: String(g.createdAt || '').slice(0, 10), description: g.description || '',
    url: g.imageUrl, displayOrder: g.displayOrder,
  }),
  toApi: async (x, ctx) => ({
    categoryId: await idForName(ctx.galleryCategories, galleryCategoriesApi, x.category || 'Hotel'),
    title: x.title, description: x.description || null, imageUrl: cleanImage(x.url),
    status: x.status || 'Published', displayOrder: Number(x.displayOrder) || 0,
  }),
  create: async (x, ctx) => galleryApi.create(await images.toApi(x, ctx)),
  update: async (x, ctx) => galleryApi.update(x.id, await images.toApi(x, ctx)),
  remove: (x) => galleryApi.remove(x.id),
};

/* ---------- services ---------- */
const services = {
  list: () => servicesApi.list(),
  fromApi: (s) => ({
    id: s.id, name: s.name, shortDesc: s.shortDescription || '', fullDesc: s.fullDescription || '',
    category: s.category || '', price: s.price || '', availability: s.availability || '',
    openingTime: hhmm(s.openingTime), closingTime: hhmm(s.closingTime), icon: s.icon || '',
    image: s.image || '', status: s.status, isFeatured: !!s.isFeatured,
  }),
  toApi: (x) => ({
    name: x.name, category: x.category, shortDescription: x.shortDesc, fullDescription: x.fullDesc,
    price: x.price, availability: x.availability, openingTime: toTime(x.openingTime),
    closingTime: toTime(x.closingTime), icon: x.icon, image: cleanImage(x.image),
    status: x.status || 'Active', isFeatured: !!x.isFeatured,
  }),
  create: (x) => servicesApi.create(services.toApi(x)),
  update: (x) => servicesApi.update(x.id, services.toApi(x)),
  remove: (x) => servicesApi.remove(x.id),
};

export const ENTITIES = { rooms, activities, bookings, customers, restaurants, menuItems, facilities, images, services };
export { serverId };
