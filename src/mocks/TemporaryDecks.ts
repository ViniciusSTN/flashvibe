import { DeckCardProps } from '@/types/deck'

export const decks: DeckCardProps[] = [
  {
    type: 'Custom deck',
    favorite: true,
    colorPredefinition: 4,
    title: 'My English frases with Friends',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/deck-image-example.png?alt=media&token=7905dc10-fde7-4729-a088-fb87c94e2683',
    situation: 'Learning',
    public: true,
    stars: 2.9,
    reviews: 150,
    lastModification: 1728432000000,
    flashcards: 150,
    new: 50,
    learning: 50,
    reviewing: 50,
    description: 'Deck de frases do seriado Friends',
    difficult: null,
  },
  {
    type: 'Custom deck',
    favorite: true,
    colorPredefinition: 5,
    title: 'My English words with Friends',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/deck-image-example.png?alt=media&token=7905dc10-fde7-4729-a088-fb87c94e2683',
    situation: 'Learning',
    public: false,
    stars: 5,
    reviews: 10,
    lastModification: 1727654400000,
    flashcards: 150,
    new: 50,
    learning: 50,
    reviewing: 50,
    description: 'Deck de frases do seriado Friends',
    difficult: null,
  },
  {
    type: 'Standard Deck',
    favorite: false,
    colorPredefinition: 1,
    title: 'Irregular verbs',
    difficult: 'Beginner',
    image:
      'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/deck-image-example.png?alt=media&token=7905dc10-fde7-4729-a088-fb87c94e2683',
    situation: 'Learning',
    public: true,
    stars: 4,
    reviews: 1500,
    lastModification: 1696896000000,
    flashcards: 1000,
    new: 900,
    learning: 50,
    reviewing: 50,
    description: 'Standard deck for beginners with irregular verbs',
  },
]
