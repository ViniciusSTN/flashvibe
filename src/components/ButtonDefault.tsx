import { ButtonType } from '@/types/button'
import Link from 'next/link'

export const ButtonDefault: ButtonType = ({
  text,
  type,
  style = 'dark',
  link = '',
  shadow,
  radius = 'rounded-2xl',
  paddingx = 'px-0',
  paddingy = 'px-0',
  tailwind,
}) => {
  return (
    <>
      {style === 'dark' && type === 'button' && (
        <button
          className={`bg-principal-blue text-base font-medium text-white ${shadow && 'shadow-md shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {style === 'light' && type === 'link' && (
        <Link
          href={link}
          className={`bg-white text-base font-semibold text-principal-blue ${shadow && 'shadow-md shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          {text}
        </Link>
      )}
      {/* Other options... */}
    </>
  )
}
