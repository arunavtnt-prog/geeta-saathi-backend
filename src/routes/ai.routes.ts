/**
 * AI Guide Routes
 * AI-powered Q&A and spiritual guidance
 */

import { Router } from 'express';
import { authRateLimiter } from '../middleware/rateLimiter.js';

const router = Router();

// Apply stricter rate limiting for AI
router.use(authRateLimiter);

// TODO: Implement AI routes
router.post('/chat', (req, res) => {
  res.json({ message: 'AI chat - TODO' });
});

export default router;
