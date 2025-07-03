import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import AuthProvider from '@/components/auth-provider'
import { Toaster } from 'sonner'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ECD Smart Data Portal',
  description: 'Centralized data management for Nairobi County ECD centers.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <Toaster />
        </AuthProvider>
      </body>
    </html>
  )
}