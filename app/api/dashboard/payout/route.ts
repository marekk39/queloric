import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import dbConnect from '@/lib/dbConnect'
import Partner from '@/models/Partner'
import Payout from '@/models/Payout'

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)

  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { method, walletOrIBAN } = await req.json()

  if (!method || !walletOrIBAN) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  await dbConnect()

  const partner = await Partner.findOne({ email: session.user.email })

  if (!partner) {
    return NextResponse.json({ error: 'Partner not found' }, { status: 404 })
  }

  if (partner.pendingBalance < 40) {
    return NextResponse.json(
      { error: 'Minimum payout is €40. Your current balance is insufficient.' },
      { status: 400 }
    )
  }

  const payout = await Payout.create({
    partnerId: partner._id,
    amount: partner.pendingBalance,
    method,
    walletOrIBAN,
  })

  if (process.env.DISCORD_WEBHOOK_URL) {
    await fetch(process.env.DISCORD_WEBHOOK_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [
          {
            title: 'New Payout Request',
            color: 0x6366f1,
            fields: [
              { name: 'Partner', value: partner.name, inline: true },
              { name: 'Email', value: partner.email, inline: true },
              { name: 'Amount', value: `€${payout.amount.toFixed(2)}`, inline: true },
              { name: 'Method', value: method, inline: true },
              { name: method === 'bank' ? 'IBAN' : 'Wallet', value: walletOrIBAN },
            ],
            timestamp: new Date().toISOString(),
          },
        ],
      }),
    }).catch(() => {})
  }

  return NextResponse.json({ ok: true })
}
