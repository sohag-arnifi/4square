import mongoose, { ObjectId, model } from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface IClient extends Document {
  _id: ObjectId | string;
  name: string;
  phone: string;
  email: string;
  address: string;
  customerId: string;
  loginId: string;
  loginPassword: string;
  servicePackege: string;
  expiryDate: Date;
  mac: string;
  isActive: boolean;
}

const clientSchema: Schema<IClient> = new Schema<IClient>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    customerId: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    loginId: {
      type: String,
      required: true,
      trim: true,
    },
    loginPassword: {
      type: String,
      required: true,
      trim: true,
    },
    servicePackege: {
      type: String,
      required: true,
      trim: true,
    },
    expiryDate: {
      type: Date,
      default: new Date(Date.now()),
    },
    mac: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

const Client: Model<IClient> =
  mongoose.models.Client || model<IClient>("Client", clientSchema);

export default Client;
