import { HotelSetting, WebsiteSetting, BookingSetting, SystemSetting, NotificationSetting } from '../models/index.js';
import { asyncHandler } from './crudController.js';

const defaults = {
  HotelSetting: { id: 1, hotelName: 'Serenity Grand Hotel' },
  WebsiteSetting: { id: 1, websiteName: 'Serenity Grand Hotel' },
  BookingSetting: { id: 1 },
  SystemSetting: { id: 1 },
};

const singleton = (Model) => ({
  get: asyncHandler(async (req, res) => {
    let row = await Model.findByPk(1);
    if (!row) row = await Model.create(defaults[Model.name] || { id: 1 });
    res.json(row);
  }),
  update: asyncHandler(async (req, res) => {
    let row = await Model.findByPk(1);
    if (!row) row = await Model.create({ ...(defaults[Model.name] || { id: 1 }), ...req.body, id: 1 });
    else await row.update(req.body);
    res.json(row);
  }),
});

export const hotel = singleton(HotelSetting);
export const website = singleton(WebsiteSetting);
export const booking = singleton(BookingSetting);
export const system = singleton(SystemSetting);

export const notifications = {
  get: asyncHandler(async (req, res) => {
    let row = await NotificationSetting.findOne({ where: { userId: req.user.id } });
    if (!row) row = await NotificationSetting.create({ userId: req.user.id });
    res.json(row);
  }),
  update: asyncHandler(async (req, res) => {
    let row = await NotificationSetting.findOne({ where: { userId: req.user.id } });
    if (!row) row = await NotificationSetting.create({ userId: req.user.id });
    await row.update(req.body);
    res.json(row);
  }),
};
