import { Router } from 'express';
import {
  createCheckIn,
  getCheckInsForObjective,
  getCheckIn,
  updateCheckIn,
  deleteCheckIn,
  shareCheckIn,
} from '../controllers/checkin.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

// The 'mergeParams: true' option allows us to access parameters from the parent router (objectives)
const router = Router({ mergeParams: true });

// All routes in this file are protected
router.use(protect);

// @route   POST /api/objectives/:objectiveId/checkins
// @desc    Create a new check-in for an objective
router.post('/', authorize(['create_own_checkin']), createCheckIn);

// @route   GET /api/objectives/:objectiveId/checkins
// @desc    Get all check-ins for an objective
router.get('/', authorize(['read_own_checkins']), getCheckInsForObjective);

// @route   GET /api/objectives/:objectiveId/checkins/:checkinId
// @desc    Get a single check-in by ID
router.get('/:checkinId', authorize(['read_own_checkins']), getCheckIn);

// @route   PUT /api/objectives/:objectiveId/checkins/:checkinId
// @desc    Update a check-in
router.put('/:checkinId', authorize(['update_own_checkin']), updateCheckIn);

// @route   DELETE /api/objectives/:objectiveId/checkins/:checkinId
// @desc    Delete a check-in
router.delete('/:checkinId', authorize(['delete_own_checkin']), deleteCheckIn);

// @route   POST /api/objectives/:objectiveId/checkins/:checkinId/share
// @desc    Share a check-in with another department
// @access  Private (author of the objective associated with the check-in)
router.post('/:checkinId/share', authorize(['update_own_checkin']), shareCheckIn);

export default router;
