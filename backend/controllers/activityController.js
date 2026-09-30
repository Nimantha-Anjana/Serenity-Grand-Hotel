import { Activity, ActivityDay } from '../models/index.js';
import { asyncHandler, pickFields } from './crudController.js';

const include = [{ association: 'days' }];
const order = [['displayOrder', 'ASC'], ['id', 'ASC']];
const VALID_DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// `days` may be ['Monday', ...] or [{ dayOfWeek: 'Monday' }, ...]
async function syncDays(activityId, days) {
  if (!Array.isArray(days)) return;
  const names = [...new Set(days.map((d) => (typeof d === 'string' ? d : d?.dayOfWeek)).filter((d) => VALID_DAYS.includes(d)))];
  await ActivityDay.destroy({ where: { activityId } });
  if (names.length) await ActivityDay.bulkCreate(names.map((dayOfWeek) => ({ activityId, dayOfWeek })));
}

export const getAll = asyncHandler(async (req, res) => {
  const where = {};
  for (const [key, value] of Object.entries(req.query)) {
    if (Activity.rawAttributes[key] && value !== undefined && value !== '') where[key] = value;
  }
  res.json(await Activity.findAll({ where, order, include }));
});

export const getOne = asyncHandler(async (req, res) => {
  const item = await Activity.findByPk(req.params.id, { include });
  if (!item) return res.status(404).json({ message: 'Record not found.' });
  res.json(item);
});

export const create = asyncHandler(async (req, res) => {
  const item = await Activity.create(pickFields(Activity, req.body));
  await syncDays(item.id, req.body?.days);
  res.status(201).json(await Activity.findByPk(item.id, { include }));
});

export const update = asyncHandler(async (req, res) => {
  const item = await Activity.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Record not found.' });
  await item.update(pickFields(Activity, req.body));
  await syncDays(item.id, req.body?.days);
  res.json(await Activity.findByPk(item.id, { include }));
});

export const remove = asyncHandler(async (req, res) => {
  const item = await Activity.findByPk(req.params.id);
  if (!item) return res.status(404).json({ message: 'Record not found.' });
  await item.destroy();
  res.json({ message: 'Deleted successfully.', id: item.id });
});

export default { getAll, getOne, create, update, remove };
