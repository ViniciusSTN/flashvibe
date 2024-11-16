import { colorClasses } from '@/mocks/deckColors'
import { deckActiveAtom } from '@/states/atoms/deckActive'
import { DeckCardType } from '@/types/deck'
import Image from 'next/image'
import { useSetRecoilState } from 'recoil'

export const DeckCard: DeckCardType = ({ disabled = false, ...props }) => {
  const setDeckActive = useSetRecoilState(deckActiveAtom)

  const restProps = { ...props }

  return (
    <button
      className="w-[260px] shadow-clean transition hover:scale-[1.02] hover:cursor-pointer"
      disabled={disabled}
      onClick={(event) => {
        event.preventDefault()
        if (!disabled) setDeckActive({ ...restProps })
      }}
    >
      <div
        className={`relative ${colorClasses[props.colorPredefinition]?.dark} flex items-center justify-between px-3 pb-3 pt-2`}
      >
        <p className="max-w-[69px] text-start text-sm font-semibold italic text-white">
          {props.type}
        </p>
        <span className="absolute bottom-3 left-1/2 h-3 w-[88px] -translate-x-1/2 rounded-full bg-white before:absolute before:bottom-3 before:left-1/2 before:-translate-x-1/2 before:border-b-[20px] before:border-l-[40px] before:border-r-[40px] before:border-b-white before:border-l-transparent before:border-r-transparent"></span>
        <Image
          src={
            props.favorite
              ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/favorited.svg?alt=media&token=63b0a27a-0e5f-40d2-930e-368000967448'
              : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/notfavorited.svg?alt=media&token=bbc1575e-f77d-4def-adce-725d5e889a86'
          }
          alt="favoritado"
          width={24}
          height={24}
          className="h-6 w-6"
          priority
        />
      </div>

      <div className={`${colorClasses[props.colorPredefinition]?.light} p-3`}>
        <div className="relative h-[341px] rounded-2xl bg-white py-2">
          {props.stars !== null && props.reviews !== null && (
            <div className="absolute flex w-full items-center justify-between px-2">
              <div className="flex gap-2">
                <p className="font-medium">{props.stars.toFixed(1)}</p>
                <div className="mt-[2px] flex gap-1">
                  {Array.from({ length: Math.floor(props.stars) }).map(
                    (_, index) => (
                      <Image
                        key={index}
                        src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/star.svg?alt=media&token=2a7b7e53-ad74-4bd1-bd3a-428c034e6469"
                        alt="estrela"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    ),
                  )}

                  {!Number.isInteger(props.stars) && (
                    <Image
                      src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/half-star.svg?alt=media&token=ea1435a9-5bd2-41d9-a2aa-6d63f673fc25"
                      alt="meia estrela"
                      width={16}
                      height={16}
                      className="h-4 w-4"
                    />
                  )}

                  {5 - Math.ceil(props.stars) > 0 &&
                    Array.from({
                      length: 5 - Math.ceil(props.stars),
                    }).map((_, index) => (
                      <Image
                        key={`empty-${index}`}
                        src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/empty-star.svg?alt=media&token=8087f02a-bb31-4514-a518-c7ec5d4855cb"
                        alt="estrela vazia"
                        width={16}
                        height={16}
                        className="h-4 w-4"
                      />
                    ))}
                </div>
              </div>

              <p className="mb-[2px] flex gap-1 text-sm">
                <span>
                  {props.reviews && props.reviews >= 1000
                    ? `${(props.reviews / 1000).toFixed(1)}k`
                    : props.reviews}
                </span>
                <span>reviews</span>
              </p>
            </div>
          )}

          <div className="mt-9 text-center">
            <h2 className="max-h-14 overflow-hidden px-4 text-xl font-bold">
              {props.title}
            </h2>
            {props.difficult && (
              <p className="absolute left-1/2 -translate-x-1/2 font-semibold italic text-secondary-blue">
                {props.difficult}
              </p>
            )}
          </div>

          <div className="absolute bottom-10 left-1/2 h-40 w-40 -translate-x-1/2">
            <Image
              src={
                props.image.length > 0
                  ? props.image
                  : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo192x192.svg?alt=media&token=39af92c2-bc6d-46bd-b619-eaceed2f1e8b'
              }
              alt="Capa do deck"
              height={192}
              width={192}
              className="h-full w-full object-cover object-center"
              priority
            />
          </div>

          <div>
            <p className="absolute bottom-2 left-2 text-sm font-medium text-light-gray500">
              {props.situation}
            </p>
            <Image
              src={
                props.public
                  ? 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/public.svg?alt=media&token=177b2d1a-ff07-4274-83cb-3e90e517fb6b'
                  : 'https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/private.svg?alt=media&token=8d72a3bc-b00e-4835-a954-32a2b084f2aa'
              }
              alt={props.public ? 'público' : 'privado'}
              width={20}
              height={20}
              className="absolute bottom-2 right-2 h-5 w-5"
            />
          </div>
        </div>
      </div>
    </button>
  )
}
