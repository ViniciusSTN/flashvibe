import { storage } from '@/lib/firebase'
import { SendUserPhotoInFirebaseType } from '@/types/apiResponse'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export const sendUserPhotoInFirebase: SendUserPhotoInFirebaseType = async (
  image,
  path,
) => {
  const uniqueFileName = `${Date.now()}-${image.name}`
  const storageRef = ref(storage, `${path}/${uniqueFileName}`)

  try {
    await uploadBytes(storageRef, image)
    const downloadURL = await getDownloadURL(storageRef)

    return {
      success: true,
      message: 'Imagem salva',
      link: downloadURL,
    }
  } catch (error) {
    console.error('Erro ao fazer upload da imagem:', error)
    return {
      success: false,
      error: ['Erro ao fazer upload da imagem'],
    }
  }
}
