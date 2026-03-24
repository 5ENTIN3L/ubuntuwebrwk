import { Schema, model, Document, Types } from 'mongoose';

// Interface to define the Objective document type
export interface IObjective extends Document {
  title: string;
  description: string;
  user: Types.ObjectId; // User responsible for the objective
  department: string;
  status: 'not-started' | 'in-progress' | 'completed' | 'on-hold';
  dueDate: Date;
  sharedWith: Array<{
    department: string;
    permission: 'read' | 'edit';
  }>;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Objective schema
const ObjectiveSchema = new Schema<IObjective>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required.'],
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    department: {
      type: String,
      required: [true, 'Department is required.'],
      enum: [
        'Programs & Community Engagement',
        'Research, Policy & Learning',
        'Partnerships & Resource Mobilization',
        'Operations & Administration',
        'DOCT',
        'Social Media, Communications & Branding',
      ],
    },
    status: {
      type: String,
      enum: ['not-started', 'in-progress', 'completed', 'on-hold'],
      default: 'not-started',
    },
    dueDate: {
      type: Date,
      required: true,
    },
    sharedWith: [
      {
        department: {
          type: String,
          required: true,
          enum: [
            'Programs & Community Engagement',
            'Research, Policy & Learning',
            'Partnerships & Resource Mobilization',
            'Operations & Administration',
            'DOCT',
            'Social Media, Communications & Branding',
          ],
        },
        permission: {
          type: String,
          required: true,
          enum: ['read', 'edit'],
        },
      },
    ],
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Objective model
const Objective = model<IObjective>('Objective', ObjectiveSchema);

export default Objective;
