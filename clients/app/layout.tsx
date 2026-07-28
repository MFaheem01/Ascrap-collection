import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Plus_Jakarta_Sans, Caveat } from 'next/font/google'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
})

const caveat = Caveat({
  subsets: ['latin'],
  variable: '--font-caveat',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Al Adnan Scrap Buyer | Sell Metal & Scrap in Dubai, UAE',
  description:
    'Al Adnan buys scrap metal, copper, aluminum, steel, and batteries across Dubai and the UAE. Free pickup, instant cash, and daily market rates.',
  icons: "/favicon.ico"
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#264a38',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`light bg-background ${jakarta.variable} ${caveat.variable}`}>
      <body className="font-sans antialiased">
        <TooltipProvider>{children}</TooltipProvider>
        <Toaster />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
