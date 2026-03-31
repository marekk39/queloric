import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import Partner from '@/models/Partner'
import Lead from '@/models/Lead'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await dbConnect()

  const partner = await Partner.findOne({ email: session.user.email }).lean()

  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
  }

  const leads = await Lead.find({ partnerRef: (partner as any).refCode })
    .sort({ createdAt: -1 })
    .limit(10)
    .lean()

  return NextResponse.json({ partner, leads })
}
