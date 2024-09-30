'use client'

import { showPasswordAtom } from '@/states'
import { InputProps } from '@/types/input'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'
import React, { forwardRef } from 'react'

export const InputDefault = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      type,
      placeholder = '',
      image = '',
      tailwind = 'mb-0',
      name,
      onChange,
      value,
      error = [],
      label = '',
      disable = false,
    },
    ref,
  ) => {
    const showPassword = useRecoilValue(showPasswordAtom)

    if (type === 'password' && showPassword) type = 'text'

    return (
      <div className={`relative ${tailwind}`}>
        <div className="mb-1 font-medium">
          {label.length > 0 && <label htmlFor={name}>{label}</label>}
        </div>
        <input
          className={`inputDefault ${error?.length > 0 && 'inputDefaultError'} ${image.length > 0 ? 'pl-8' : 'pl-4'} ${disable ? 'inputDefaultDisabled' : 'inputDefaultEnabled'}`}
          type={type}
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          ref={ref}
          disabled={disable}
        />
        <span className="absolute left-2 top-3">
          {image.length > 0 && (
            <Image
              src={image}
              alt={placeholder + ' ícone'}
              width={18}
              height={18}
            />
          )}
        </span>
        {error?.length > 0 && (
          <small className="block text-red-600">{error[0]}</small>
        )}
      </div>
    )
  },
)

InputDefault.displayName = 'InputDefault'
