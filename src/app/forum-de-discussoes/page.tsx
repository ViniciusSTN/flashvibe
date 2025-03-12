import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Metadata } from 'next'
import { discussion } from '@/mocks/metadatas'
import { Suspense } from 'react'
import { DiscussionSection } from './DiscussionSection'

export const metadata: Metadata = { ...discussion }

export default function DiscussionForum() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando página...</div>}>
          <DiscussionSection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
