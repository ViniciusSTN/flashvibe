import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { newStandardDeck } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { StandardDecksSection } from './StandardDecksSection'
import { Suspense } from 'react'

export const metadata: Metadata = { ...newStandardDeck }

export default function NewStandardDeck() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando página...</div>}>
          <StandardDecksSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
