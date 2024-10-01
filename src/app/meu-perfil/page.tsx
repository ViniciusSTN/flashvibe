import Footer from '@/components/Footer'
import Header from '@/components/Header'
import { MyProfileSection } from './MyProfileSection'
import { Metadata } from 'next'
import { myProfile } from '@/mocks/metadatas'

export const metadata: Metadata = { ...myProfile }

export default function MyProfile() {
  return (
    <>
      <Header />
      <MyProfileSection />
      <Footer theme="dark" />
    </>
  )
}
