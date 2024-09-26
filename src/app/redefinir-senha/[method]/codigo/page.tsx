'use client'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound, useParams } from 'next/navigation'
import { CodeToResetUsingEmailSection } from './ResetUsingEmailSection'
import { CodeToResetUsingSmsSection } from './ResendUsingSmsSection'

export default function CodeToResetPassword() {
  const { method } = useParams()

  if (method !== 'sms' && method !== 'email') {
    notFound()
  }

  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          {method === 'sms' && <CodeToResetUsingSmsSection />}
          {method === 'email' && <CodeToResetUsingEmailSection />}
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
