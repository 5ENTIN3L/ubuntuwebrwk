import { Router } from 'express';
import { register, login, getMe, getLoginHistory } from '../controllers/auth.controller';
import { protect } from '../middleware/auth.middleware';

const router = Router();

// @route   POST /api/auth/register
// @desc    Register a new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user and get token
// @access  Public
router.post('/login', login);

// @route   GET /api/auth/me
// @desc    Get current user's profile
// @access  Private
router.get('/me', protect, getMe);

// @route   GET /api/auth/login-history
// @desc    Get login history for current user
// @access  Private
router.get('/login-history', protect, getLoginHistory);

export default router;
