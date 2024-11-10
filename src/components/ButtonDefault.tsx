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
  onClick,
}) => {
  return (
    <>
      {type === 'button' && (
        <button
          className={`${style === 'dark' && 'bg-principal-blue font-medium text-white hover:text-light-blue200'} ${style === 'outDark' && 'border border-principal-blue font-medium text-principal-blue hover:text-secondary-blue'} text-base transition-colors ${shadow && 'shadow-very-clean shadow-light-gray250'} ${!disabled && 'active:outline active:outline-2 active:outline-secondary-blue'} ${disabled && 'cursor-not-allowed'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
          type={submit ? 'submit' : 'button'}
          disabled={disabled}
          onClick={onClick}
        >
          {text}
        </button>
      )}
      {/* Other options... */}

      {type === 'link' && (
        <button
          type="button"
          disabled={disabled}
          className={`${style === 'dark' && 'bg-principal-blue text-white hover:text-light-blue900'} ${style === 'outDark' && 'border border-principal-blue font-medium text-principal-blue hover:text-secondary-blue'} ${style === 'light' && 'bg-white text-principal-blue hover:text-light-blue900'} text-base font-medium transition-colors active:outline active:outline-2 active:outline-light-blue900 ${shadow && 'shadow-clean shadow-light-gray250'} ${disabled && 'cursor-not-allowed'} ${radius && radius} ${tailwind && tailwind} ${paddingx} ${paddingy}`}
        >
          <Link href={link}>{text}</Link>
        </button>
      )}
      {/* Other options... */}
    </>
  )
}
