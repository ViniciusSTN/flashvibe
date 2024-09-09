import { initializeApp } from 'firebase/app'
import { getStorage, ref, getDownloadURL } from 'firebase/storage'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASUREMENT_ID,
}

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app)

// Função para recuperar o URL de uma imagem no Storage
export async function getImageUrl(imagePath: string) {
  const imageRef = ref(storage, imagePath) // Caminho da imagem no Storage
  try {
    const url = await getDownloadURL(imageRef)
    return url
  } catch (error) {
    console.error('Erro ao recuperar a imagem: ', error)
    return null
  }
}
