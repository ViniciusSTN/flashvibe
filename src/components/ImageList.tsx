import { ImageListType } from '@/types/imageList'
import Image from 'next/image'

export const ImageList: ImageListType = ({
  images,
  setImagePreviews,
  setFormData,
}) => {
  const handleDeleteImage = (indexToRemove: number) => {
    setImagePreviews((prev) => {
      URL.revokeObjectURL(prev[indexToRemove])
      return prev.filter((_, index) => index !== indexToRemove)
    })

    setFormData((prevState) => ({
      ...prevState,
      images: prevState.images.filter((_, index) => index !== indexToRemove),
    }))
  }

  return (
    <ul className="grid grid-cols-2 gap-4 vsm:grid-cols-3 md:grid-cols-5">
      {images.map((image, index) => (
        <li key={index} className="relative flex items-center justify-center">
          <button onClick={() => handleDeleteImage(index)} type="button">
            <img
              src={image}
              alt={`anexo ${index + 1}`}
              className="h-[125px] w-[125px] object-cover object-center"
              width={125}
              height={125}
            />

            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/close-svgrepo-com.svg?alt=media&token=f5a52b8f-6f12-4716-a4ab-91201310fc4d"
              alt={`excluir imagem ${index + 1}`}
              width={48}
              height={48}
              className="absolute left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 opacity-55"
            />
          </button>
        </li>
      ))}
    </ul>
  )
}
