'use client'

import Footer from '@/components/Footer'
import { Header } from '@/components/Header'
import { notFound, useParams } from 'next/navigation'
import { SendToEmailSection } from './SendToEmailSection'
import { SendToPhoneSection } from './SendToPhoneSection'

export default function ResetPassword() {
  const { method } = useParams()

  if (method !== 'sms' && method !== 'email') {
    notFound()
  }

  return (
    <>
      <Header short />

      <main className="flex min-h-screen-header items-center justify-center">
        <div className="relative flex max-w-1248px flex-grow flex-row-reverse flex-wrap justify-center py-32 vsm:rounded-2xl vsm:shadow-clean lg:py-44">
          {method === 'email' && <SendToEmailSection />}
          {method === 'sms' && <SendToPhoneSection />}
        </div>
      </main>

      <Footer theme="light" />
    </>
  )
}
