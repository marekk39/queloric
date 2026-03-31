'use client'

import { useEffect, useState } from 'react'

interface Application {
  _id: string
  name: string
  email: string
  refCode: string
  createdAt: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [acting, setActing] = useState<string | null>(null)

  async function fetchApplications() {
    const res = await fetch('/api/admin/applications')
    const data = await res.json()
    setApplications(data)
    setLoading(false)
  }

  useEffect(() => {
    fetchApplications()
  }, [])

  async function handleAction(partnerId: string, action: 'approve' | 'reject') {
    setActing(partnerId)
    await fetch('/api/admin/applications', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ partnerId, action }),
    })
    await fetchApplications()
    setActing(null)
  }

  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Applications</h1>

      <div className="rounded-xl overflow-hidden" style={{ backgroundColor: '#111' }}>
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left text-gray-400 font-medium px-4 py-3">Name</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Email</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Ref Code</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Applied</th>
              <th className="text-left text-gray-400 font-medium px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">Loading…</td>
              </tr>
            )}
            {!loading && applications.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center text-gray-500 py-8">No pending applications.</td>
              </tr>
            )}
            {applications.map((app) => (
              <tr key={app._id} className="border-b border-white/5 last:border-0">
                <td className="px-4 py-3 text-white">{app.name}</td>
                <td className="px-4 py-3 text-gray-300">{app.email}</td>
                <td className="px-4 py-3 text-gray-300 font-mono text-xs">{app.refCode}</td>
                <td className="px-4 py-3 text-gray-500 text-xs">
                  {new Date(app.createdAt).toLocaleDateString()}
                </td>
                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <button
                      disabled={acting === app._id}
                      onClick={() => handleAction(app._id, 'approve')}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-white disabled:opacity-50 transition-colors"
                      style={{ backgroundColor: '#16a34a' }}
                    >
                      Approve
                    </button>
                    <button
                      disabled={acting === app._id}
                      onClick={() => handleAction(app._id, 'reject')}
                      className="px-3 py-1 rounded-lg text-xs font-medium text-white disabled:opacity-50 transition-colors"
                      style={{ backgroundColor: '#dc2626' }}
                    >
                      Reject
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
