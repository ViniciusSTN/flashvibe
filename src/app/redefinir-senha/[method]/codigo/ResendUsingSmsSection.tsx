import { ButtonDefault } from '@/components/ButtonDefault'
import { ConfirmationCode } from '@/components/ConfirmationCode'
import { ResendComponent } from '@/components/ResendComponent'
import { resendCounterAtom, userPhoneAtom } from '@/states'
import Link from 'next/link'
import { useState } from 'react'
import { toast } from 'react-toastify'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const CodeToResetUsingSmsSection = () => {
  const [inputs, setInputs] = useState<string[]>(Array(6).fill(''))
  const [loader, setLoader] = useState(false)

  const setResendCounter = useSetRecoilState(resendCounterAtom)

  const userPhone = useRecoilValue(userPhoneAtom)

  function handleResendClick() {
    setResendCounter(60)
  }

  function handleFormSubmit(event: React.FormEvent) {
    event.preventDefault()
    handleConfirmationCode()
  }

  async function handleConfirmationCode() {
    setLoader(true)

    const code = inputs.reduce((acc, value) => acc + value)

    if (code.length < inputs.length) {
      toast.error('Código incorreto')
    } else {
      // enviar código para o backend validar se é o mesmo enviado no celular
    }

    setLoader(false)
  }

  return (
    <section className="flex grow flex-col items-center justify-center px-6 py-24 lg:py-32">
      <h1 className="mb-8 text-3xl font-bold text-principal-blue">
        Redefinir senha
      </h1>

      <p className="mb-8 max-w-530px text-center font-medium">
        Informe o código que enviamos para
        <span className="italic"> {userPhone} </span>
      </p>

      <form action="" onSubmit={handleFormSubmit}>
        <div className="mb-8">
          <ConfirmationCode inputs={inputs} setInputs={setInputs} />
        </div>

        <div className="mb-10 flex justify-center">
          <ResendComponent border onClick={handleResendClick}>
            Reenviar código
          </ResendComponent>
        </div>

        <Link
          href={'/redefinir-senha/email'}
          className="mb-10 block text-center font-medium text-principal-blue"
        >
          Redefinir usando e-mail
        </Link>

        <div className="flex justify-center">
          <ButtonDefault
            text={loader ? 'Enviando' : 'Verificar'}
            type="button"
            disabled={loader}
            paddingx="px-6"
            paddingy="py-2"
            submit
          />
        </div>
      </form>
    </section>
  )
}
