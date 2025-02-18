'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import { DiscussionHeader } from './DiscussionHeader'
import { getAllDiscussions } from '@/data/discussions'
import { DiscussionCardType, DiscussionsOrderBy } from '@/types/discussions'
import { SpinLoader } from '@/components/SpinLoader'
import { useRouter, useSearchParams } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import { orderByAtom, searchAtom } from '@/states'
import usePagination from '@/hooks/pagination'
import Link from 'next/link'

export const DiscussionSection = () => {
  const searchParams = useSearchParams()
  const router = useRouter()

  const getPage = useCallback(() => {
    return searchParams.get('pag')
  }, [searchParams])

  const [loading, setLoading] = useState<boolean>(true)
  const [amountPages, setAmountPages] = useState<number>(0)
  const [totalPosts, setTotalPosts] = useState<number>(0)
  const [pageActive, setPageActive] = useState<number>(Number(getPage()))
  const [discussions, setDiscussions] = useState<DiscussionCardType[] | null>(
    null,
  )

  const orderBy = useRecoilValue(orderByAtom)
  const search = useRecoilValue(searchAtom)

  const page = useMemo(() => searchParams.get('pag') || null, [searchParams])

  const paginationButtons = usePagination(amountPages, pageActive)

  function handlePageButtonClick(page: number) {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('pag', page.toString())

    setPageActive(page)
    router.push(`/forum-de-discussoes?${queryParams.toString()}`)
  }

  useEffect(() => {
    const queryParams = new URLSearchParams(searchParams)
    queryParams.set('orderBy', orderBy.value)

    router.push(`/forum-de-discussoes?${queryParams.toString()}`)
  }, [orderBy, router, searchParams])

  useEffect(() => {
    if (!page) return

    const fetchDiscussions = async () => {
      setLoading(true)
      setAmountPages(0)

      const response = await getAllDiscussions(
        Number(page),
        orderBy.value as DiscussionsOrderBy,
        search,
      )

      if (response.success) {
        setDiscussions(response.discussions)
        setAmountPages(response.totalPages)
        setTotalPosts(response.totalDiscussions)
      } else {
        setDiscussions([])
      }

      setLoading(false)
    }
    fetchDiscussions()
  }, [page, orderBy, search])

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-1440px px-6 md:px-10">
      <DiscussionHeader totalPosts={totalPosts} />

      {loading && (
        <div className="relative mt-16 flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loading && discussions?.length === 0 && (
        <div className="mt-16 text-center text-lg font-medium">
          Nenhuma discussão encontrada
        </div>
      )}

      {!loading && discussions && discussions.length > 0 && (
        <ul className="divide-y divide-light-gray250 border-y border-light-gray250">
          {discussions.map((discussion) => (
            <li key={discussion.id}>
              <Link href={`forum-de-discussoes/${discussion.id}`}>
                <div className="flex flex-col gap-3 pb-3 pt-8">
                  <h2 className="text-xl font-semibold">{discussion.title}</h2>

                  <p className="line-clamp-2">{discussion.description}</p>

                  <div className="ml-auto flex gap-3 font-medium text-light-gray250 sm:gap-4 md:gap-8">
                    <p>{discussion.likes} curtidas</p>
                    <p>{discussion.answers} respostas</p>
                    <p>{discussion.views} visualizações</p>
                  </div>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {paginationButtons.length > 1 && (
        <div className="mt-10 flex justify-center gap-1 sm:gap-2">
          {paginationButtons.map((text, index) => (
            <button
              className={`h-10 w-10 rounded-lg text-xl font-medium text-white hover:scale-[1.02] ${
                pageActive === text ? 'bg-light-blue900' : 'bg-secondary-blue'
              }`}
              key={index}
              disabled={text === '...'}
              onClick={() => handlePageButtonClick(Number(text))}
            >
              {text}
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
