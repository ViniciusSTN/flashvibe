'use client'

import { items, loginItems } from '@/mocks/navItems'
import { HeaderType } from '@/types/header'
import { Navbar } from './Navbar'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const Header: HeaderType = ({ short = false }) => {
  const [mobile, setMobile] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    function handleResize() {
      const size = window.innerWidth

      if (size < 1024) setMobile(true)
      else setMobile(false)

      setLoading(false)
    }

    handleResize()

    window.addEventListener('resize', handleResize)

    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <>
      {short && (
        <header className="mx-auto max-w-1664px px-6 py-2">
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

      {!short && (
        <header className="mx-auto flex max-w-1664px items-center justify-between px-6 py-2">
          <Link
            href="/"
            className={`inline-block ${mobile && 'relative z-50'}`}
          >
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo.png?alt=media&token=cfa1089e-72dc-47c5-9123-9e22c4e098f1"
              alt="flashvibe logo"
              width={205}
              height={38}
              priority
            />
          </Link>

          {!loading && (
            <Navbar items={items} mobile={mobile} loginItems={loginItems} />
          )}
        </header>
      )}
    </>
  )
}

export default Header
