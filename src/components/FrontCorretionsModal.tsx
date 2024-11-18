import { FrontCorretionsModalType } from '@/types/flashcard'

export const FrontCorretionsModal: FrontCorretionsModalType = ({
  corrections,
  front,
}) => {
  return (
    <div className="fixed left-1/2 top-1/2 z-50 w-[80%] max-w-464px -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-8 shadow-very-clean">
      <h3 className="mb-6 text-center text-xl font-medium">
        Correção do Front
      </h3>

      <p className="mb-8 text-center italic text-light-gray500">{front}</p>

      <p className="mb-4 text-center">Sugestões de correções</p>

      <p className="text-center">
        {corrections.map((correction, index) => (
          <span key={index} className="border-x border-light-gray250 px-2 py-1">
            {correction.replacement}
          </span>
        ))}
      </p>
    </div>
  )
}
