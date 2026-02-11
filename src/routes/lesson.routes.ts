/**
 * Lesson Routes
 * Lessons and learning progress
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement lesson routes
router.get('/', (req, res) => {
  res.json({ message: 'Get lessons - TODO' });
});

export default router;
