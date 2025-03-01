import { HowToCreateFlashcards } from '@/components/HowToCreateFlashcards'
import { steps } from '@/mocks/stepsToCreateFlashcards'

export const HowToCreateFlashcardsSection = () => {
  return (
    <section className="mx-auto max-w-1440px px-6 py-16 md:px-10">
      <h2 className="mb-12 text-3xl font-bold md:text-center">
        <span>Como criar meus próprios </span>
        <span className="text-light-blue900">flashcards?</span>
      </h2>

      <HowToCreateFlashcards steps={steps} />
    </section>
  )
}
