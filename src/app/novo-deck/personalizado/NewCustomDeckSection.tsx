import { EditCustomDeck } from '@/components/EditCustomDeck'
import { CustomDeckData } from '@/types/deck'

const initialData: CustomDeckData = {
  name: '',
  description: '',
  photo: null,
  colorPredefinition: 4,
  new: 3,
  learning: 15,
  reviewing: 2,
}

export const NewCustomDeckSection = () => {
  return (
    <section className="mx-auto my-24 min-h-screen-header max-w-1440px px-6 md:px-10">
      <EditCustomDeck
        initialData={initialData}
        situation="New"
        isPublic={false}
        favorite={false}
      />
    </section>
  )
}
