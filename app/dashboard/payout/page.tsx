'use client'

import { useState } from 'react'

export default function PayoutPage() {
  const [method, setMethod] = useState<'bank' | 'crypto'>('bank')
  const [walletOrIBAN, setWalletOrIBAN] = useState('')
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await fetch('/api/dashboard/payout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ method, walletOrIBAN }),
    })

    const data = await res.json()
    setLoading(false)

    if (res.ok) {
      setSuccess(true)
    } else {
      setError(data.error || 'Something went wrong.')
    }
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-20">
        <div
          className="rounded-xl p-8 max-w-md w-full text-center"
          style={{ backgroundColor: '#111' }}
        >
          <div
            className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: '#6366f133' }}
          >
            <span className="text-2xl" style={{ color: '#6366f1' }}>✓</span>
          </div>
          <h2 className="text-white text-xl font-semibold mb-2">Payout Requested</h2>
          <p className="text-gray-400 text-sm">
            Your payout request has been submitted. We'll process it within 3–5 business days.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Request Payout</h1>

      <div className="max-w-md">
        <div className="rounded-xl p-6" style={{ backgroundColor: '#111' }}>
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-gray-400 text-sm mb-2">Payment Method</p>
              <div className="flex gap-2">
                {(['bank', 'crypto'] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMethod(m)}
                    className="flex-1 py-2 rounded-lg text-sm font-medium transition-colors capitalize"
                    style={{
                      backgroundColor: method === m ? '#6366f1' : 'transparent',
                      color: method === m ? '#fff' : '#9ca3af',
                      border: `1px solid ${method === m ? '#6366f1' : '#ffffff1a'}`,
                    }}
                  >
                    {m === 'bank' ? 'Bank Transfer' : 'Crypto'}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 text-sm mb-1">
                {method === 'bank' ? 'IBAN' : 'Wallet Address'}
              </label>
              <input
                required
                value={walletOrIBAN}
                onChange={(e) => setWalletOrIBAN(e.target.value)}
                placeholder={method === 'bank' ? 'DE89 3704 0044 0532 0130 00' : '0x...'}
                className="w-full bg-white/5 text-white text-sm rounded-lg px-3 py-2 outline-none border border-white/10 focus:border-indigo-500 transition-colors"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-white transition-opacity disabled:opacity-50"
              style={{ backgroundColor: '#6366f1' }}
            >
              {loading ? 'Submitting…' : 'Request Payout'}
            </button>
          </form>
        </div>

        <p className="text-gray-500 text-xs mt-3 px-1">
          Minimum payout is €40. Payouts are processed within 3–5 business days.
        </p>
      </div>
    </div>
  )
}
