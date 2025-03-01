import { HowToCreateFlashcards } from '@/components/HowToCreateFlashcards'
import { steps } from '@/mocks/stepsToCreateFlashcards'

export const HowToCreateFlashcardsSection = () => {
  return (
    <section className="mb-24">
      <h2 className="mb-10 text-center text-xl font-semibold">
        Como criar meus próprios{' '}
        <span className="text-principal-blue">flashcards?</span>
      </h2>

      <div className="mx-auto mb-10 aspect-video w-full">
        <iframe
          className="h-full w-full rounded-xl md:rounded-3xl"
          src="https://www.youtube.com/embed/CtvKiTv6MWw?si=H1CB_yS2_S9mRFpr"
          title="YouTube video player"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        ></iframe>
      </div>

      <HowToCreateFlashcards steps={steps} />
    </section>
  )
}
