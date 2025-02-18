import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { Metadata } from 'next'
import { discussion } from '@/mocks/metadatas'
import { NewDiscussionSection } from './NewDiscussionSection'

export const metadata: Metadata = { ...discussion }

export default function NewDiscussion() {
  return (
    <>
      <Header />
      <main>
        <NewDiscussionSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
