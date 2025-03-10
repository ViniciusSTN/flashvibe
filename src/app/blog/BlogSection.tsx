'use client'

import { FeedbackButtons } from '@/components/FeedbackButtons'
import { SpinLoader } from '@/components/SpinLoader'
import { getAllBlogData, sendBlogDeslike, sendBlogLike } from '@/data/blog'
import { BlogDataType } from '@/types/blog'
import { useEffect, useState } from 'react'
import { FeedbackData } from '@/types/sendFeedbacks'
import { PostModal } from './PostModal'
import Image from 'next/image'

export const BlogSection = () => {
  const [blogData, setBlogData] = useState<BlogDataType[]>()
  const [loading, setLoading] = useState<boolean>(true)
  const [feedbacks, setFeedbacks] = useState<FeedbackData[]>([])
  const [postActive, setPostActive] = useState<BlogDataType | null>(null)

  useEffect(() => {
    const fetchBlogData = async () => {
      setLoading(true)

      const response = await getAllBlogData()

      if (response.success) {
        setBlogData(response.data)

        const feedbacks = response.data.map((feedback) => ({
          id: feedback.id,
          active: {
            liked: feedback.liked,
            desliked: feedback.desliked,
          },
          numbers: {
            like: feedback.likes,
            deslike: feedback.deslikes,
          },
        }))

        setFeedbacks(feedbacks)
      }

      setLoading(false)
    }

    fetchBlogData()
  }, [])

  const handleCommentsClick = async (post: BlogDataType) => {
    setPostActive(post)
  }

  return (
    <>
      {postActive && (
        <PostModal
          post={postActive}
          feedbacks={feedbacks}
          setFeedbacks={setFeedbacks}
          setPostActive={setPostActive}
        />
      )}

      <section className="mx-auto mb-24 mt-16 min-h-screen-header max-w-842px px-6 md:px-10">
        <h1 className="mb-10 text-center text-2xl font-semibold">Blog</h1>

        {loading && (
          <div className="relative mx-auto mt-24 flex w-full items-center justify-center">
            <SpinLoader />
          </div>
        )}

        {!loading && blogData && blogData.length === 0 && (
          <p className="text-center">Nenhum post encontrado</p>
        )}

        {blogData && blogData.length > 0 && (
          <ul className="flex flex-col gap-6">
            {blogData.map((post, index) => (
              <li
                key={index}
                className="border-y border-light-gray225 py-7 vsm:px-6 md:px-12"
              >
                <div className="mb-4 flex items-start gap-3">
                  <Image
                    src={post.authorImage}
                    alt={`Foto de perfil de ${post.author}`}
                    width={52}
                    height={52}
                    className="h-[52px] w-[52px] rounded-full"
                  />

                  <div className="flex flex-col items-start justify-between">
                    <p className="text-lg font-semibold">{post.author}</p>
                    <p className="font-medium text-light-gray500">
                      {post.date}
                    </p>
                  </div>
                </div>

                <p className="mb-4">{post.description}</p>

                <div className="mb-4">
                  <img
                    src={post.image}
                    alt="Ilustração da postagem"
                    className=""
                  />
                </div>

                <div className="flex flex-col flex-wrap items-center justify-between gap-3 vsm:flex-row">
                  <FeedbackButtons
                    postId={post.id}
                    callbacks={{ like: sendBlogLike, deslike: sendBlogDeslike }}
                    feedbacks={feedbacks}
                    setFeedbacks={setFeedbacks}
                  />

                  <button
                    className="text-nowrap text-lg font-medium"
                    onClick={() => handleCommentsClick(post)}
                  >
                    {post.comments} comentários
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </>
  )
}
