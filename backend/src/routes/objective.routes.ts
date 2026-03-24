import { Router } from 'express';
import {
  createObjective,
  getObjectives,
  getObjective,
  updateObjective,
  deleteObjective,
  shareObjective,
} from '../controllers/objective.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';
import checkinRouter from './checkin.routes';

const router = Router();

// All routes in this file are protected
router.use(protect);

// Nested route for check-ins
router.use('/:objectiveId/checkins', checkinRouter);

// @route   POST /api/objectives
// @desc    Create a new objective
router.post('/', authorize(['create_own_objective']), createObjective);

// @route   GET /api/objectives
// @desc    Get all objectives for the logged-in user
router.get('/', authorize(['read_own_objectives']), getObjectives);

// @route   GET /api/objectives/:id
// @desc    Get a single objective by ID
router.get('/:id', authorize(['read_own_objectives']), getObjective);

// @route   PUT /api/objectives/:id
// @desc    Update an objective
router.put('/:id', authorize(['update_own_objective']), updateObjective);

// @route   DELETE /api/objectives/:id
// @desc    Delete an objective
router.delete('/:id', authorize(['delete_own_objective']), deleteObjective);

// @route   POST /api/objectives/:id/share
// @desc    Share an objective with another department
// @access  Private (author of the objective)
router.post('/:id/share', authorize(['update_own_objective']), shareObjective);

export default router;
