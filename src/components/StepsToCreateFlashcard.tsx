import { StepToCreateFlashcardType } from '@/types/home'
import Image from 'next/image'

export const StepToCreateFlashcard: StepToCreateFlashcardType = ({
  image,
  alt,
  number,
  children,
}) => {
  return (
    <div className="flex gap-3">
      <div className="flex h-[66px] w-[66px] flex-shrink-0 items-center justify-center bg-light-blue200 p-2">
        <Image src={image} alt={alt} width={60} height={60} />
      </div>

      <div>
        <p className="mb-1 text-2xl font-bold">{number}</p>
        <p className="text-xl font-medium">{children}</p>
      </div>
    </div>
  )
}
