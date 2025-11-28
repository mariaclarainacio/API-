module.exports = (schema) => {
  return (req, res, next) => {
    const { error, value } = schema.validate(req.body, { abortEarly: false, stripUnknown: true });
    if (error) {
      const details = error.details ? error.details.map(d => d.message) : [error.message];
      return res.status(400).json({ error: 'Validation error', details });
    }
    req.body = value;
    next();
  };
};