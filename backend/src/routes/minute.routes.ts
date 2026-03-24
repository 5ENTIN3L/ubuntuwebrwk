import { Router } from 'express';
import {
  createMinute,
  getMinutes,
  getMinute,
  updateMinute,
  deleteMinute,
} from '../controllers/minute.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

// All routes in this file are protected and restricted to executives and admins
router.use(protect, authorize(['manage_users']));

// @route   POST /api/minutes
// @desc    Create new meeting minutes
router.post('/', createMinute);

// @route   GET /api/minutes
// @desc    Get all meeting minutes
router.get('/', getMinutes);

// @route   GET /api/minutes/:id
// @desc    Get single meeting minutes by ID
router.get('/:id', getMinute);

// @route   PUT /api/minutes/:id
// @desc    Update meeting minutes
router.put('/:id', updateMinute);

// @route   DELETE /api/minutes/:id
// @desc    Delete meeting minutes
router.delete('/:id', deleteMinute);

export default router;
