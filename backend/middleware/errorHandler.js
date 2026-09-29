export const notFound = (req, res) => res.status(404).json({ message: `Route not found: ${req.method} ${req.originalUrl}` });
export const errorHandler = (err, req, res, next) => {
  if (err?.code === 'LIMIT_FILE_SIZE') return res.status(400).json({ message: 'Uploaded file is too large.' });
  if (err?.name === 'MulterError') return res.status(400).json({ message: err.message });
  if (err?.name === 'SequelizeValidationError') return res.status(400).json({ message: err.errors.map(e => e.message).join(', ') });
  if (err?.name === 'SequelizeUniqueConstraintError') return res.status(409).json({ message: 'Duplicate value: that record already exists.' });
  if (err?.name === 'SequelizeForeignKeyConstraintError') return res.status(400).json({ message: 'Related record does not exist.' });
  console.error(err);
  res.status(err?.statusCode || 500).json({ message: err?.message || 'Internal server error.' });
};
