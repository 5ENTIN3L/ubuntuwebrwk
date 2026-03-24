
import { Request, Response } from 'express';
import LoginHistory from '../models/LoginHistory';

// @desc    Get login history for a specific user
// @access  Private (Admin)
export const getUserLoginHistory = async (req: Request, res: Response) => {
  try {
    const loginHistory = await LoginHistory.find({ user: req.params.userId }).sort({ timestamp: -1 });
    res.status(200).json(loginHistory);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
