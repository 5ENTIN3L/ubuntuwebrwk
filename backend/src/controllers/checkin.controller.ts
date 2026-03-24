import { Request, Response } from 'express';
import CheckIn from '../models/CheckIn';
import Objective from '../models/Objective';

// @desc    Create a new check-in for an objective
export const createCheckIn = async (req: Request, res: Response) => {
  const { notes, date, department } = req.body;
  const user = req.user?._id;
  const { objectiveId } = req.params;

  try {
    // Check if the objective exists and belongs to the user
    const objective = await Objective.findOne({ _id: objectiveId, user });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found or user not authorized' });
    }

    const checkIn = new CheckIn({
      objective: objectiveId,
      user,
      notes,
      date,
      department,
    });

    const newCheckIn = await checkIn.save();
    res.status(201).json(newCheckIn);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all check-ins for an objective
export const getCheckInsForObjective = async (req: Request, res: Response) => {
  const userDepartment = req.user?.department;
  const { objectiveId } = req.params;

  try {
    const objective = await Objective.findOne({
      _id: objectiveId,
      $or: [
        { user: req.user?._id },
        { 'sharedWith.department': req.user?.department },
      ],
    });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found or user not authorized' });
    }

    const checkIns = await CheckIn.find({
      objective: objectiveId,
      $or: [
        { department: userDepartment },
        { 'sharedWith.department': userDepartment },
      ],
    });
    res.status(200).json(checkIns);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single check-in by ID
export const getCheckIn = async (req: Request, res: Response) => {
  const userDepartment = req.user?.department;
  const { objectiveId, checkinId } = req.params;

  try {
    // Check if the objective exists and is accessible to the user
    const objective = await Objective.findOne({
      _id: objectiveId,
      $or: [
        { user: req.user?._id },
        { 'sharedWith.department': req.user?.department },
      ],
    });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found or user not authorized' });
    }

    const checkIn = await CheckIn.findById(checkinId);

    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    const isOwnerDepartment = checkIn.department === userDepartment;
    const isSharedWithDepartment = checkIn.sharedWith.some(
      share => share.department === userDepartment
    );

    if (!isOwnerDepartment && !isSharedWithDepartment) {
      return res.status(403).json({ message: 'User not authorized to view this check-in' });
    }

    res.status(200).json(checkIn);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update a check-in
export const updateCheckIn = async (req: Request, res: Response) => {
  const { notes, date, department } = req.body;
  const user = req.user?._id;
  const { objectiveId, checkinId } = req.params;

  try {
    // Check if the objective exists and belongs to the user
    const objective = await Objective.findOne({ _id: objectiveId, user });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found or user not authorized' });
    }

    const checkIn = await CheckIn.findOneAndUpdate(
      { _id: checkinId, objective: objectiveId },
      { notes, date, department },
      { new: true, runValidators: true }
    );

    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    res.status(200).json(checkIn);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete a check-in
export const deleteCheckIn = async (req: Request, res: Response) => {
  const user = req.user?._id;
  const { objectiveId, checkinId } = req.params;

  try {
    // Check if the objective exists and belongs to the user
    const objective = await Objective.findOne({ _id: objectiveId, user });
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found or user not authorized' });
    }

    const checkIn = await CheckIn.findOneAndDelete({ _id: checkinId, objective: objectiveId });

    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    res.status(200).json({ message: 'Check-in removed' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Share a check-in with another department
export const shareCheckIn = async (req: Request, res: Response) => {
  const { department, permission } = req.body;
  const { objectiveId, checkinId } = req.params;

  try {
    const checkIn = await CheckIn.findById(checkinId);
    if (!checkIn) {
      return res.status(404).json({ message: 'Check-in not found' });
    }

    // Check if the user is the author of the objective associated with the check-in
    const objective = await Objective.findOne({ _id: objectiveId, user: req.user?._id });
    if (!objective) {
      return res.status(401).json({ message: 'User not authorized to share this check-in' });
    }

    // Add the new share object to the sharedWith array
    checkIn.sharedWith.push({ department, permission });
    const updatedCheckIn = await checkIn.save();

    res.status(200).json(updatedCheckIn);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
