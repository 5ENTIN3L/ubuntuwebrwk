import { Schema, model, Document, Types } from 'mongoose';

// Interface to define the CheckIn document type
export interface ICheckIn extends Document {
  objective: Types.ObjectId; // The objective this check-in is for
  user: Types.ObjectId; // The user who is checking in
  notes: string; // Notes or updates for the check-in
  date: Date; // The date of the check-in
  department: string; // The department this check-in belongs to
  sharedWith: Array<{
    department: string;
    permission: 'read' | 'edit';
  }>; // Departments this check-in is shared with
  createdAt: Date;
  updatedAt: Date;
}

// Define the CheckIn schema
const CheckInSchema = new Schema<ICheckIn>(
  {
    objective: {
      type: Schema.Types.ObjectId,
      ref: 'Objective',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    notes: {
      type: String,
      required: [true, 'Check-in notes are required.'],
    },
    date: {
      type: Date,
      default: Date.now,
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

// Create and export the CheckIn model
const CheckIn = model<ICheckIn>('CheckIn', CheckInSchema);

export default CheckIn;
