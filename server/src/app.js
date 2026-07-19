/**
 * CARD Technocrats & Engineers LLP - Express Application configuration
 * 
 * 1. Security Headers (Helmet):
 *    Utilizes Helmet middleware to set standard secure HTTP response headers 
 *    (preventing XSS, clickjacking, MIME sniffing, and setting CSP constraints).
 * 2. Strict CORS policy:
 *    Restricts incoming requests to only originate from the authorized frontend client 
 *    domain (read dynamically from process.env.CLIENT_URL). Supports credentialed session cookies.
 * 3. IP Rate Limiting:
 *    Configures express-rate-limit to protect database-bound endpoints from brute force and denial of service (DoS) 
 *    by capping request frequencies to 200 per 15 minutes per IP address.
 * 4. Body Parsers:
 *    Express body parsers are capped at '10mb' to accommodate base64 document attachments 
 *    or large JSON structures uploaded by administrators.
 * 5. Structured Error Lifecycle:
 *    - Route mismatch throws a custom `ApiError(404)`.
 *    - Global error handler catches all operational and programming exceptions, rendering normalized 
 *      JSON responses without exposing internal server stack traces to users.
 */

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import rateLimit from 'express-rate-limit';
import mongoSanitize from 'express-mongo-sanitize';
import errorHandler from './middleware/errorHandler.js';
import ApiError from './utils/ApiError.js';
import { auditLogger } from './middleware/auditMiddleware.js';

// Route controllers and sub-routes mapping
import authRoutes from './routes/authRoutes.js';
import serviceRoutes from './routes/serviceRoutes.js';
import pricingRoutes from './routes/pricingRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import contactRoutes from './routes/contactRoutes.js';
import downloadRoutes from './routes/downloadRoutes.js';
import galleryRoutes from './routes/galleryRoutes.js';
import newsletterRoutes from './routes/newsletterRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
import analyticsRoutes from './routes/analyticsRoutes.js';
import applicationRoutes from './routes/applicationRoutes.js';
import clientRoutes from './routes/clientRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import jobRoutes from './routes/jobRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js';

const app = express();

// Trust reverse proxy (e.g., Render, Heroku) so secure cookies work
app.set('trust proxy', 1);

// Security HTTP headers with strict CSP and HSTS
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'unsafe-inline'", "https://checkout.razorpay.com"],
      frameSrc: ["'self'", "https://checkout.razorpay.com"],
      imgSrc: ["'self'", "data:", "https://res.cloudinary.com"],
    },
  },
  hsts: {
    maxAge: 31536000, // 1 year
    includeSubDomains: true,
    preload: true
  }
}));

// Sanitize data against NoSQL injection
app.use(mongoSanitize());

// Logging middleware configuration (Morgan)
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// CORS configuration pointing to client URL
const clientUrl = process.env.CLIENT_URL || 'http://localhost:5173';
app.use(
  cors({
    origin: [clientUrl, 'http://localhost:5000', 'http://localhost:80'],
    credentials: true,
  })
);

// Body parser configuration with 10mb payload limits
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());

// Rate limiting middleware to prevent API abuse
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200, // Limit each IP to 200 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes',
});
app.use('/api/', limiter);

// Server operational health check endpoint
app.get('/api/v1/health', (_req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is healthy' });
});

// Audit Logger for mutations
app.use('/api/v1/', auditLogger);

// Main API Router Mappings
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/services', serviceRoutes);
app.use('/api/v1/pricing', pricingRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/client', clientRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/contacts', contactRoutes);
app.use('/api/v1/downloads', downloadRoutes);
app.use('/api/v1/gallery', galleryRoutes);
app.use('/api/v1/newsletter', newsletterRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
app.use('/api/v1/analytics', analyticsRoutes);
app.use('/api/v1/applications', applicationRoutes);
app.use('/api/v1/bookings', bookingRoutes);
app.use('/api/v1/careers', jobRoutes);

// Fallback 404 handler for unmatched routes
app.use('*', (req, _res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global central error handler middleware
app.use(errorHandler);

export default app;
