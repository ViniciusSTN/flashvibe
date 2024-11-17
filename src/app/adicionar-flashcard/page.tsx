import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { addFlashcard } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { AddFlashcardSection } from './AddFlashcardSection'
import { Suspense } from 'react'

export const metadata: Metadata = { ...addFlashcard }

export default function AddFlashcard() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <AddFlashcardSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
