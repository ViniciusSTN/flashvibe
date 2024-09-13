import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { register } from '@/mocks/metadatas'
import { ConfirmationSection } from './ConfirmationSection'
import { WelcomeBackSection } from '../WelcomeBackSection'

export const metadata: Metadata = { ...register }

export default function Register() {
  return (
    <>
      <Header short />

      <main className="relative left-1/2 flex max-w-1248px -translate-x-1/2 flex-row-reverse flex-wrap justify-center vsm:mb-16 vsm:mt-10 vsm:rounded-2xl vsm:shadow-lg">
        <ConfirmationSection />
        <WelcomeBackSection />
      </main>
    </>
  )
}
