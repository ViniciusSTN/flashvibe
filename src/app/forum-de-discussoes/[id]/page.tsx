import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Metadata } from 'next'
import { discussion } from '@/mocks/metadatas'
import { DiscussionSection } from './DiscussionSection'

export const metadata: Metadata = { ...discussion }

export default function DiscussionForum() {
  return (
    <>
      <Header />
      <main>
        <DiscussionSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
