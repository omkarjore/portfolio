import express from 'express';
import { getEducation, createEducation, updateEducation, deleteEducation } from '../controllers/educationController.js';
import { protect, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEducation);
router.post('/', protect, authorize('admin'), createEducation);
router.put('/:id', protect, authorize('admin'), updateEducation);
router.delete('/:id', protect, authorize('admin'), deleteEducation);

export default router;
