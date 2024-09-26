import { Metadata } from 'next'
import { reset } from '@/mocks/metadatas'

export const metadata: Metadata = { ...reset }

export default function LayoutResetPassword({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
