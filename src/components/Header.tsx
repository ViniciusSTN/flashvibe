import { HeaderType } from '@/types/header'
import Image from 'next/image'
import Link from 'next/link'

export const Header: HeaderType = ({ short }) => {
  return (
    <>
      {short && (
        <header className="max-w-1664px mx-auto px-6 py-2">
          <Link href="/" className="inline-block">
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo.png?alt=media&token=cfa1089e-72dc-47c5-9123-9e22c4e098f1"
              alt="flashvibe logo"
              width={205}
              height={38}
              priority
            />
          </Link>
        </header>
      )}
      {!short && <header>Header</header>}
    </>
  )
}
