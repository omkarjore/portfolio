import express from 'express';
import { getAbout, updateAbout } from '../controllers/aboutController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAbout);
router.put('/', protect, authorize('admin'), updateAbout);

export default router;
