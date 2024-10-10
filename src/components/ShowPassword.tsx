import { showPasswordAtom } from '@/states'
import Image from 'next/image'
import { useRecoilState } from 'recoil'

export const ShowPassword = () => {
  const [showPassword, setShowPassword] = useRecoilState(showPasswordAtom)

  function handleShowPasswordClick(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    setShowPassword(!showPassword)
  }

  return (
    <button
      className="flex items-center gap-1 self-end"
      type="button"
      onClick={handleShowPasswordClick}
    >
      <span className="text-sm">
        {showPassword ? 'Esconder senha' : 'Ver senha'}
      </span>
      <Image
        src={
          showPassword
            ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/eye.svg?alt=media&token=813e59ce-db08-487c-9291-492980df70d0'
            : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/hide.svg?alt=media&token=db2bde40-7faa-4529-a569-77795e99fe7f'
        }
        alt="mostrar senha"
        height={16}
        width={16}
      />
    </button>
  )
}
