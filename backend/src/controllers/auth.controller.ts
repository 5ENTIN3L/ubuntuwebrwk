import { Request, Response } from 'express';
import User from '../models/User';
import LoginHistory from '../models/LoginHistory';
import jwt from 'jsonwebtoken'; // Changed to import jwt
import mongoose from 'mongoose';

// Function to generate a JWT
const generateToken = (id: string, role: string) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error('JWT_SECRET not found in environment variables.');
  }
  return jwt.sign({ id, role }, secret, {
    expiresIn: '1d', // Token expires in 1 day
  });
};

// @desc    Register a new user
export const register = async (req: Request, res: Response) => {
  const { name, email, password, department, role } = req.body;

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    user = new User({
      name,
      email,
      password,
      department,
      role,
    });

    await user.save();

    // Generate a token
    const token = generateToken((user._id as mongoose.Types.ObjectId).toString(), user.role); // Cast _id to string

    res.status(201).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Authenticate user and get token
export const login = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Create login history record
    const ipAddress = req.ip;
    const userAgent = req.headers['user-agent'] || 'Unknown';

    await LoginHistory.create({
      user: user._id,
      ipAddress,
      userAgent,
    });

    // Generate a token
    const token = generateToken((user._id as mongoose.Types.ObjectId).toString(), user.role); // Cast _id to string

    res.status(200).json({ token });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get current user's profile
// @access  Private
export const getMe = async (req: Request, res: Response) => {
  res.status(200).json(req.user);
};

// @desc    Get login history for the current user
// @access  Private
export const getLoginHistory = async (req: Request, res: Response) => {
  try {
    const loginHistory = await LoginHistory.find({ user: req.user?._id }).sort({ timestamp: -1 });
    res.status(200).json(loginHistory);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
