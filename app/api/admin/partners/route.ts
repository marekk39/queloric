import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import Partner from '@/models/Partner'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await connectToDatabase()

  const partners = await Partner.find({ status: 'active' })
    .sort({ createdAt: -1 })
    .select('-password')
    .lean()

  return NextResponse.json(partners)
}
