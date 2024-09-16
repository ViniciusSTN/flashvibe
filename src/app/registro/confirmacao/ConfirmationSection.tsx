'use client'

import { useRecoilValue } from 'recoil'
import { redirect } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useState, useEffect, useRef } from 'react'
import { userEmailAtom } from '@/states'

export const ConfirmationSection = () => {
  const email = useRecoilValue(userEmailAtom)

  if (!email) redirect('/')

  const [inputs, setInputs] = useState(Array(6).fill(''))
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const [counter, setCounter] = useState<number>(60)

  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

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

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    // enviar código para o backend validar se é o mesmo enviado no email
    // enviar dados para o backend criar novo usuário
    // registar usuário no firebase
  }

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  useEffect(() => {
    function callBack() {
      if (counter > 0) setCounter((prevState) => prevState - 1)
    }

    const interval = setInterval(callBack, 1000)

    return () => clearInterval(interval)
  }, [counter])

  function handleResendClick() {
    setCounter(60)
    // enviar dado de email para o backend enviar um código de confirmação no email do usuário
  }

  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div>
        <h1 className="mb-4 text-center text-3xl font-bold text-principal-blue">
          Entre com o código
        </h1>
        <p className="mb-8 text-center font-medium">
          Nós enviamos um código para
          <span className="italic"> {email}</span>
        </p>

        <form
          action=""
          className="flex flex-col items-center"
          onSubmit={handleFormSubmit}
        >
          <div className="mb-8 flex gap-3">
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

          <div className="mb-12 flex items-center gap-3 font-medium text-principal-blue">
            <span className="flex h-11 w-11 items-center justify-center rounded border border-principal-blue text-xl">
              {counter}
            </span>
            <button
              disabled={counter > 0}
              className="disabled:cursor-not-allowed disabled:text-light-gray250"
              onClick={handleResendClick}
            >
              Reenviar código
            </button>
          </div>

          <ButtonDefault
            text="Verificar"
            type="button"
            submit
            paddingx="px-6"
            paddingy="py-2"
            shadow
          />
        </form>
      </div>
    </section>
  )
}
