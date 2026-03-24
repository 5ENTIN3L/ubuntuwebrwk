import { Request, Response } from 'express';
import Objective from '../models/Objective';

// @desc    Create a new objective
export const createObjective = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { title, description, status, dueDate, department } = req.body;
  const user = req.user._id;

  try {
    const objective = new Objective({
      title,
      description,
      user,
      status,
      dueDate,
      department,
    });

    const newObjective = await objective.save();
    res.status(201).json(newObjective);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get all objectives for the logged-in user
export const getObjectives = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const userDepartment = req.user.department;
    const objectives = await Objective.find({
      $or: [
        { department: userDepartment },
        { 'sharedWith.department': userDepartment },
      ],
    });
    res.status(200).json(objectives);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Get a single objective by ID
export const getObjective = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const userDepartment = req.user.department;
    const objective = await Objective.findById(req.params.id);

    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }

    const isOwnerDepartment = objective.department === userDepartment;
    const isSharedWithDepartment = objective.sharedWith.some(
      share => share.department === userDepartment
    );

    if (!isOwnerDepartment && !isSharedWithDepartment) {
      return res.status(403).json({ message: 'User not authorized to view this objective' });
    }

    res.status(200).json(objective);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Update an objective
export const updateObjective = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { title, description, status, dueDate, department } = req.body;

  try {
    const objective = await Objective.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { title, description, status, dueDate, department },
      { new: true, runValidators: true }
    );

    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }

    res.status(200).json(objective);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Delete an objective
export const deleteObjective = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  try {
    const objective = await Objective.findOneAndDelete({ _id: req.params.id, user: req.user._id });

    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }

    res.status(200).json({ message: 'Objective removed' });
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// @desc    Share an objective with another department
export const shareObjective = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  const { department, permission } = req.body;
  const { id } = req.params;

  try {
    const objective = await Objective.findById(id);
    if (!objective) {
      return res.status(404).json({ message: 'Objective not found' });
    }

    // Check if the user is the author
    if (objective.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Add the new share object to the sharedWith array
    objective.sharedWith.push({ department, permission });
    const updatedObjective = await objective.save();

    res.status(200).json(updatedObjective);
  } catch (error: any) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
