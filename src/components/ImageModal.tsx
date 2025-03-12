import { imageModalAtom } from '@/states'
import { useRecoilState } from 'recoil'

export const ImageModal = () => {
  const [activeImage, setActiveImage] = useRecoilState(imageModalAtom)

  return (
    <>
      <button
        className={`fixed inset-0 z-50 bg-black transition-opacity ${
          !activeImage.active
            ? 'pointer-events-none opacity-0'
            : 'pointer-events-auto opacity-50'
        }`}
        onClick={() => setActiveImage({ link: '', active: false })}
      ></button>

      <div className="fixed left-1/2 top-1/2 z-50 max-h-screen w-4/5 max-w-718px -translate-x-1/2 -translate-y-1/2 bg-white p-6 vsm:p-8 md:p-12">
        <button
          className="absolute right-2 top-2"
          onClick={() => setActiveImage({ active: false, link: '' })}
        >
          <img
            src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
            alt="Fechar imagem"
            className="h-8 w-8"
          />
        </button>

        <div className="flex h-full w-full items-center justify-center">
          <img
            src={activeImage.link}
            alt="Imagem em tela cheia da discussão"
            className="h-full max-h-screen-modal w-full object-cover object-center"
          />
        </div>
      </div>
    </>
  )
}
