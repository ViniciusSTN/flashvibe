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
  submit = false,
  disabled = false,
}) => {
  return (
    <>
      {style === 'dark' && type === 'button' && (
        <button
          className={`bg-principal-blue text-base font-medium text-white transition-colors hover:text-light-blue200 active:outline active:outline-2 active:outline-secondary-blue ${shadow && 'shadow-sla shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
          type={submit ? 'submit' : 'button'}
          disabled={disabled}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {style === 'light' && type === 'link' && (
        <button
          disabled={disabled}
          className={`bg-white text-base font-semibold text-principal-blue transition-colors hover:text-light-blue900 active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-clean shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          <Link href={link}>{text}</Link>
        </button>
      )}
      {/* Other options... */}
    </>
  )
}
