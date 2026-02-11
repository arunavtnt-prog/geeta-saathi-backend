/**
 * Rate Limiting Middleware
 * Protects API endpoints from abuse
 */

import rateLimit from 'express-rate-limit';

// General API rate limiter
export const rateLimiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000'), // 1 minute
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'), // 100 requests per minute
  message: {
    error: 'Too many requests from this IP, please try again later.',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health checks
    return req.path === '/health';
  },
});

// Stricter rate limiter for expensive operations (AI, etc.)
export const strictRateLimiter = rateLimit({
  windowMs: 60000, // 1 minute
  max: 10, // 10 requests per minute
  message: {
    error: 'Too many requests, please slow down.',
  },
});

// Auth endpoint rate limiter (prevent OTP spam)
export const authRateLimiter = rateLimit({
  windowMs: 900000, // 15 minutes
  max: 5, // 5 OTP attempts per 15 minutes
  message: {
    error: 'Too many OTP attempts. Please try again later.',
  },
});

// AI Chat rate limiter (free tier limit)
export const aiRateLimiter = rateLimit({
  windowMs: 86400000, // 24 hours
  max: 50, // 50 AI questions per day
  message: {
    error: 'Daily AI question limit reached. Try again tomorrow.',
  },
});
