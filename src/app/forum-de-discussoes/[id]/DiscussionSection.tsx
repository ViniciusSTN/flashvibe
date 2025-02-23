'use client'

import { SpinLoader } from '@/components/SpinLoader'
import { getDiscussionData } from '@/data/discussions'
import { DiscussionType } from '@/types/discussions'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { TopicArea } from './TopicArea'
import { AnswersArea } from './AnswersArea'
import { useRecoilValue } from 'recoil'
import { orderByAtom } from '@/states'

export const DiscussionSection = () => {
  const [loader, setLoader] = useState<boolean>(true)
  const [discussionData, setDiscussionData] = useState<DiscussionType>()
  const activeOrderBy = useRecoilValue(orderByAtom)

  const pathname = usePathname()

  const parts = pathname.split('/')
  const index = parts.indexOf('forum-de-discussoes')
  const id = Number(parts[index + 1])

  useEffect(() => {
    const fetchDiscussion = async (id: number) => {
      setLoader(true)

      const response = await getDiscussionData(id, activeOrderBy.value)

      if (response.success) {
        setDiscussionData(response.data)
      } else {
        toast.warn('Não foi possível encontrar a discussão')
      }

      setLoader(false)
    }

    if (index !== -1 && id) fetchDiscussion(id)
  }, [pathname, id, index, activeOrderBy])

  return (
    <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-1440px px-6 md:px-10">
      <h1 className="mb-10 text-center text-2xl font-semibold">
        Fórum de discussões
      </h1>

      {loader && (
        <div className="relative flex items-center justify-center">
          <SpinLoader />
        </div>
      )}

      {!loader && !discussionData && (
        <p className="text-center">Não foi possível encontrar essa discussão</p>
      )}

      {!loader && discussionData && (
        <>
          <TopicArea
            title={discussionData.title}
            description={discussionData.description}
            images={discussionData.images}
            userImage={discussionData.userImage}
            userName={discussionData.userName}
            likes={discussionData.likes}
          />

          <AnswersArea
            answers={discussionData.answers}
            title={discussionData.title}
          />
        </>
      )}
    </section>
  )
}
