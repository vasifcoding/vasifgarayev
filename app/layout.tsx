import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Navigation } from '@/components/navigation'
import { DraggableTerminal } from '@/components/draggable-terminal'
import { MagneticCursor } from '@/components/magnetic-cursor'
import { GridOverlay } from '@/components/grid-overlay'
import './globals.css'

const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-geist-mono',
})

export const metadata: Metadata = {
  title: 'vasif os // developer portfolio',
  description: 'cyber-engineering os — portfolio of vasif garayev, computer engineering student',
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-[#050505] text-[#e0e0e0] overflow-x-hidden grain-overlay`}
      >
        <GridOverlay />
        <Navigation />
        <main className="relative z-10 min-h-screen pt-16 sm:pt-20">
          {children}
        </main>
        <DraggableTerminal />
        <MagneticCursor />
        <Analytics />
      </body>
    </html>
  )
}
