'use client'

import { useState } from 'react'

const templates = [
  {
    title: 'No Website Pitch',
    body: `Hi [Name],

I noticed your business doesn't have a website yet — and in today's market, that's leaving real money on the table.

At Queloric, we build clean, fast, conversion-focused websites tailored for businesses like yours. We handle everything from design to launch, so you don't have to lift a finger.

Would you be open to a quick 15-minute call this week to see if it's a good fit?

Best,
[Your Name]`,
  },
  {
    title: 'Outdated Website Pitch',
    body: `Hi [Name],

I checked out your website and I think there's a real opportunity to modernise it and turn it into a stronger sales tool.

Queloric specialises in rebuilding websites that look great, load fast, and actually convert visitors into customers.

Happy to put together a quick proposal — no strings attached. Worth a call?

Best,
[Your Name]`,
  },
  {
    title: 'Chatbot / AI Automation Pitch',
    body: `Hi [Name],

Imagine having a 24/7 assistant on your website that qualifies leads, answers FAQs, and books appointments — automatically.

Queloric builds custom AI chatbots that integrate directly with your site and your workflow. No technical knowledge needed on your end.

Can I show you a quick demo this week?

Best,
[Your Name]`,
  },
]

export default function ResourcesClient() {
  const [copied, setCopied] = useState<string | null>(null)

  function copyTemplate(title: string, body: string) {
    navigator.clipboard.writeText(body)
    setCopied(title)
    setTimeout(() => setCopied(null), 2000)
  }

  return (
    <div className="space-y-4">
      {templates.map(({ title, body }) => (
        <div
          key={title}
          className="rounded-xl p-5"
          style={{ backgroundColor: '#111' }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white font-medium">{title}</h2>
            <button
              onClick={() => copyTemplate(title, body)}
              className="px-3 py-1 rounded-lg text-xs font-medium text-white transition-colors"
              style={{ backgroundColor: '#6366f1' }}
            >
              {copied === title ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <pre className="text-gray-400 text-sm whitespace-pre-wrap font-sans leading-relaxed">
            {body}
          </pre>
        </div>
      ))}
    </div>
  )
}
