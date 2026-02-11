/**
 * Verse Routes
 * Verses, daily verses, and Gita content
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement verse routes
router.get('/daily', (req, res) => {
  res.json({ message: 'Get daily verse - TODO' });
});

export default router;
