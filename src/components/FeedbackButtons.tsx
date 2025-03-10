import { useState } from 'react'
import { toast } from 'react-toastify'
import { FeedbackButtonsProps } from '@/types/sendFeedbacks'
import Image from 'next/image'

export const FeedbackButtons = <T,>({
  postId,
  feedbacks,
  setFeedbacks,
  callbacks,
}: FeedbackButtonsProps<T>) => {
  const [loading, setLoading] = useState<boolean>(false)

  const handleLikeClick = async (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    if (loading) return
    setLoading(true)

    const { name } = event.currentTarget
    const isLike = name === 'like'
    const isDeslike = name === 'deslike'

    const response = await (isLike
      ? callbacks.like(postId)
      : callbacks.deslike(postId))

    if (!response.success) {
      toast.error('Erro ao enviar feedback')
      setLoading(false)
      return
    }

    const toggledState = response.active
    let newFeedbacks = { liked: false, desliked: false }

    const feedback = feedbacks.find((feedback) => feedback.id === postId)

    if (!feedback) return

    if (toggledState) {
      if (isLike && feedback.active.desliked) {
        const deslikeResponse = await callbacks.deslike(postId)
        if (deslikeResponse.success && !deslikeResponse.active) {
          newFeedbacks = { liked: true, desliked: false }
        }
      } else if (isDeslike && feedback.active.liked) {
        const likeResponse = await callbacks.like(postId)
        if (likeResponse.success && !likeResponse.active) {
          newFeedbacks = { liked: false, desliked: true }
        }
      } else {
        newFeedbacks = { liked: isLike, desliked: isDeslike }
      }
    }

    const prevFeedbacks = [...feedbacks]
    const updatedFeedbacks = prevFeedbacks.map((feedback) =>
      feedback.id === postId ? { ...feedback, active: newFeedbacks } : feedback,
    )

    setFeedbacks(updatedFeedbacks)
    setLoading(false)
  }

  const images = {
    like: {
      default:
        'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com.svg?alt=media&token=3b672516-42a3-47c8-b06d-f6790b6d471a',
      active:
        'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com-blue.svg?alt=media&token=7a69ec98-ef16-429d-8031-4c73b1c0c9c0',
    },
    deslike: {
      default:
        'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/deslike.svg?alt=media&token=1bd87182-10b4-4f35-a2a2-8b3ece0291d4',
      active:
        'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/active-deslike.svg?alt=media&token=c41ad7c7-911c-44c6-bf4a-247db160c3eb',
    },
  }

  const feedback = feedbacks.find((fb) => fb.id === postId)
  if (!feedback) return

  return (
    <div className="flex gap-3 vsm:gap-6">
      <button
        onClick={handleLikeClick}
        name="like"
        disabled={loading}
        className="flex items-center justify-center gap-1"
      >
        <Image
          src={feedback.active.liked ? images.like.active : images.like.default}
          alt="Curtir discussão"
          width={24}
          height={24}
          className="h-6 w-6"
        />

        {feedback.active.liked ? (
          <span className="text-xl font-medium text-secondary-blue">
            {feedback.numbers.like + 1}
          </span>
        ) : (
          <span className="text-xl font-medium">{feedback.numbers.like}</span>
        )}
      </button>

      <button
        onClick={handleLikeClick}
        name="deslike"
        disabled={loading}
        className="flex items-center justify-center gap-1"
      >
        <Image
          src={
            feedback.active.desliked
              ? images.deslike.active
              : images.deslike.default
          }
          alt="Não curtir discussão"
          width={24}
          height={24}
          className="h-6 w-6"
        />

        {feedback.active.desliked ? (
          <span className="text-xl font-medium text-secondary-blue">
            {feedback.numbers.deslike + 1}
          </span>
        ) : (
          <span className="text-xl font-medium">
            {feedback.numbers.deslike}
          </span>
        )}
      </button>
    </div>
  )
}
