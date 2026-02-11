/**
 * Notification Routes
 * Push notifications and user notifications
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement notification routes
router.get('/', (req, res) => {
  res.json({ message: 'Get notifications - TODO' });
});

export default router;
