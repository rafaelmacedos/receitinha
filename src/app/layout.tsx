"use client"

import { Baloo_2 } from 'next/font/google'
import type { Metadata } from 'next'

import { Toaster } from '@/components/ui/toaster'

import './globals.css'
import { AuthProvider } from '../contexts/AuthContext'
const baloo2 = Baloo_2({ subsets: ['latin'] })

// export const metadata: Metadata = {
//   title: 'Receitinha',
//   description:
//     'Aplicação desenvolvida para a competência - Integrar Interfaces e Serviços WEB',
//   icons: {
//     icon: '/favicon.ico',
//   },
// }

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AuthProvider>
    <html lang="en">
      <body className={baloo2.className}>
        {children}
        <Toaster />
      </body>
    </html>
    </AuthProvider>
  )
}
