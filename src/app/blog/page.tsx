import { Metadata } from 'next'
import { blog } from '@/mocks/metadatas'
import { BlogSection } from './BlogSection'
import Footer from '@/components/Footer'
import Header from '@/components/Header'

export const metadata: Metadata = { ...blog }

export default function Blog() {
  return (
    <>
      <Header />
      <main>
        <BlogSection />
      </main>
      <Footer theme="dark" />
    </>
  )
}
