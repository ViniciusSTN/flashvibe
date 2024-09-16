import { Metadata } from 'next'
import { Header } from '@/components/Header'
import { register } from '@/mocks/metadatas'
import Footer from '@/components/Footer'
import { LoginFormSection } from './LoginFormSection'
import { FirstTimeSection } from './FirstTimeSection'

export const metadata: Metadata = { ...register }

export default function Login() {
  return (
    <>
      <Header short />

      {/* className="relative left-1/2 flex max-w-1248px -translate-x-1/2 flex-row-reverse flex-wrap justify-center vsm:mb-16 vsm:mt-10 vsm:rounded-2xl vsm:shadow-lg" */}
      <main className="flex min-h-screen-header items-center justify-center">
        <div className="vsm:clean-box-shadow relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          <LoginFormSection />
          <FirstTimeSection />
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
