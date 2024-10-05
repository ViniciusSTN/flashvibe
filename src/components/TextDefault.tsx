'use client'

import React, { useEffect } from 'react'
import { ButtonDefault } from './ButtonDefault'
import { TextDefaultType } from '@/types/home'

export const TextDefault: TextDefaultType = ({
  title,
  coloredTitle = false,
  button = '',
  link = '',
  children,
}) => {
  useEffect(() => {
    console.log(title.split(' ').slice(0, -1))
  }, [title])

  return (
    <div className="text-white lg:max-w-656px">
      <h2 className="mb-6 text-3xl font-bold md:text-center lg:text-start">
        {coloredTitle ? (
          <>
            <span>{title.split(' ').slice(0, -1).join(' ')} </span>
            <span className="text-light-blue800">
              {title.split(' ').slice(-1)}
            </span>
          </>
        ) : (
          title
        )}
      </h2>
      <div className="mb-8 text-xl">{children}</div>
      <div className="flex justify-center lg:justify-start">
        {button.length > 0 && link.length > 0 && (
          <ButtonDefault
            text={button}
            type="link"
            link={link}
            paddingy="py-3"
            paddingx="px-16"
            style="light"
          />
        )}
      </div>
    </div>
  )
}
