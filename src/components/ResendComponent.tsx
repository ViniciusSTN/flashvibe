import { resendCounterAtom } from '@/states'
import { ResetComponentType } from '@/types/resend'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'

export const ResendComponent: ResetComponentType = ({
  onClick,
  children,
  border = false,
}) => {
  const [counter, setCounter] = useRecoilState(resendCounterAtom)

  useEffect(() => {
    function callback() {
      if (counter > 0) setCounter((prevState) => prevState - 1)
    }

    const interval = setInterval(callback, 1000)

    return () => clearInterval(interval)
  }, [counter, setCounter])

  return (
    <div className="flex items-center gap-3 font-medium text-principal-blue">
      <span
        className={`flex h-11 w-11 items-center justify-center text-xl ${border && 'rounded border border-principal-blue'}`}
      >
        {counter}
      </span>
      <button
        disabled={counter > 0}
        className="disabled:cursor-not-allowed disabled:text-light-gray250"
        onClick={onClick}
      >
        {children}
      </button>
    </div>
  )
}
