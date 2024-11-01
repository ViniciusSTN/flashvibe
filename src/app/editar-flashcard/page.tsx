import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { editFlashcard } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { EditFlashcardSection } from './EditFlashcardSection'
import { Suspense } from 'react'

export const metadata: Metadata = { ...editFlashcard }

export default function AddFlashcard() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditFlashcardSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
