import { Room, Amenity, RoomAmenity } from '../models/index.js';
import { asyncHandler } from './crudController.js';

const include = [{ association: 'amenities', through: { attributes: [] } }];

async function syncAmenities(roomId, amenityIds = []) {
  if (!Array.isArray(amenityIds)) return;
  await RoomAmenity.destroy({ where: { roomId } });
  const ids = [...new Set(amenityIds.map(Number).filter(Number.isInteger))];
  if (ids.length) await RoomAmenity.bulkCreate(ids.map(amenityId => ({ roomId, amenityId })));
}

export const getAll = asyncHandler(async (req, res) => {
  const where = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (Room.rawAttributes[key] && value !== '') where[key] = value;
  }
  res.json(await Room.findAll({ where, include, order: [['roomNumber', 'ASC']] }));
});

export const getOne = asyncHandler(async (req, res) => {
  const room = await Room.findByPk(req.params.id, { include });
  if (!room) return res.status(404).json({ message: 'Room not found.' });
  res.json(room);
});

export const create = asyncHandler(async (req, res) => {
  const { amenityIds, ...body } = req.body || {};
  const room = await Room.create(body);
  await syncAmenities(room.id, amenityIds);
  res.status(201).json(await Room.findByPk(room.id, { include }));
});

export const update = asyncHandler(async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found.' });
  const { amenityIds, ...body } = req.body || {};
  await room.update(body);
  await syncAmenities(room.id, amenityIds);
  res.json(await Room.findByPk(room.id, { include }));
});

export const remove = asyncHandler(async (req, res) => {
  const room = await Room.findByPk(req.params.id);
  if (!room) return res.status(404).json({ message: 'Room not found.' });
  await room.destroy();
  res.json({ message: 'Room deleted.', id: room.id });
});

export default { getAll, getOne, create, update, remove };
