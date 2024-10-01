'use client'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { redirect, useRouter } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useEffect, useState } from 'react'
import {
  resendCounterAtom,
  userEmailAtom,
  userNameAtom,
  userNicknameAtom,
} from '@/states'
import { ResendComponent } from '@/components/ResendComponent'
import {
  sendConfirmationCodeToEmail,
  verifyConfirmationCode,
} from '@/data/sendCodeToEmail'
import { ConfirmationCode } from '@/components/ConfirmationCode'
import { toast } from 'react-toastify'

export const ConfirmationSection = () => {
  const [email, setEmail] = useRecoilState(userEmailAtom)
  const [name, setName] = useRecoilState(userNameAtom)
  const setNickname = useSetRecoilState(userNicknameAtom)

  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''))
  const [loader, setLoader] = useState<boolean>(false)
  const [loadingEmail, setLoadingEmail] = useState<boolean>(true)

  const setCounter = useSetRecoilState(resendCounterAtom)

  const router = useRouter()

  useEffect(() => {
    if (!email) {
      redirect('/')
    } else {
      setLoadingEmail(false)
    }
  }, [email])

  // useEffect(() => {
  //   // Função para resetar o estado ao mudar de rota
  //   const handleRouteChange = () => {
  //     setEmail('') // Resetar o estado de email
  //     setName('') // Resetar o estado de name
  //     setNickname('') // Resetar o estado de nickname
  //   }
  // }, [])

  async function handleConfirmationCode() {
    setLoader(true)

    const code = inputs.reduce((acc, value) => acc + value)

    if (code.length < inputs.length) {
      toast.error('Código incorreto')
    } else {
      const response = await verifyConfirmationCode(email, code)

      if (response.success) {
        router.push('/registro/senha')
      } else {
        toast.error('Código inválido, informe novamente')
      }
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
          {!loadingEmail && <span className="italic"> {email}</span>}
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
