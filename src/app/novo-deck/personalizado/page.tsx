import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { newCustomDeck } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { NewCustomDeckSection } from './NewCustomDeckSection'

export const metadata: Metadata = { ...newCustomDeck }

export default function CustomDeck() {
  return (
    <>
      <Header />
      <main>
        <NewCustomDeckSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
