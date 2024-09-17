'use client'

import { Header } from '@/components/Header'
import Footer from '@/components/Footer'
import { notFound, useParams } from 'next/navigation'
import { ResetUsingEmailSection } from './ResetUsingEmailSection'

export default function ResetPassword() {
  const { method } = useParams()

  if (method !== 'sms' && method !== 'email') {
    notFound()
  }

  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="vsm:clean-box-shadow relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center vsm:rounded-2xl vsm:shadow-clean">
          {method === 'sms' && <div>oi</div>}
          {method === 'email' && <ResetUsingEmailSection />}
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
