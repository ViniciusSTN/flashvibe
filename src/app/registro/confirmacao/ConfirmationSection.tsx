'use client'

import { useRecoilState, useSetRecoilState } from 'recoil'
import { redirect, useRouter, useSearchParams } from 'next/navigation'
import { ButtonDefault } from '@/components/ButtonDefault'
import { useEffect, useState } from 'react'
import { resendCounterAtom, userEmailAtom } from '@/states'
import { ResendComponent } from '@/components/ResendComponent'
import {
  resendConfirmationCodeToEmail,
  validateJwtToken,
  verifyConfirmationCode,
} from '@/data/sendCodeToEmail'
import { ConfirmationCode } from '@/components/ConfirmationCode'
import { toast } from 'react-toastify'

export const ConfirmationSection = () => {
  const searchParams = useSearchParams()
  const param = searchParams.get('code')

  const [email, setEmail] = useRecoilState(userEmailAtom)

  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''))
  const [loader, setLoader] = useState<boolean>(false)
  const [loadingEmail, setLoadingEmail] = useState<boolean>(true)

  const setCounter = useSetRecoilState(resendCounterAtom)

  const router = useRouter()

  useEffect(() => {
    if (!param) {
      redirect('/')
    } else if (email) {
      setLoadingEmail(false)
    }
  }, [param, email])

  useEffect(() => {
    const validation = async () => {
      if (param) {
        const response = await validateJwtToken(param)

        console.log(response)

        if (!response.success) router.push('/registro')
      }
    }

    validation()
  }, [param, router])

  async function handleConfirmationCode() {
    setLoader(true)

    const code = inputs.reduce((acc, value) => acc + value)

    if (code.length < inputs.length) {
      toast.error('Código incorreto')
    } else if (param) {
      const response = await verifyConfirmationCode(email, code, param)

      if (response.success) {
        setEmail('')
        router.push(`/registro/senha?code=${response.jwt_token}`)
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
    resendConfirmationCodeToEmail(email)
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
