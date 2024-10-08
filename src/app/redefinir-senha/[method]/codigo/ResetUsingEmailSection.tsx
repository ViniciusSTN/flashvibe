import { ResendComponent } from '@/components/ResendComponent'
import { resendCounterAtom, userEmailAtom } from '@/states'
import Link from 'next/link'
import { useRecoilValue, useSetRecoilState } from 'recoil'

export const CodeToResetUsingEmailSection = () => {
  const setResendCounter = useSetRecoilState(resendCounterAtom)

  const userEmail = useRecoilValue(userEmailAtom)

  function handleResendClick() {
    setResendCounter(60)
  }

  return (
    <section className="flex grow flex-col items-center justify-center px-6 py-32">
      <h1 className="mb-8 text-3xl font-bold text-principal-blue">
        Redefinir senha
      </h1>
      <p className="mb-14 max-w-530px text-center font-medium">
        Enviamos um e-mail para
        <span className="italic"> {userEmail} </span>
        contendo um link para redefinição de senha
      </p>

      <div className="mb-14 flex justify-center">
        <ResendComponent onClick={handleResendClick}>
          Reenviar e-mail
        </ResendComponent>
      </div>

      <Link
        href={'/redefinir-senha/sms'}
        className="font-medium text-principal-blue"
      >
        Redefinir usando celular
      </Link>
    </section>
  )
}
