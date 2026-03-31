import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { connectToDatabase } from '@/lib/mongodb'
import Partner from '@/models/Partner'
import bcrypt from 'bcryptjs'
import { Resend } from 'resend'

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
  const applications = await Partner.find({ status: 'pending' }).sort({ createdAt: -1 }).lean()
  return NextResponse.json(applications)
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!requireAdmin(session)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 })
  }

  const { partnerId, action } = await req.json()

  if (!partnerId || !['approve', 'reject'].includes(action)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  await connectToDatabase()

  if (action === 'reject') {
    await Partner.findByIdAndUpdate(partnerId, { status: 'rejected' })
    return NextResponse.json({ ok: true })
  }

  // approve: generate password, hash, send email
  const rawPassword = Math.random().toString(36).slice(2, 10) + Math.random().toString(36).slice(2, 6).toUpperCase()
  const hashedPassword = await bcrypt.hash(rawPassword, 10)

  const partner = await Partner.findByIdAndUpdate(
    partnerId,
    { status: 'active', password: hashedPassword },
    { new: true }
  )

  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
  }

  if (process.env.RESEND_API_KEY) {
    const resend = new Resend(process.env.RESEND_API_KEY)
    await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL ?? 'noreply@queloric.com',
      to: partner.email,
      subject: 'Your Queloric Partner Application Has Been Approved',
      html: `
        <div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:32px;background:#0a0a0a;color:#fff;border-radius:12px;">
          <h2 style="color:#6366f1;margin-bottom:8px;">Welcome to Queloric, ${partner.name}!</h2>
          <p style="color:#9ca3af;margin-bottom:24px;">Your partner application has been approved. Here are your login credentials:</p>
          <div style="background:#111;border-radius:8px;padding:16px;margin-bottom:24px;">
            <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">Email</p>
            <p style="margin:0 0 16px;color:#fff;font-weight:600;">${partner.email}</p>
            <p style="margin:0 0 8px;color:#9ca3af;font-size:13px;">Password</p>
            <p style="margin:0;color:#fff;font-weight:600;font-family:monospace;">${rawPassword}</p>
          </div>
          <p style="color:#9ca3af;font-size:13px;">Log in at <a href="${process.env.NEXTAUTH_URL ?? 'https://queloric.com'}/login" style="color:#6366f1;">queloric.com/login</a> and change your password after signing in.</p>
          <p style="color:#9ca3af;font-size:13px;margin-top:16px;">Your referral code: <strong style="color:#fff;font-family:monospace;">${partner.refCode}</strong></p>
        </div>
      `,
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
