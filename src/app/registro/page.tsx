import { Metadata } from 'next'
import { RegisterFormSection } from './RegisterFormSection'
import { WelcomeBackSection } from './WelcomeBackSection'
import Header from '@/components/Header'
import { register } from '@/mocks/metadatas'
import Footer from '@/components/Footer'

export const metadata: Metadata = { ...register }

export default function Register() {
  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          <RegisterFormSection />
          <WelcomeBackSection />
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
