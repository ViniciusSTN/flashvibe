import { StepToCreateFlashcardComponentType } from '@/types/help'
import Image from 'next/image'

export const StepToCreateFlashcard: StepToCreateFlashcardComponentType = ({
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
        <p className="mb-1 text-xl font-bold">{number}</p>
        <p className="text-lg font-medium">{children}</p>
      </div>
    </div>
  )
}
