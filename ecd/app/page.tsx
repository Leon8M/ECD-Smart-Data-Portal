// app/page.tsx
import { getAuthSession } from '@/lib/auth'
import { redirect } from 'next/navigation'

export default async function HomePage() {
  const session = await getAuthSession()

  // Redirect authenticated users to dashboard
  if (session?.user) {
    return redirect('/dashboard')
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center px-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to the ECD Smart Data Portal</h1>
      <p className="text-lg text-muted-foreground mb-6">
        Centralized data management for Nairobi County ECD centers.
      </p>
      <a
        href="/login"
        className="px-6 py-3 bg-primary text-white rounded-lg hover:bg-primary/80 transition"
      >
        Login to Get Started
      </a>
    </main>
  )
}
