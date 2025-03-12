import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { CommunityDecksSection } from './CommunityDecksSection'
import { Metadata } from 'next'
import { communityDecks } from '@/mocks/metadatas'
import { Suspense } from 'react'

export const metadata: Metadata = { ...communityDecks }

export default function MyDecks() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando página...</div>}>
          <CommunityDecksSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
