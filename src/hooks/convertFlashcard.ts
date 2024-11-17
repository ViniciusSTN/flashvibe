// import { useCallback } from 'react'
// import { FlashcardDataType, FlashcardModalType } from '@/types/flashcard'

// const useConvertFlashcard = () => {
//   const convertToFlashcardModal = useCallback(
//     (flashcard: FlashcardDataType): FlashcardModalType => {
//       return {
//         ...flashcard,
//         mainPhrase: flashcard.front, // Usando 'front' como 'mainPhrase'
//         turned: false,
//         pronunciations:
//           flashcard.pronunciations?.map((audioUrl) => ({
//             audioUrl,
//             voiceName: '', // Ajuste conforme necessário
//             sex: '', // Ajuste conforme necessário
//             country: '', // Ajuste conforme necessário
//           })) || [],
//         examples:
//           flashcard.examples.map((textExample, index) => ({
//             id: index, // Usando o índice como 'id', se necessário
//             textExample,
//           })) || [],
//         translations:
//           flashcard.translations?.map((textTranslation, index) => ({
//             id: index, // Usando o índice como 'id', se necessário
//             textTranslation,
//           })) || [],
//       }
//     },
//     [],
//   )

//   return convertToFlashcardModal
// }

// export default useConvertFlashcard
