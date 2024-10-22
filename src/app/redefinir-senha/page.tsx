import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { ResetPasswordSection } from './ResetPasswordSection'
import { Metadata } from 'next'
import { reset } from '@/mocks/metadatas'
import { Suspense } from 'react'

export const metadata: Metadata = { ...reset }

export default function ResetPassword() {
  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          <Suspense fallback={<div>Carregando página...</div>}>
            <ResetPasswordSection />
          </Suspense>
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
