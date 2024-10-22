import { Metadata } from 'next'
import Header from '@/components/Header'
import { register } from '@/mocks/metadatas'
import { ConfirmationSection } from './ConfirmationSection'
import { WelcomeBackSection } from '../WelcomeBackSection'
import Footer from '@/components/Footer'
import { Suspense } from 'react'

export const metadata: Metadata = { ...register }

export default function Confirmation() {
  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="vsm:rounded-2xls relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:shadow-clean">
          <Suspense fallback={<div>Carregando...</div>}>
            <ConfirmationSection />
          </Suspense>
          <Suspense fallback={<div>Carregando...</div>}>
            <WelcomeBackSection />
          </Suspense>
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
