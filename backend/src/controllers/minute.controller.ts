import { Request, Response } from 'express';
import Minute from '../models/Minute';

// @desc    Create new meeting minutes
export const createMinute = async (req: Request, res: Response) => {
  const { title, date, attendees, content } = req.body;
  const author = req.user?._id;

  try {
    const minute = new Minute({
      title,
      date,
      attendees,
      content,
      author,
    });

    const newMinute = await minute.save();
    res.status(201).json(newMinute);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all meeting minutes
export const getMinutes = async (req: Request, res: Response) => {
  try {
    const minutes = await Minute.find().populate('author', 'name').populate('attendees', 'name');
    res.status(200).json(minutes);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get single meeting minutes by ID
export const getMinute = async (req: Request, res: Response) => {
  try {
    const minute = await Minute.findById(req.params.id).populate('author', 'name').populate('attendees', 'name');
    if (!minute) {
      return res.status(404).json({ message: 'Minutes not found' });
    }
    res.status(200).json(minute);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update meeting minutes
export const updateMinute = async (req: Request, res: Response) => {
  const { title, date, attendees, content } = req.body;

  try {
    const minute = await Minute.findByIdAndUpdate(
      req.params.id,
      { title, date, attendees, content },
      { new: true, runValidators: true }
    );

    if (!minute) {
      return res.status(404).json({ message: 'Minutes not found' });
    }

    res.status(200).json(minute);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete meeting minutes
export const deleteMinute = async (req: Request, res: Response) => {
  try {
    const minute = await Minute.findByIdAndDelete(req.params.id);

    if (!minute) {
      return res.status(404).json({ message: 'Minutes not found' });
    }

    res.status(200).json({ message: 'Minutes removed' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
