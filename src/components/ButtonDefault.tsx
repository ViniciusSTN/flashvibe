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
      {type === 'button' && (
        <button
          className={`${style === 'dark' && 'bg-principal-blue font-medium text-white hover:text-light-blue200'} ${style === 'outDark' && 'border border-principal-blue font-bold text-principal-blue hover:text-secondary-blue'} text-base transition-colors active:outline active:outline-2 active:outline-secondary-blue ${shadow && 'shadow-sla shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
          type={submit ? 'submit' : 'button'}
          disabled={disabled}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {type === 'link' && (
        <button
          disabled={disabled}
          className={`${style === 'dark' && 'bg-principal-blue text-white hover:text-light-blue900'} ${style === 'light' && 'bg-white text-principal-blue hover:text-light-blue900'} text-base font-semibold transition-colors active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-clean shadow-light-gray250'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          <Link href={link}>{text}</Link>
        </button>
      )}
      {/* Other options... */}
    </>
  )
}
