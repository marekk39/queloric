import mongoose, { Schema, Document, Model } from 'mongoose'

export interface ILead extends Document {
  partnerRef: string
  clientName: string
  clientEmail: string
  service: string
  projectValue: number
  commission: number
  status: 'pending' | 'closed' | 'cancelled'
}

const LeadSchema = new Schema<ILead>(
  {
    partnerRef: { type: String, required: true },
    clientName: { type: String, required: true },
    clientEmail: { type: String, required: true },
    service: { type: String, required: true },
    projectValue: { type: Number, default: 0 },
    commission: { type: Number, default: 0 },
    status: { type: String, enum: ['pending', 'closed', 'cancelled'], default: 'pending' },
  },
  { timestamps: true }
)

const Lead: Model<ILead> =
  mongoose.models.Lead || mongoose.model<ILead>('Lead', LeadSchema)

export default Lead
