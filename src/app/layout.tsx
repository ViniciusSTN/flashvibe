import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlashVibe',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        {children}
        <Footer />
      </body>
    </html>
  )
}
