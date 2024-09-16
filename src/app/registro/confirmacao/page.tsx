import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { register } from '@/mocks/metadatas'
import { ConfirmationSection } from './ConfirmationSection'
import { WelcomeBackSection } from '../WelcomeBackSection'
import Footer from '@/components/Footer'

export const metadata: Metadata = { ...register }

export default function Register() {
  return (
    <>
      <Header short />

      {/* className="relative left-1/2 flex max-w-1248px -translate-x-1/2 flex-row-reverse flex-wrap justify-center vsm:mb-16 vsm:mt-10 vsm:rounded-2xl vsm:shadow-lg" */}
      <main className="flex min-h-screen-header items-center justify-center">
        <div className="vsm:clean-box-shadow vsm:rounded-2xls relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:shadow-clean">
          <ConfirmationSection />
          <WelcomeBackSection />
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
