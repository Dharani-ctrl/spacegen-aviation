import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const geistSans = Geist({
  subsets: ["latin"],
  variable: '--font-geist-sans'
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: '--font-geist-mono'
});

export const metadata: Metadata = {
  title: 'SpaceGen Aviation - India\'s First IIT Equivalent Aviation Program',
  description: 'SpaceGen Aviation offers India\'s first IIT equivalent aviation program for school students with hands-on flying simulation, drone/rocket technologies, and expert guidance.',
  generator: 'v0.app',
  openGraph: {
    title: 'SpaceGen Aviation - Premium Aviation Education',
    description: 'Join India\'s premier aviation program with on-campus flying simulation and space technology concepts.',
    images: [{ url: '/spacegen-og.jpg', width: 1200, height: 630 }],
  },
  icons: {
    icon: [
      {
        url: '/up-arrowhead.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/up-arrowhead.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/up-arrowhead.png',
        type: 'image/svg+xml',
      },
    ],
    apple: '/up-arrowhead.png',
  },
}

import CustomCursor from '@/components/custom-cursor';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-white text-gray-900`}>
        <CustomCursor />
        <div className="relative">
          {children}
        </div>
        <Analytics />
      </body>
    </html>
  )
}
