import { UserIconDefault } from '@/components/UserIconDefault'
import { TopicAreaType } from '@/types/discussions'
import { useState } from 'react'
import Image from 'next/image'
import { imageModalAtom } from '@/states'
import { useRecoilState } from 'recoil'
import { ImageModal } from '@/components/ImageModal'

export const TopicArea: TopicAreaType = ({
  title,
  description,
  images,
  userName,
  userImage,
  likes,
}) => {
  const [likeClicked, setLikeClicked] = useState<boolean>(false)
  const [likeLoader, serLikeLoader] = useState<boolean>(false)

  const [activeImage, setActiveImage] = useRecoilState(imageModalAtom)

  const handleLikeClick = async () => {
    serLikeLoader(true)

    setLikeClicked(!likeClicked)

    // enviar requisição para o back end adicionar

    serLikeLoader(false)
  }

  return (
    <>
      {activeImage.active && <ImageModal />}

      <div className="mb-8 border-y border-light-gray225 px-8 pb-6 pt-8">
        <h2 className="mb-4 text-center text-lg font-semibold capitalize">
          {title}
        </h2>

        <p className="mb-4 capitalize">{description}</p>

        {images.length > 0 && (
          <ul className="mb-4 grid grid-cols-2 gap-4 vsm:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
            {images.map((image, index) => (
              <li key={index} className="flex items-center justify-center">
                <button
                  className="flex w-full items-center justify-center"
                  onClick={() => setActiveImage({ link: image, active: true })}
                >
                  <img
                    src={image}
                    alt="Imagem de exemplo"
                    className="w-full max-w-48 object-cover object-center"
                  />
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-center justify-between">
          <UserIconDefault userName={userName} userImage={userImage} />

          <div className="flex items-center justify-center gap-1">
            <button onClick={handleLikeClick} disabled={likeLoader}>
              <Image
                src={
                  likeClicked
                    ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com-blue.svg?alt=media&token=7a69ec98-ef16-429d-8031-4c73b1c0c9c0'
                    : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/like-svgrepo-com.svg?alt=media&token=3b672516-42a3-47c8-b06d-f6790b6d471a'
                }
                alt="Curtir discussão"
                width={24}
                height={24}
                className="h-6 w-6"
              />
            </button>

            {!likeLoader && likeClicked ? (
              <span className="text-xl font-medium text-secondary-blue">
                {likes + 1}
              </span>
            ) : (
              <span className="text-xl font-medium">{likes}</span>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
