import { Suspense } from 'react'
import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { EditDeckSection } from './EditDeckSection'
import { editCustomDeck } from '@/mocks/metadatas'
import { Metadata } from 'next'

export const metadata: Metadata = { ...editCustomDeck }

export default function EditDeck() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <EditDeckSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
