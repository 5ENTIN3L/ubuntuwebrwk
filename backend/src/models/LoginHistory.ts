
import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User';

export interface ILoginHistory extends Document {
  user: IUser['_id'];
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  location?: {
    city: string;
    country: string;
  };
}

const LoginHistorySchema: Schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
  ipAddress: {
    type: String,
    required: true,
  },
  userAgent: {
    type: String,
    required: true,
  },
  location: {
    city: String,
    country: String,
  },
});

export default mongoose.model<ILoginHistory>('LoginHistory', LoginHistorySchema);
