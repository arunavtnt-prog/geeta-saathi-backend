/**
 * Journal Routes
 * User journal entries and reflections
 */

import { Router } from 'express';

const router = Router();

// TODO: Implement journal routes
router.get('/', (req, res) => {
  res.json({ message: 'Get journal entries - TODO' });
});

export default router;
