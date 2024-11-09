'use client'

import { createNewUserViaSocialMedia, createUserSession } from '@/data/userData'
import { auth } from '@/lib/firebase'
import { userEmailAtom } from '@/states'
import { CreateNewUserType } from '@/types/createNewUser'
import {
  AuthError,
  FacebookAuthProvider,
  getAdditionalUserInfo,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export type FacebookProfile = {
  first_name: string
  name: string
  picture: {
    data: {
      url: string
    }
  }
}

export type GoogleProfile = {
  given_name: string
  name: string
  picture: string
}

export const SocialMediaSignIn = () => {
  const router = useRouter()

  const setUserEmail = useSetRecoilState(userEmailAtom)

  const handleGoogleRegister = async () => {
    const googleProvider = new GoogleAuthProvider()
    createNewUser(googleProvider)
  }

  const handleFacebookLogin = async () => {
    const facebookProvider = new FacebookAuthProvider()
    createNewUser(facebookProvider)
  }

  const createNewUser: CreateNewUserType = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider)

      if (result) {
        const additionalUserInfo = getAdditionalUserInfo(result)

        if (additionalUserInfo) {
          const { isNewUser, providerId, profile } = additionalUserInfo
          const { displayName, email } = result.user

          if (isNewUser) {
            if (email) setUserEmail(email)

            const fullName =
              providerId === 'facebook.com' && profile
                ? (profile as FacebookProfile).name
                : providerId === 'google.com' && profile
                  ? (profile as GoogleProfile).name
                  : displayName || ''

            const nickName = `Usuário${Date.now()}`

            if (fullName && email) {
              const res = await createNewUserViaSocialMedia(
                fullName,
                nickName,
                email,
              )

              if (res.success) {
                toast.success('Cadastrado com sucesso')
                loginUser()
              } else {
                toast.error('Erro ao registrar')
              }
            }
          } else {
            loginUser()
          }
        }
      }
    } catch (error) {
      if (
        (error as AuthError).code ===
        'auth/account-exists-with-different-credential'
      ) {
        toast.warning('E-mail já está vinculado a outro método de login')
      } else {
        console.error('Erro ao fazer login: ', error)
      }
    }
  }

  const loginUser = async () => {
    try {
      const user = auth.currentUser
      if (user) {
        const token = await user.getIdToken()
        const email = user.email

        if (token && email) {
          const result = await createUserSession(token, email)

          if (result.success) {
            router.push('/')
          } else {
            console.error('Erro ao criar sessão do usuário:', result.error)
          }
        } else {
          console.error('Falha ao obter token ou email do usuário.')
        }
      } else {
        console.error('Usuário não autenticado. Por favor, faça login.')
      }
    } catch (error) {
      console.error('Erro ao obter token JWT ou iniciar sessão:', error)
    }
  }

  return (
    <>
      <button onClick={handleGoogleRegister}>
        <Image
          className="transition-all hover:scale-105"
          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/google-icon.svg?alt=media&token=c5a5060a-2bad-473a-b126-f63fe5a937cc"
          alt="fazer registro com google"
          height={40}
          width={40}
        />
      </button>
      <button onClick={handleFacebookLogin}>
        <Image
          className="transition-all hover:scale-105"
          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/icons8-facebook.svg?alt=media&token=4f134bb3-a925-4526-9939-68b9265bbaee"
          alt="fazer registro com facebook"
          height={48}
          width={48}
        />
      </button>
    </>
  )
}
