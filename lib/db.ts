import mongoose, { Document, Schema } from 'mongoose';

// Enquiry Interface
export interface IEnquiry extends Document {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  school: string;
  grade: string;
  programLevel: 'Level 1' | 'Level 2';
  message: string;
  status: 'new' | 'reviewed' | 'contacted' | 'enrolled';
  createdAt: Date;
  updatedAt: Date;
}

// Admin User Interface
export interface IAdmin extends Document {
  username: string;
  passwordHash: string;
  email: string;
  createdAt: Date;
}

// Enquiry Schema
const enquirySchema = new Schema<IEnquiry>(
  {
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, lowercase: true },
    phone: { type: String, required: true },
    school: { type: String, required: true },
    grade: { type: String, required: true },
    programLevel: { type: String, enum: ['Level 1', 'Level 2'], required: true },
    message: { type: String },
    status: { type: String, enum: ['new', 'reviewed', 'contacted', 'enrolled'], default: 'new' },
  },
  { timestamps: true }
);

// Admin Schema
const adminSchema = new Schema<IAdmin>(
  {
    username: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
  },
  { timestamps: true }
);

// Export models
export const Enquiry = mongoose.models.Enquiry || mongoose.model<IEnquiry>('Enquiry', enquirySchema);
export const Admin = mongoose.models.Admin || mongoose.model<IAdmin>('Admin', adminSchema);

// MongoDB Connection
const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/spacegen';

let isConnected = false;

export async function connectToDatabase() {
  if (isConnected) {
    console.log('Already connected to MongoDB');
    return;
  }

  try {
    await mongoose.connect(mongoUri);
    isConnected = true;
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw error;
  }
}

export async function disconnectDatabase() {
  if (!isConnected) return;
  await mongoose.disconnect();
  isConnected = false;
}
