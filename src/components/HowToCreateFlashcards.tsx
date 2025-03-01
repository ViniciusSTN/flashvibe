import { HowToCreateFlashcardsType } from '@/types/help'
import { StepToCreateFlashcard } from './StepsToCreateFlashcard'

export const HowToCreateFlashcards: HowToCreateFlashcardsType = ({ steps }) => {
  return (
    <div className="mx-auto grid grid-cols-1 gap-x-3 gap-y-8 md:grid-cols-2 1.5xl:gap-x-6">
      {steps.map((step, index) => (
        <StepToCreateFlashcard
          key={index}
          image={step.image}
          number={step.number}
          alt={step.alt}
        >
          {step.text}
        </StepToCreateFlashcard>
      ))}
    </div>
  )
}
