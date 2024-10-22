import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'
import RecoilContextProvider from '@/lib/recoilContextProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/ReactToastify.min.css'

const montserrat = Montserrat({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FlashVibe',
  description:
    'Aprenda inglês de forma prática e interativa com FlashVibe. Expanda seu vocabulário, pratique a pronúncia e domine novas palavras usando flashcards personalizados. Comece agora e melhore seu aprendizado!',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-br">
      <body className={montserrat.className}>
        <RecoilContextProvider>
          <ToastContainer />
          {children}
        </RecoilContextProvider>
      </body>
    </html>
  )
}
