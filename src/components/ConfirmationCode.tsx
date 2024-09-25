import { ConfirmationCodeType } from '@/types/confirmationCode'
import { useEffect, useRef, useState } from 'react'

export const ConfirmationCode: ConfirmationCodeType = ({
  inputs,
  setInputs,
}) => {
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  function handleInputChange(
    event: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) {
    const value = event.target.value.slice(0, 1)

    setInputs((prevInputs) => {
      const newInputs = [...prevInputs]
      newInputs[index] = value
      return newInputs
    })

    if (value.length > 0 && index < inputs.length - 1) {
      setFocusedIndex(index + 1)
    }
  }

  function handleKeyDown(
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key === 'Backspace') {
      if (inputs[index] === '' && index > 0) {
        setInputs((prevInputs) => {
          const newInputs = [...prevInputs]
          newInputs[index - 1] = ''
          return newInputs
        })
        setFocusedIndex(index - 1)
        event.preventDefault()
      }
    }
  }

  return (
    <div className="flex gap-3">
      {inputs.map((value, index) => (
        <input
          key={index}
          type="number"
          value={value}
          onChange={(e) => handleInputChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          className="h-8 w-8 bg-light-gray200 text-center text-xl font-bold sm:h-10 sm:w-10"
          ref={(el) => {
            inputRefs.current[index] = el
          }}
          onFocus={() => setFocusedIndex(index)}
        />
      ))}
    </div>
  )
}
