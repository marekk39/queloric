import mongoose, { Schema, Document, Model } from "mongoose";

export interface IPartner extends Document {
  name: string;
  email: string;
  password: string;
  refCode: string;
  status: "pending" | "active" | "rejected";
  totalEarned: number;
  pendingBalance: number;
  paidOut: number;
  referralCount: number;
  createdAt: Date;
}

const PartnerSchema = new Schema<IPartner>(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true },
    refCode: { type: String, required: true, unique: true },
    status: { type: String, enum: ["pending", "active", "rejected"], default: "pending" },
    totalEarned: { type: Number, default: 0 },
    pendingBalance: { type: Number, default: 0 },
    paidOut: { type: Number, default: 0 },
    referralCount: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: true, updatedAt: false } }
);

const Partner: Model<IPartner> =
  mongoose.models.Partner ?? mongoose.model<IPartner>("Partner", PartnerSchema);

export default Partner;
