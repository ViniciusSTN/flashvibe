import { Metadata } from 'next'
import { whoAreWe } from '@/mocks/metadatas'
import { WhoAreWeSection } from './WhoAreWeSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = { ...whoAreWe }

export default function WhoAreWe() {
  return (
    <>
      <Header />
      <main>
        <WhoAreWeSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
