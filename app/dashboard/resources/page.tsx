import { Suspense } from 'react'
import ResourcesClient from './ResourcesClient'

export default function ResourcesPage() {
  return (
    <div>
      <h1 className="text-white text-2xl font-semibold mb-6">Resources</h1>
      <Suspense>
        <ResourcesClient />
      </Suspense>
    </div>
  )
}
