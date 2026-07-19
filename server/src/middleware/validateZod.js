import ApiError from '../utils/ApiError.js';

export const validateZod = (schema) => (req, res, next) => {
  try {
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });
    next();
  } catch (error) {
    const formattedErrors = error.errors.map((err) => ({
      path: err.path.join('.'),
      message: err.message,
    }));
    return next(new ApiError(400, 'Validation Error: ' + formattedErrors[0].message));
  }
};
