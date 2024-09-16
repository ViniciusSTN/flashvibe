'use client'

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
import { toast } from 'react-toastify'
import { useSetRecoilState } from 'recoil'

export const SocialMediaSignIn = () => {
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
          const isNewUser = additionalUserInfo.isNewUser
          if (isNewUser) {
            const { displayName, email } = result.user

            if (email) setUserEmail(email)

            console.log(displayName?.split(' ')[0], email)
            // enviar dados para o backend criar um novo registro no BD
            // enviar dados para o backend logar o usuário
            // redirecionar para a home e mostrar um toast de sucesso
          } else {
            // enviar dados para o backend logar o usuário
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
