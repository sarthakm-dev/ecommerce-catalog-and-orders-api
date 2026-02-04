import rateLimit from 'express-rate-limit';
export const rateLimiter = rateLimit({
  max: 200,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this IP',
});
