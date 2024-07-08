import mongoose, { model } from "mongoose";
import { Document, Model, Schema } from "mongoose";

export interface IInvestor extends Document {
  name: string;
  phone: string;
  email: string;
  invest: number;
  profit: number;
  isActive: boolean;
}

const investorSchema: Schema<IInvestor> = new Schema<IInvestor>(
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
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    invest: {
      type: Number,
      default: 0,
    },
    profit: {
      type: Number,
      default: 0,
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

const Investor: Model<IInvestor> =
  mongoose.models.Investor || model<IInvestor>("Investor", investorSchema);

export default Investor;
