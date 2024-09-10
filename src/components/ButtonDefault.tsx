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
          className={`bg-principal-blue text-base font-medium text-white transition-colors hover:text-light-blue200 active:outline active:outline-2 active:outline-secondary-blue ${shadow && 'shadow-md shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {style === 'light' && type === 'link' && (
        <Link
          href={link}
          className={`bg-white text-base font-semibold text-principal-blue transition-colors hover:text-light-blue900 active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-md shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          {text}
        </Link>
      )}
      {/* Other options... */}
    </>
  )
}
