// Generic CRUD handlers, reused by the simple resources (rooms, gallery, services ...).
// Each resource controller just calls crudController(Model, options).

const asyncHandler = (fn) => (req, res, next) => Promise.resolve(fn(req, res, next)).catch(next);

const PROTECTED_FIELDS = ['id', 'createdAt', 'updatedAt'];

// Only keep fields that exist in the table (stops users writing arbitrary fields)
const pickFields = (Model, body) => {
  const data = {};
  for (const key of Object.keys(body || {})) {
    if (Model.rawAttributes[key] && !PROTECTED_FIELDS.includes(key)) data[key] = body[key];
  }
  return data;
};

// Simple equality filters from the query string: /api/gallery?status=Published&category=Dining
// Only plain string values for real columns are allowed. Sequelize also sends them as
// parameters (not pasted into the SQL), so SQL injection is not possible here.
const buildWhere = (Model, query) => {
  const where = {};
  for (const [key, value] of Object.entries(query)) {
    if (typeof value === 'string' && Model.rawAttributes[key]) where[key] = value;
  }
  return where;
};

// order example: [['number', 'ASC']]
export const crudController = (Model, { order = [['createdAt', 'DESC']] } = {}) => ({
  getAll: asyncHandler(async (req, res) => {
    const items = await Model.findAll({ where: buildWhere(Model, req.query), order });
    res.json(items);
  }),

  getOne: asyncHandler(async (req, res) => {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    res.json(item);
  }),

  create: asyncHandler(async (req, res) => {
    const item = await Model.create(pickFields(Model, req.body));
    res.status(201).json(item);
  }),

  update: asyncHandler(async (req, res) => {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.update(pickFields(Model, req.body));
    res.json(item);
  }),

  remove: asyncHandler(async (req, res) => {
    const item = await Model.findByPk(req.params.id);
    if (!item) return res.status(404).json({ message: 'Not found' });
    await item.destroy();
    res.json({ message: 'Deleted', id: item.id });
  }),
});

export { asyncHandler };
