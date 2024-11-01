import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { addFlashcard } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { AddFlashcardSection } from './AddFlashcardSection'

export const metadata: Metadata = { ...addFlashcard }

export default function AddFlashcard() {
  return (
    <>
      <Header />
      <main>
        <AddFlashcardSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
