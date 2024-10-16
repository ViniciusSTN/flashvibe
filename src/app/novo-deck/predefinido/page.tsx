import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { newStandardDeck } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { StandardDecksSection } from './StandardDecksSection'

export const metadata: Metadata = { ...newStandardDeck }

export default function NewStandardDeck() {
  return (
    <>
      <Header />
      <main>
        <StandardDecksSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
