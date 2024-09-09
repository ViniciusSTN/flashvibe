import { InputType } from '@/types/input'
import Image from 'next/image'

export const InputDefault: InputType = ({
  type,
  placeholder,
  image = '',
  tailwind = 'mb-0',
}) => {
  return (
    <div className={`relative ${tailwind}`}>
      <input className="inputDefault" type={type} placeholder={placeholder} />
      <span className="absolute left-2 top-3">
        {image && (
          <Image
            src={image}
            alt={placeholder + ' icon'}
            width={18}
            height={18}
          />
        )}
      </span>
    </div>
  )
}
