import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { MyDecksSection } from './MyDecksSection'
import { Metadata } from 'next'
import { myDecks } from '@/mocks/metadatas'

export const metadata: Metadata = { ...myDecks }

export default function MyDecks() {
  return (
    <>
      <Header />
      <main>
        <MyDecksSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
