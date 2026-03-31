import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import Lead from '@/models/Lead'

export async function GET() {
  const session = await getServerSession(authOptions)

  if (!session || (session.user as any).role !== 'admin') {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  await connectToDatabase()

  const leads = await Lead.find().sort({ createdAt: -1 }).lean()

  return NextResponse.json(leads)
}
