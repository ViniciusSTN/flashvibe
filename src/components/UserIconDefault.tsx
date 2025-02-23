import { UserIconDefaultType } from '@/types/userIconDefault'
import Image from 'next/image'

export const UserIconDefault: UserIconDefaultType = ({
  userName,
  userImage,
}) => {
  return (
    <div className="flex items-center gap-3">
      <span>
        <Image
          src={userImage}
          alt="Foto do usuário"
          width={42}
          height={42}
          className="h-[42px] w-[42px] rounded-full"
        />
      </span>
      <p className="font-semibold">{userName}</p>
    </div>
  )
}
