'use client'

import { useCookies } from '@/hooks/cookies'
import { NavbarType } from '@/types/navBar'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export const Navbar: NavbarType = ({ items, loginItems, mobile }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const [menuOpened, setMenuOpened] = useState<boolean>(false)

  const sessionCookie = useCookies('session')
  const jwtToken = useCookies('Authorization')

  const handleNavItemClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  const handleMouseEnter = (index: number) => {
    setOpenIndex(index)
  }

  const handleMouseLeave = () => {
    setOpenIndex(null)
  }

  const handleMenuButtonClick = () => {
    setMenuOpened(!menuOpened)
  }

  const navItems =
    sessionCookie && jwtToken
      ? [...items, loginItems[0]]
      : [...items, loginItems[1]]

  return (
    <nav>
      {!mobile ? (
        <ul className="flex">
          {navItems.map((item, index) => (
            <li
              key={index}
              className="relative"
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={handleMouseLeave}
            >
              <button
                onClick={() => handleNavItemClick(index)}
                className={`relative px-4 py-1 font-medium transition-colors duration-200 ${openIndex === index && 'text-secondary-blue'} before:absolute before:bottom-0 before:left-0 before:right-0 before:h-px before:bg-principal-blue before:content-[''] ${openIndex === index ? 'before:block' : 'before:hidden'}`}
              >
                {item.title}
              </button>
              {openIndex === index && (
                <ul
                  className={`absolute z-30 whitespace-nowrap bg-white px-10 py-5 shadow-md ${index === navItems.length - 1 ? 'right-0' : 'left-0'}`}
                >
                  {item.links.map((link, itemIndex) => (
                    <li key={`${index} ${itemIndex}`}>
                      <Link
                        href={link.link}
                        className="inline-block p-1 transition hover:text-secondary-blue"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <>
          <button className="relative z-50" onClick={handleMenuButtonClick}>
            {!menuOpened ? (
              <Image
                alt="Abrir menu"
                src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/menu.svg?alt=media&token=861e8da6-ff80-4b70-b052-458886156e11"
                width={30}
                height={30}
              />
            ) : (
              <Image
                alt="Fechar menu"
                src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-x-svgrepo-com.svg?alt=media&token=7c0579ea-c642-4c46-98fd-10443342c0a2"
                width={30}
                height={30}
              />
            )}
          </button>

          <div
            className={`fixed inset-0 z-40 bg-black transition-opacity duration-300 ${
              menuOpened ? 'opacity-95' : 'pointer-events-none opacity-0'
            }`}
          ></div>

          {menuOpened && (
            <nav className="absolute left-10 top-28 z-50 text-white">
              <ul className="flex flex-col gap-4">
                {navItems.map((item, index) => (
                  <li key={index}>
                    <button
                      onClick={() => handleNavItemClick(index)}
                      className="flex items-center gap-3 text-xl"
                    >
                      {item.title}
                      <span
                        className={`transition-transform duration-300 ${openIndex === index && 'rotate-180'}`}
                      >
                        <Image
                          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/arrow.svg?alt=media&token=e11396af-503b-43e1-8ee8-225ae2234aa5"
                          alt="ver opções"
                          width={15}
                          height={15}
                          className="rotate-270"
                        />
                      </span>
                    </button>
                    {openIndex === index && (
                      <ul className="ml-3 mt-2">
                        {item.links.map((link, itemIndex) => (
                          <li key={`${index} ${itemIndex}`}>
                            <Link
                              href={link.link}
                              className="inline-block p-1 transition hover:text-secondary-blue"
                            >
                              {link.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>
          )}
        </>
      )}
    </nav>
  )
}
