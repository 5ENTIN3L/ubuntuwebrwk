import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

// Interface to define the User document type
export interface IUser extends Document {
  name: string;
  email: string;
  password?: string;
  department: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

// Define the User schema
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, 'Name is required.'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is required.'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address.'],
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
      select: false, // Do not return password by default
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
    role: {
      type: String,
      required: [true, 'Role is required.'],
      enum: ['volunteer', 'staff', 'executive', 'admin'], // Example roles
      default: 'volunteer',
    },
  },
  {
    timestamps: true, // Automatically adds createdAt and updatedAt fields
  }
);

// Middleware to hash password before saving
UserSchema.pre<IUser>('save', async function (next) {
  if (!this.isModified('password') || !this.password) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare given password with the hashed password
UserSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  if (!this.password) {
    return false;
  }
  return bcrypt.compare(candidatePassword, this.password);
};

// Create and export the User model
const User = model<IUser>('User', UserSchema);

export default User;

