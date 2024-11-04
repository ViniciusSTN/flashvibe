import { ListedFlashcardType } from '@/types/flashcard'

export const ListedFlashcard: ListedFlashcardType = ({
  front,
  keyword,
  onClick,
  disabled,
}) => {
  const words = front
    .split(new RegExp(`(${keyword})`, 'gi'))
    .map((part, index) =>
      part.toLowerCase() === keyword.toLowerCase() ? (
        <span key={index} className="text-keyword">
          {part}
        </span>
      ) : (
        <span key={index}>{part}</span>
      ),
    )

  return (
    <button
      className="flex h-[200px] w-[246px] items-center justify-center border border-light-gray225 p-3 text-center transition hover:scale-[1.02]"
      onClick={onClick}
      disabled={disabled}
    >
      <p>{words}</p>
    </button>
  )
}
