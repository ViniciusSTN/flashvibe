'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { redirect } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useState, useRef, useEffect } from 'react'
import { resendCounterAtom, userEmailAtom, userNameAtom } from '@/states'
import { ResendComponent } from '@/components/ResendComponent'
import {
  sendConfirmationCodeToEmail,
  verifyConfirmationCode,
} from '@/data/sendCodeToEmail'

export const ConfirmationSection = () => {
  const email = useRecoilValue(userEmailAtom)
  const name = useRecoilValue(userNameAtom)

  if (!email) redirect('/')

  const [inputs, setInputs] = useState(Array(6).fill(''))
  const [focusedIndex, setFocusedIndex] = useState<number>(0)
  const [loader, setLoader] = useState<boolean>(false)

  const setCounter = useSetRecoilState(resendCounterAtom)

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

  async function handleConfitmationCode() {
    setLoader(true)
    // se um ou mais campo não for preenchido, mostrar erro

    const code = inputs.reduce((acc, value) => acc + value)
    console.log(code)

    // enviar código para o backend validar se é o mesmo enviado no email
    const response = await verifyConfirmationCode(email, code)

    console.log(response)

    // enviar dados para o backend criar novo usuário
    // registar usuário no firebase

    setLoader(false)
  }

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    handleConfitmationCode()
  }

  useEffect(() => {
    if (inputRefs.current[focusedIndex]) {
      inputRefs.current[focusedIndex]?.focus()
    }
  }, [focusedIndex])

  function handleResendClick() {
    setCounter(60)
    sendConfirmationCodeToEmail(email, name) // enviar dado de email para o backend enviar um código de confirmação no email do usuário
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

          <div className="mb-12">
            <ResendComponent onClick={handleResendClick} border>
              Reenviar código
            </ResendComponent>
          </div>

          <ButtonDefault
            text={loader ? 'Verificando...' : 'Verificar'}
            type="button"
            submit
            paddingx="px-6"
            paddingy="py-2"
            shadow
            disabled={loader}
          />
        </form>
      </div>
    </section>
  )
}
