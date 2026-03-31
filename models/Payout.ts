import mongoose, { Schema, Document, Model, Types } from 'mongoose'

export interface IPayout extends Document {
  partnerId: Types.ObjectId
  amount: number
  method: 'bank' | 'crypto'
  walletOrIBAN: string
  status: 'requested' | 'paid'
  requestedAt: Date
  paidAt?: Date
}

const PayoutSchema = new Schema<IPayout>(
  {
    partnerId: { type: Schema.Types.ObjectId, ref: 'Partner', required: true },
    amount: { type: Number, required: true },
    method: { type: String, enum: ['bank', 'crypto'], required: true },
    walletOrIBAN: { type: String, required: true },
    status: { type: String, enum: ['requested', 'paid'], default: 'requested' },
    requestedAt: { type: Date, default: Date.now },
    paidAt: { type: Date },
  },
  { timestamps: true }
)

const Payout: Model<IPayout> =
  mongoose.models.Payout || mongoose.model<IPayout>('Payout', PayoutSchema)

export default Payout
