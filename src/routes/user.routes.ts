/**
 * User Routes
 * User profile and progress management
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement user routes
router.get('/me', (req, res) => {
  res.json({ message: 'Get user profile - TODO' });
});

export default router;
