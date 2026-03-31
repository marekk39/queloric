'use client'

import { useEffect, useState } from 'react'

interface Lead {
  _id: string
  clientName: string
  clientEmail: string
  service: string
  projectValue: number
  commission: number
  status: 'pending' | 'closed' | 'cancelled'
  createdAt: string
}

const statusColors: Record<string, string> = {
  pending: '#ca8a04',
  closed: '#16a34a',
  cancelled: '#dc2626',
}

export default function ReferralsPage() {
  const [leads, setLeads] = useState<Lead[]>([])

  useEffect(() => {
    fetch('/api/dashboard/stats')
      .then((r) => r.json())
      .then((data) => setLeads(data.leads ?? []))
  }, [])

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Referrals</h1>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Client</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Service</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Value</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Commission</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Status</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-gray-500 py-8">
                  No referrals yet.
                </td>
              </tr>
            )}
            {leads.map((lead) => (
              <tr key={lead._id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3">
                  <p className="text-white">{lead.clientName}</p>
                  <p className="text-gray-500 text-xs">{lead.clientEmail}</p>
                </td>
                <td className="px-4 py-3 text-gray-300">{lead.service}</td>
                <td className="px-4 py-3 text-gray-300">€{lead.projectValue.toFixed(2)}</td>
                <td className="px-4 py-3 text-gray-300">€{lead.commission.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <span
                    className="px-2 py-0.5 rounded-full text-xs font-medium text-white"
                    style={{ backgroundColor: statusColors[lead.status] + '33', color: statusColors[lead.status] }}
                  >
                    {lead.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(lead.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
