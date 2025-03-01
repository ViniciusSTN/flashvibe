import { Metadata } from 'next'
import { help } from '@/mocks/metadatas'
import { HelpHeaderSection } from './HelpHeaderSection'
import { HowToCreateFlashcardsSection } from './HowToCreateFlashcardsSection'
import { HowToShareDecksSection } from './HowToShareDecksSection'
import { HowToAddCommunityDecksSection } from './HowToAddCommunityDecksSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = { ...help }

export default function Help() {
  return (
    <>
      <Header />
      <main className="mx-auto mb-24 mt-16 min-h-screen-header max-w-1248px px-6 md:px-10">
        <HelpHeaderSection />
        <HowToCreateFlashcardsSection />
        <HowToShareDecksSection />
        <HowToAddCommunityDecksSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
