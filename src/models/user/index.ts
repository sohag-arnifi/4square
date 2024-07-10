import mongoose, { Document, Model, Schema, model } from "mongoose";
import { ObjectId } from "mongoose";

// Define the role enum
export const IRole = {
  SUPER_ADMIN: "super_admin",
  ADMIN: "admin",
  USER: "user",
};

// Define the TypeScript interface
export interface IUser extends Document {
  _id: ObjectId | string;
  username: string;
  password: string;
  role: keyof typeof IRole | "admin" | "super_admin" | "user";
  name?: string;
  email?: string;
  phone?: string;
  isActive: boolean;
  lastVisit?: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      // select: false,
    },
    role: {
      type: String,
      required: true,
      enum: Object.values(IRole),
    },
    name: {
      type: String,
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
    isActive: {
      type: Boolean,
      default: true,
    },
    lastVisit: {
      type: Date,
    },
  },
  {
    timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" },
  }
);

const User: Model<IUser> =
  mongoose.models.User || model<IUser>("User", userSchema);

export default User;
