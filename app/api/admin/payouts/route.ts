import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import Payout from '@/models/Payout'
import Partner from '@/models/Partner'

function requireAdmin(session: any) {
  if (!session || session.user?.role !== 'admin') return false
  return true
}

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await connectToDatabase()

  const payouts = await Payout.find({ status: 'requested' })
    .populate('partnerId', 'name email')
    .sort({ requestedAt: -1 })
    .lean()

  return NextResponse.json(payouts)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { payoutId } = await req.json()

  if (!payoutId) {
    return NextResponse.json({ error: 'Missing payoutId' }, { status: 400 })
  }

  await connectToDatabase()

  const payout = await Payout.findById(payoutId)
  if (!payout) {
    return NextResponse.json({ error: 'Payout not found' }, { status: 404 })
  }

  payout.status = 'paid'
  payout.paidAt = new Date()
  await payout.save()

  await Partner.findByIdAndUpdate(payout.partnerId, {
    $inc: {
      paidOut: payout.amount,
      pendingBalance: -payout.amount,
    },
  })

  return NextResponse.json({ ok: true })
}
