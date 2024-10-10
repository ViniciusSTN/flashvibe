import { colorClasses } from '@/mocks/deckColors'
import { DeckCardType } from '@/types/deck'
import Image from 'next/image'

export const DeckCard: DeckCardType = ({
  type,
  favorite,
  colorPredefinition: color,
  title,
  difficult,
  image,
  situation,
  public: isPublic,
  stars,
  reviews,
}) => {
  return (
    <li>
      <div className={`relative ${colorClasses[color]?.dark}`}>
        <p>{type}</p>
        <span></span>
        <Image
          src={
            favorite
              ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/favorited.svg?alt=media&token=63b0a27a-0e5f-40d2-930e-368000967448'
              : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/notfavorited.svg?alt=media&token=bbc1575e-f77d-4def-adce-725d5e889a86'
          }
          alt="favoritado"
          width={40}
          height={40}
        />
      </div>

      <div className={`${colorClasses[color]?.light} p-3`}>
        <div className="rounded-2xl bg-white">
          {stars && (
            <div className="flex">
              <p>{stars}</p>

              <div className="flex gap-1">
                {Array.from({ length: Math.floor(stars) }).map((_, index) => (
                  <Image
                    key={index}
                    src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/star.svg?alt=media&token=2a7b7e53-ad74-4bd1-bd3a-428c034e6469"
                    alt="estrela"
                    width={16}
                    height={16}
                  />
                ))}

                {!Number.isInteger(stars) && (
                  <Image
                    src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/half-star.svg?alt=media&token=ea1435a9-5bd2-41d9-a2aa-6d63f673fc25"
                    alt="meia estrela"
                    width={16}
                    height={16}
                  />
                )}

                {5 - Math.ceil(stars) > 0 &&
                  Array.from({
                    length: 5 - Math.ceil(stars),
                  }).map((_, index) => (
                    <Image
                      key={`empty-${index}`}
                      src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/empty-star.svg?alt=media&token=8087f02a-bb31-4514-a518-c7ec5d4855cb"
                      alt="estrela vazia"
                      width={16}
                      height={16}
                    />
                  ))}
              </div>

              <p>{reviews} reviews</p>
            </div>
          )}

          <div>
            <h2>{title}</h2>
            {difficult && <p>{difficult}</p>}
          </div>

          <div>
            <Image src={image} alt="Capa do deck" height={192} width={192} />
          </div>

          <div>
            <p>{situation}</p>
            <Image
              src={
                isPublic
                  ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/public.svg?alt=media&token=177b2d1a-ff07-4274-83cb-3e90e517fb6b'
                  : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/private.svg?alt=media&token=8d72a3bc-b00e-4835-a954-32a2b084f2aa'
              }
              alt={isPublic ? 'público' : 'privado'}
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </li>
  )
}
