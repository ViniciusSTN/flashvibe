'use client'

import { useRecoilValue, useSetRecoilState } from 'recoil'
import { redirect } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useState } from 'react'
import { resendCounterAtom, userEmailAtom, userNameAtom } from '@/states'
import { ResendComponent } from '@/components/ResendComponent'
import {
  sendConfirmationCodeToEmail,
  verifyConfirmationCode,
} from '@/data/sendCodeToEmail'
import { ConfirmationCode } from '@/components/ConfirmationCode'
import { toast } from 'react-toastify'

export const ConfirmationSection = () => {
  const email = useRecoilValue(userEmailAtom)
  const name = useRecoilValue(userNameAtom)

  if (!email) redirect('/')

  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''))
  const [loader, setLoader] = useState<boolean>(false)

  const setCounter = useSetRecoilState(resendCounterAtom)

  async function handleConfirmationCode() {
    setLoader(true)

    const code = inputs.reduce((acc, value) => acc + value)

    if (code.length < inputs.length) {
      toast.error('Código incorreto')
    } else {
      // enviar código para o backend validar se é o mesmo enviado no email
      const response = await verifyConfirmationCode(email, code)
      console.log(response)
      // enviar dados para o backend criar novo usuário
      // registar usuário no firebase
    }

    setLoader(false)
  }

  async function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    handleConfirmationCode()
  }

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
          <div className="mb-8">
            <ConfirmationCode inputs={inputs} setInputs={setInputs} />
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
