// Fills empty tables with starter data:   npm run seed
// - rooms: the 6 rooms shown on the website Rooms page (room numbers are samples, edit them in the admin)
// - gallery + services: copied from the website's data files
// A table that already has rows is skipped, so it is safe to run twice.
import 'dotenv/config';
import connectDB, { sequelize } from './config/db.js';
import { Room, GalleryImage, Service } from './models/index.js';
import { galleryImages } from '../frontend/src/web/data/gallery.js';
import { services } from '../frontend/src/web/data/services.js';

const rooms = [
  { number: '101', name: 'Deluxe Ocean View', type: 'Deluxe Room', price: 320 },
  { number: '102', name: 'Deluxe Garden View', type: 'Deluxe Room', price: 270 },
  { number: '201', name: 'Executive Room', type: 'Executive Room', price: 380 },
  { number: '202', name: 'Executive Suite', type: 'Suite', price: 520 },
  { number: '301', name: 'Family Suite', type: 'Family Room', price: 610 },
  { number: '401', name: 'Presidential Suite', type: 'Presidential Suite', price: 1100 },
];

const seedIfEmpty = async (Model, rows, label) => {
  if ((await Model.count()) > 0) {
    console.log(`${label}: already has data, skipped`);
    return;
  }
  await Model.bulkCreate(rows);
  console.log(`${label}: added ${rows.length}`);
};

try {
  await connectDB();
  await seedIfEmpty(Room, rooms, 'rooms');
  await seedIfEmpty(
    GalleryImage,
    galleryImages.map(({ id, ...rest }) => rest), // eslint-disable-line no-unused-vars
    'gallery'
  );
  await seedIfEmpty(
    Service,
    services.map(({ id, ...rest }) => rest), // eslint-disable-line no-unused-vars
    'services'
  );
} catch (err) {
  console.error(err.message);
  process.exitCode = 1;
} finally {
  await sequelize.close();
}
