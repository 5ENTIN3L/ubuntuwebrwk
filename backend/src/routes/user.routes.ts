
import { Router } from 'express';
import { getUserLoginHistory } from '../controllers/user.controller';
import { protect } from '../middleware/auth.middleware';
import { authorize } from '../middleware/authorization.middleware';

const router = Router();

// @route   GET /api/users/:userId/login-history
// @desc    Get login history for a specific user
// @access  Private (Admin)
router.get('/:userId/login-history', protect, authorize(['view_user_history']), getUserLoginHistory);

export default router;
