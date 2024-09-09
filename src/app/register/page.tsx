import { RegisterFormSection } from './RegisterFormSection'
import { WelcomeBackSection } from './WelcomeBackSection'
import { Header } from '@/components/Header'

export default function Register() {
  return (
    <>
      <Header short />

      <main className="vsm:mb-16 vsm:mt-10 vsm:rounded-2xl vsm:shadow-lg relative left-1/2 flex max-w-1248px -translate-x-1/2 flex-row-reverse flex-wrap justify-center">
        <RegisterFormSection />
        <WelcomeBackSection />
      </main>
    </>
  )
}
