import { ButtonDefault } from '@/components/ButtonDefault'
import { OrderByDefault } from '@/components/OrderByDefault'
import { SearchInputDefault } from '@/components/SearchInputDefault'
import { discussionOrderBy } from '@/mocks/orderBy'
import { orderByAtom, searchAtom } from '@/states'
import { DiscussionHeaderType } from '@/types/discussions'
import { useRecoilState, useSetRecoilState } from 'recoil'

export const DiscussionHeader: DiscussionHeaderType = ({ totalPosts }) => {
  const [orderBy, setOrderBy] = useRecoilState(orderByAtom)
  const setSearch = useSetRecoilState(searchAtom)

  return (
    <div className="mb-8">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Fórum de discussões
      </h1>

      <div className="mb-8 flex flex-wrap items-center justify-between gap-6">
        <OrderByDefault
          options={discussionOrderBy}
          activeOrder={orderBy}
          setActiveOrder={setOrderBy}
        />

        <div className="grow md:grow-0">
          <SearchInputDefault setSearch={setSearch} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <p className="text-md font-medium">
          <span>{totalPosts}</span>
          <span> tópicos</span>
        </p>

        <ButtonDefault
          text="Iniciar discussão"
          type="link"
          link="/nova-discussao"
          radius="rounded-md"
          paddingx="px-10"
          paddingy="py-2"
        />
      </div>
    </div>
  )
}
