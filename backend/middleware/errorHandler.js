export const notFound = (req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
};

// eslint-disable-next-line no-unused-vars
export const errorHandler = (err, req, res, next) => {
  if (err.name === 'SequelizeValidationError') {
    return res.status(400).json({ message: err.errors.map((e) => e.message).join(', ') });
  }
  if (err.name === 'SequelizeUniqueConstraintError') {
    return res.status(409).json({ message: 'Duplicate value: that record already exists.' });
  }
  if (err.name === 'SequelizeForeignKeyConstraintError') {
    return res.status(400).json({ message: 'Related record does not exist.' });
  }
  console.error(err);
  res.status(500).json({ message: 'Server error' });
};
