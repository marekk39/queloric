'use client'

import { useEffect, useState } from 'react'

interface Partner {
  _id: string
  name: string
  email: string
  refCode: string
  totalEarned: number
  referralCount: number
  createdAt: string
}

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/partners')
      .then((r) => r.json())
      .then((data) => {
        setPartners(data)
        setLoading(false)
      })
  }, [])

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Partners</h1>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Name</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Email</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ref Code</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Total Earned</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Referrals</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Joined</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">Loading…</td>
              </tr>
            )}
            {!loading && partners.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">No active partners.</td>
              </tr>
            )}
            {partners.map((p) => (
              <tr key={p._id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-white">{p.name}</td>
                <td className="px-4 py-3 text-gray-300">{p.email}</td>
                <td className="px-4 py-3 text-gray-300 font-mono text-xs">{p.refCode}</td>
                <td className="px-4 py-3 text-gray-300">€{p.totalEarned.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-300">{p.referralCount}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(p.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
