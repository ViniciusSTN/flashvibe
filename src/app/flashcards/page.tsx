import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Suspense } from 'react'
import { FlashcardsSection } from './FlashcardsSection'
import { flashcards } from '@/mocks/metadatas'
import { Metadata } from 'next'

export const metadata: Metadata = { ...flashcards }

export default function Flashcards() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando página...</div>}>
          <FlashcardsSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
