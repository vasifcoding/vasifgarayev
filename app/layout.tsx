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
  title: 'vasif garayev | software engineer',
description: "computer engineering student at kirsehir ahi evran university. full-stack developer specializing in next.js, react, and ai integration.",
  keywords: ["vasif garayev", "vasif", "garayev", "software engineer", "computer engineering", "kırşehir", "portfolio"],
  authors: [{ name: "vasif garayev" }],
  creator: "vasif garayev",
  icons: {
    icon: [
      { url: '/favicon.jpg', media: '(prefers-color-scheme: light)' },
      { url: '/favicon.jpg', media: '(prefers-color-scheme: dark)' },
      { url: '/favicon.jpg' },
    ],
    apple: '/favicon.jpg',
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
