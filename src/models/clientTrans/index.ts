import mongoose, { ObjectId, model } from "mongoose";
import { Document, Model, Schema } from "mongoose";
import { IClient } from "../client";

export interface IClientTrans extends Document {
  _id: ObjectId | string;
  paymentClient: string | ObjectId | IClient;
  paymentMethod: string;
  paymentPackage: string;
  paymentAmount: number;
  paymentDate: Date;
  paymentBy: string;
}

const clientTransSchema: Schema<IClientTrans> = new Schema<IClientTrans>(
  {
    paymentClient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      trim: true,
    },
    paymentPackage: {
      type: String,
      required: true,
      trim: true,
    },
    paymentAmount: {
      type: Number,
      required: true,
    },
    paymentDate: {
      type: Date,
      required: true,
      default: new Date(Date.now()),
    },
    paymentBy: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const ClientTransaction: Model<IClientTrans> =
  mongoose.models.ClientTransaction ||
  model<IClientTrans>("ClientTransaction", clientTransSchema);

export default ClientTransaction;
