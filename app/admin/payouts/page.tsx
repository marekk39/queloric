'use client'

import { useEffect, useState } from 'react'

interface Payout {
  _id: string
  partnerId: { name: string; email: string } | string
  amount: number
  method: 'bank' | 'crypto'
  walletOrIBAN: string
  status: 'requested' | 'paid'
  requestedAt: string
}

export default function PayoutsPage() {
  const [payouts, setPayouts] = useState<Payout[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  async function fetchPayouts() {
    const res = await fetch('/api/admin/payouts')
    const data = await res.json()
    setPayouts(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchPayouts()
  }, [])

  async function markPaid(payoutId: string) {
    setActing(payoutId)
    await fetch('/api/admin/payouts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payoutId }),
    })
    await fetchPayouts()
    setActing(null)
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Payouts</h1>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Partner</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Amount</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Method</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">IBAN / Wallet</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Requested</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">Loading…</td>
              </tr>
            )}
            {!loading && payouts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">No pending payouts.</td>
              </tr>
            )}
            {payouts.map((p) => (
              <tr key={p._id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  {typeof p.partnerId === 'object' ? (
                    <>
                      <p className="text-white">{p.partnerId.name}</p>
                      <p className="text-gray-500 text-xs">{p.partnerId.email}</p>
                    </>
                  ) : (
                    <p className="text-gray-400 text-xs font-mono">{p.partnerId}</p>
                  )}
                </td>
                <td className="px-4 py-3 text-white font-medium">€{p.amount.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-300 capitalize">{p.method}</td>
                <td className="px-4 py-3 text-gray-400 font-mono text-xs max-w-[180px] truncate">
                  {p.walletOrIBAN}
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(p.requestedAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <button
                    disabled={acting === p._id}
                    onClick={() => markPaid(p._id)}
                    className="px-3 py-1 rounded-lg text-xs font-medium text-white disabled:opacity-50 transition-colors"
                    style={{ backgroundColor: '#6366f1' }}
                  >
                    {acting === p._id ? 'Saving…' : 'Mark as Paid'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
