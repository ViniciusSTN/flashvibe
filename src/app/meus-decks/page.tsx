// page.tsx
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { MyDecksSection } from './MyDecksSection'
import { Metadata } from 'next'
import { myDecks } from '@/mocks/metadatas'
import { Suspense } from 'react'

export const metadata: Metadata = { ...myDecks }

export default function MyDecks() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando página...</div>}>
          <MyDecksSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
