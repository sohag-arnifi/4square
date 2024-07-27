import mongoose, { ObjectId, model } from "mongoose";
import { Document, Model, Schema } from "mongoose";
import { IClient } from "../client";
import { IUser } from "../user";

export interface IBulkSMS extends Document {
  sendTo: string | ObjectId | IClient | null;
  sendNumber: string;
  message: string;
  sendBy: string;
  smsCount: number;
  createdAt: Date;
}

const bulkSmsSchema: Schema<IBulkSMS> = new Schema<IBulkSMS>(
  {
    sendTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      default: null,
    },
    sendNumber: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
    },
    sendBy: {
      // type: mongoose.Schema.Types.ObjectId,
      type: String,
      // ref: "User",
      required: true,
    },

    smsCount: {
      type: Number,
      default: 1,
    },
  },
  {
    timestamps: true,
  }
);

const BulkSMS: Model<IBulkSMS> =
  mongoose.models.Message || model<IBulkSMS>("Message", bulkSmsSchema);

export default BulkSMS;
