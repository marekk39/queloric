'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const navLinks = [
  { href: '/admin/applications', label: 'Applications' },
  { href: '/admin/partners', label: 'Partners' },
  { href: '/admin/leads', label: 'Leads' },
  { href: '/admin/payouts', label: 'Payouts' },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <aside
      style={{ backgroundColor: '#0f0f0f' }}
      className="w-64 min-h-screen flex flex-col border-r border-white/5"
    >
      <div className="px-6 py-6 border-b border-white/5">
        <span className="text-white font-bold text-xl tracking-tight">Queloric</span>
        <span className="ml-2 text-xs text-indigo-400 font-medium">Admin</span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label }) => {
          const isActive = pathname === href
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'text-white border-l-2 border-indigo-500 pl-[10px] bg-white/5'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`}
            >
              {label}
            </Link>
          )
        })}
      </nav>

      <div className="px-3 py-4 border-t border-white/5">
        <button
          onClick={() => signOut({ callbackUrl: '/login' })}
          className="w-full flex items-center px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:text-white hover:bg-white/5 transition-colors"
        >
          Sign out
        </button>
      </div>
    </aside>
  )
}
