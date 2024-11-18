import { storage } from '@/lib/firebase'
import {
  SendManyUserPhotosInFirebaseType,
  SendUserPhotoInFirebaseType,
} from '@/types/apiResponse'
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

export const sendManyUserPhotosInFirebase: SendManyUserPhotosInFirebaseType =
  async (images, path) => {
    try {
      const links: string[] = []

      for (const image of images) {
        const uniqueFileName = `${Date.now()}-${image.name}`
        const storageRef = ref(storage, `${path}/${uniqueFileName}`)

        await uploadBytes(storageRef, image)

        const downloadURL = await getDownloadURL(storageRef)
        links.push(downloadURL)
      }

      return {
        success: true,
        message: 'Todas as imagens foram salvas com sucesso',
        links,
      }
    } catch (error) {
      console.error('Erro ao fazer upload das imagens:', error)
      return {
        success: false,
        error: ['Erro ao fazer upload das imagens'],
      }
    }
  }
