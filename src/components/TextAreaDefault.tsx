import { TextAreaProps } from '@/types/input'
import { forwardRef } from 'react'

export const TextAreaDefault = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  (
    {
      name,
      value = '',
      disable = false,
      error = [],
      label = '',
      onChange,
      placeholder = '',
      tailwind = '',
    },
    ref,
  ) => {
    return (
      <div className={`relative ${tailwind}`}>
        <div className="mb-1 font-medium">
          {label.length > 0 && <label htmlFor={name}>{label}</label>}
        </div>
        <textarea
          className={`textareaDefault h-20 pl-4 transition-colors duration-300 ease-out ${error?.length > 0 && 'inputDefaultError'} ${disable ? 'inputDefaultDisabled' : 'inputDefaultEnabled'}`}
          placeholder={placeholder}
          name={name}
          id={name}
          onChange={onChange}
          value={value}
          ref={ref}
          disabled={disable}
        />
        {error?.length > 0 && (
          <small className="text-red-600 block">{error[0]}</small>
        )}
      </div>
    )
  },
)

TextAreaDefault.displayName = 'TextAreaDefault'
