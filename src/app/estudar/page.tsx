import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { StudySection } from './StudySection'
import { Metadata } from 'next'
import { study } from '@/mocks/metadatas'
import { Suspense } from 'react'

export const metadata: Metadata = { ...study }

export default function Study() {
  return (
    <>
      <Header />
      <main>
        <Suspense fallback={<div>Carregando...</div>}>
          <StudySection />
        </Suspense>
      </main>
      <Footer theme="dark" />
    </>
  )
}
