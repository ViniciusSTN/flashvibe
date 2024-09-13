'use client'

import { userEmailAtom } from '@/states/atoms/userEmail'
import { useRecoilValue } from 'recoil'
import { redirect } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useState, useEffect, useRef } from 'react'

export const ConfirmationSection = () => {
  const email = useRecoilValue(userEmailAtom)

  if (!email) redirect('/')

  const [inputs, setInputs] = useState(Array(5).fill(''))
  const [focusedIndex, setFocusedIndex] = useState<number>(0)

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
    // enviar dados para o banckedn criar novo usuário
    // registar usuário no firebase
  }

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

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
                className="h-10 w-10 bg-light-gray200 text-center text-xl font-bold"
                ref={(el) => {
                  inputRefs.current[index] = el
                }}
                onFocus={() => setFocusedIndex(index)}
              />
            ))}
          </div>

          <div className="mb-12 flex items-center gap-3 font-medium text-principal-blue">
            <span className="rounded border border-principal-blue p-2 text-xl">
              60
            </span>
            <button>Reenviar código</button>
          </div>

          <ButtonDefault
            text="Verificar"
            type="button"
            submit
            paddingx="px-6"
            paddingy="py-2"
          />
        </form>
      </div>
    </section>
  )
}
