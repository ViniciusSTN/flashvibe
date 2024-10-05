export const LearnSection = () => {
  return (
    <section className="book-shelf-paralax relative flex h-dvh w-full items-center justify-center px-6">
      <div className="absolute inset-0 z-10 bg-black opacity-70"></div>
      <div className="absolute z-20 flex max-w-420px flex-col items-center justify-center gap-4 text-white">
        <h2 className="max-w-272px text-center text-3xl font-bold">
          Aprenda rápido, domine fácil!
        </h2>
        <p className="text-center font-semibold italic">
          Pratique inglês usando flashcards em qualquer lugar, a qualquer
          momento
        </p>
      </div>
    </section>
  )
}
