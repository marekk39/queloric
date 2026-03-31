'use client'

import { useEffect, useState } from 'react'

interface Stats {
  totalEarned: number
  pendingBalance: number
  paidOut: number
  referralCount: number
  refCode: string
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then((data) => setStats(data.partner))
  }, [])

  const referralLink = stats
    ? `${window.location.origin}/ref/${stats.refCode}`
    : ''

  function copyLink() {
    navigator.clipboard.writeText(referralLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const statCards = [
    { label: 'Total Earned', value: stats ? `€${stats.totalEarned.toFixed(2)}` : '—' },
    { label: 'Pending Balance', value: stats ? `€${stats.pendingBalance.toFixed(2)}` : '—' },
    { label: 'Paid Out', value: stats ? `€${stats.paidOut.toFixed(2)}` : '—' },
    { label: 'Referral Count', value: stats ? stats.referralCount : '—' },
  ]

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Overview</h1>

      <div className="grid grid-cols-2 gap-4 mb-8 lg:grid-cols-4">
        {statCards.map(({ label, value }) => (
          <div
            key={label}
            className="rounded-xl p-5"
            style={{ backgroundColor: '#111' }}
          >
            <p className="text-gray-400 text-sm mb-1">{label}</p>
            <p className="text-white text-2xl font-bold">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl p-5" style={{ backgroundColor: '#111' }}>
        <p className="text-gray-400 text-sm mb-2">Your Referral Link</p>
        <div className="flex gap-2">
          <input
            readOnly
            value={referralLink}
            className="flex-1 bg-white/5 text-white text-sm rounded-lg px-3 py-2 outline-none border border-white/10"
          />
          <button
            onClick={copyLink}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white transition-colors"
            style={{ backgroundColor: '#6366f1' }}
          >
            {copied ? 'Copied!' : 'Copy'}
          </button>
        </div>
      </div>
    </div>
  )
}
