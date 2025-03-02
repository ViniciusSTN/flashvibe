import { Metadata } from 'next'
import { contactUs } from '@/mocks/metadatas'
import { ContactUsSection } from './ContactUsSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = { ...contactUs }

export default function ContactUs() {
  return (
    <>
      <Header />
      <main>
        <ContactUsSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
