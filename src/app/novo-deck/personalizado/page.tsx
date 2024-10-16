import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { newCustomDeck } from '@/mocks/metadatas'
import { Metadata } from 'next'
import { CustomDeckSection } from './CustomDeckSection'

export const metadata: Metadata = { ...newCustomDeck }

export default function CustomDeck() {
  return (
    <>
      <Header />
      <main>
        <CustomDeckSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
