import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ApresentationSection } from './ApresentationSection'
import { SliderSection } from './SliderSection'
import { WhyFlashcardsSection } from './whyFlashcardsSection'
import { HowToCreateFlashcardsSection } from './HowToCreateFlashcardsSection'
import { LearnSection } from './LearnSection'
import { FaqsSection } from './FaqsSection'

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <ApresentationSection />
        <SliderSection />
        <WhyFlashcardsSection />
        <HowToCreateFlashcardsSection />
        <LearnSection />
        <FaqsSection />
      </main>

      <Footer theme="dark" />
    </>
  )
}
