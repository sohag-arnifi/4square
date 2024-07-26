import mongoose, { ObjectId, model } from "mongoose";
import { Document, Model, Schema } from "mongoose";
import { IClient } from "../client";
import { IUser } from "../user";

export interface IBulkSMS extends Document {
  sendTo: string | ObjectId | IClient;
  sendNumber: string;
  message: string;
  sendBy: string | ObjectId | IUser;
  smsCount: number;
}

const bulkSmsSchema: Schema<IBulkSMS> = new Schema<IBulkSMS>(
  {
    sendTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
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
      type: mongoose.Schema.Types.ObjectId,
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

const BulsSMS: Model<IBulkSMS> =
  mongoose.models.Message || model<IBulkSMS>("Message", bulkSmsSchema);

export default BulsSMS;
