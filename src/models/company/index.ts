import mongoose, { Document, Model, Schema, model } from "mongoose";
import { ObjectId } from "mongoose";

// Define the TypeScript interface
export interface ICompany extends Document {
  _id: ObjectId | string;
  companyName: string;
  address: string;
  email: string;
  phone: string;
  startDate: Date;
  emergencyContact: string;
  license: string;
  binNumber: string;
  isActive: boolean;
}

const companySchema: Schema<ICompany> = new Schema<ICompany>(
  {
    companyName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      unique: true,
      sparse: true, // allows for null values while enforcing uniqueness
      trim: true,
    },
    phone: {
      type: String,
      trim: true,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    emergencyContact: {
      type: String,
      trim: true,
    },
    license: {
      type: String,
      trim: true,
    },
    binNumber: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const Company: Model<ICompany> =
  mongoose.models.Company || model<ICompany>("Company", companySchema);

export default Company;
