import { useEffect, useState } from 'react'
import { PostModalType, UserComment } from '@/types/blog'
import { FeedbackButtons } from '@/components/FeedbackButtons'
import {
  getAllCommentsData,
  sendBlogDeslike,
  sendBlogLike,
  sendNewPostComment,
} from '@/data/blog'
import { SpinLoader } from '@/components/SpinLoader'
import { TextAreaDefault } from '@/components/TextAreaDefault'
import { toast } from 'react-toastify'
import { postCommentSchema } from '@/schemas/blog'
import Image from 'next/image'

export const PostModal: PostModalType = ({
  post,
  feedbacks,
  setFeedbacks,
  setPostActive,
}) => {
  const [commentsLoading, setCommentsLoading] = useState<boolean>(true)
  const [newComment, setNewComment] = useState<string>('')
  const [newCommentLoading, setNewCommentLoading] = useState<boolean>(false)
  const [allComents, setAllComents] = useState<UserComment[]>([])

  useEffect(() => {
    const fetchComments = async () => {
      setCommentsLoading(true)

      const response = await getAllCommentsData(post.id)

      if (response.success) {
        setAllComents(response.data)
      } else {
        toast.error('Erro ao buscar comentários')
      }

      setCommentsLoading(false)
    }

    fetchComments()
  }, [post.id])

  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { value } = event.target
    setNewComment(value)
  }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    setNewCommentLoading(true)

    const validations = postCommentSchema.safeParse({ newComment })
    const error = validations.error?.formErrors.fieldErrors.newComment

    if (!validations.success && error) {
      toast.warn(error[0])
      setNewCommentLoading(false)
      return
    }

    const response = await sendNewPostComment(post.id, newComment)

    if (response.success) {
      const newCommentData: UserComment = {
        ...response.data,
        comment: newComment,
      }
      setAllComents((prevState) => [{ ...newCommentData }, ...prevState])
    }

    setNewCommentLoading(false)
  }

  return (
    <>
      <button
        className="pointer-events-auto fixed inset-0 z-50 bg-black opacity-50 transition-opacity"
        onClick={() => setPostActive(null)}
      ></button>

      <div className="fixed left-1/2 top-1/2 z-50 max-h-screen-header w-4/5 max-w-842px -translate-x-1/2 -translate-y-1/2 overflow-y-scroll border-y border-light-gray225 bg-white px-3 py-7 vsm:px-6 md:px-12">
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
            <p className="font-medium text-light-gray500">{post.date}</p>
          </div>
        </div>

        <p className="mb-4">{post.description}</p>

        <div className="mb-4 flex items-center justify-center">
          <img src={post.image} alt="Ilustração da postagem" className="" />
        </div>

        <div className="mb-6 flex flex-col flex-wrap items-center justify-between gap-3 vsm:flex-row">
          <FeedbackButtons
            postId={post.id}
            callbacks={{ like: sendBlogLike, deslike: sendBlogDeslike }}
            feedbacks={feedbacks}
            setFeedbacks={setFeedbacks}
          />

          <p className="text-nowrap text-lg font-medium">
            {post.comments} comentários
          </p>
        </div>

        <form
          action=""
          className="mb-6 flex justify-between gap-1 border-t border-light-gray225 bg-white pt-6"
          onSubmit={handleFormSubmit}
        >
          <TextAreaDefault
            value={newComment}
            name="newComment"
            disable={newCommentLoading}
            placeholder="Escreva um comentário"
            onChange={handleInputChange}
            tailwind="w-full"
          />

          <button
            type="submit"
            className="my-1 border border-light-gray200 px-2 font-medium"
            disabled={newCommentLoading}
          >
            {newCommentLoading ? 'Postando...' : 'Postar'}
          </button>
        </form>

        <div>
          {commentsLoading && (
            <div className="relative mx-auto flex w-full items-center justify-center">
              <SpinLoader />
            </div>
          )}

          {!commentsLoading && allComents.length > 0 && (
            <ul className="flex flex-col gap-5">
              {allComents.map((comment, index) => (
                <li key={index} className="flex gap-4">
                  <Image
                    src={comment.userImage}
                    alt="Foto do usuário"
                    width={40}
                    height={40}
                    className="h-10 w-10 rounded-full"
                  />

                  <div className="rounded-lg bg-light-blue200 px-4 py-2">
                    <p className="mb-1 font-semibold">{comment.userName}</p>

                    <p>{comment.comment}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  )
}
