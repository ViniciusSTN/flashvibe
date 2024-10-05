import { StepToCreateFlashcard } from '@/components/StepsToCreateFlashcard'
import { steps } from '@/mocks/stepsToCreateFlashcards'

export const HowToCreateFlashcardsSection = () => {
  return (
    <section className="mx-auto max-w-1440px px-6 py-16 md:px-10">
      <h2 className="mb-12 text-3xl font-bold md:text-center">
        <span>Como criar meus próprios </span>
        <span className="text-light-blue900">flashcards?</span>
      </h2>

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
    </section>
  )
}
