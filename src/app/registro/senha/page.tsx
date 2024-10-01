import { Metadata } from 'next'
import Header from '@/components/Header'
import { register } from '@/mocks/metadatas'
import Footer from '@/components/Footer'
import { WelcomeBackSection } from '../WelcomeBackSection'
import { CreatePasswordSection } from './createPasswordSection'

export const metadata: Metadata = { ...register }

export default function Register() {
  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          <CreatePasswordSection />
          <WelcomeBackSection />
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
