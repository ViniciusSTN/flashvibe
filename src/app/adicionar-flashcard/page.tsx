import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { AddFlashcardSection } from './AddFlashcardSection'
import { addFlshcard } from '@/mocks/metadatas'
import { Metadata } from 'next'

export const metadata: Metadata = { ...addFlshcard }

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
