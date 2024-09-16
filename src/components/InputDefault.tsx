'use client'

import { showPasswordAtom } from '@/states'
import { InputType } from '@/types/input'
import Image from 'next/image'
import { useRecoilValue } from 'recoil'

export const InputDefault: InputType = ({
  type,
  placeholder,
  image = '',
  tailwind = 'mb-0',
  name,
  onChange,
  value,
  error,
}) => {
  const showPassword = useRecoilValue(showPasswordAtom)

  if (type === 'password' && showPassword) type = 'text'

  return (
    <div className={`relative ${tailwind}`}>
      <input
        className={`inputDefault ${error?.length > 0 && 'inputDefaultError'}`}
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
      />
      <span className="absolute left-2 top-3">
        {image && (
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
}
