import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ApresentationSection } from './ApresentationSection'
import { SliderSection } from './SliderSection'

export default function Home() {
  return (
    <>
      <Header />

      <main>
        <ApresentationSection />
        <SliderSection />
      </main>

      <Footer theme="dark" />
    </>
  )
}
