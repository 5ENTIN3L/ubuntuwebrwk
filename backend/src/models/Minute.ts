import { Schema, model, Document, Types } from 'mongoose';

// Interface to define the Minute document type
export interface IMinute extends Document {
  title: string;
  date: Date;
  attendees: Types.ObjectId[]; // Array of User IDs
  content: string;
  author: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

// Define the Minute schema
const MinuteSchema = new Schema<IMinute>(
  {
    title: {
      type: String,
      required: [true, 'Title is required.'],
      trim: true,
    },
    date: {
      type: Date,
      required: [true, 'Date is required.'],
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    content: {
      type: String,
      required: [true, 'Content is required.'],
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Create and export the Minute model
const Minute = model<IMinute>('Minute', MinuteSchema);

export default Minute;
