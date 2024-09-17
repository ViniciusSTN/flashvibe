import { Metadata } from 'next'
import { redefinir } from '@/mocks/metadatas'

export const metadata: Metadata = { ...redefinir }

export default function LayoutResetPassword({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
