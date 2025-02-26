import { Metadata } from 'next'
import { faqs } from '@/mocks/metadatas'
import { FrequentlyAskedQuestionsSection } from './FrequentlyAskedQuestionsSection'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata: Metadata = { ...faqs }

export default function FrequentlyAskedQuestions() {
  return (
    <>
      <Header />

      <main className="flex min-h-screen-header items-center justify-center">
        <FrequentlyAskedQuestionsSection />
      </main>

      <Footer theme="dark" />
    </>
  )
}
