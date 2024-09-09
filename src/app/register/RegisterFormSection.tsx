'use client'

import { ButtonDefault } from '@/components/ButtonDefault'
import { InputDefault } from '@/components/InputDefault'
import { inputs } from '@/mocks/registerForm'
import Image from 'next/image'

export const RegisterFormSection = () => {
  return (
    <section className="flex grow items-center justify-center px-6 py-10">
      <div className="flex w-full max-w-96 flex-col gap-3">
        <h1 className="text-center text-2xl font-bold text-principal-blue">
          Criar uma conta
        </h1>

        <form action="" className="flex w-full flex-col self-center">
          {inputs.map((data) => (
            <InputDefault
              key={data.placeholder}
              placeholder={data.placeholder}
              image={data.image}
              type="text"
              tailwind="mb-3"
            />
          ))}

          <button
            className="mb-6 flex items-center gap-1 self-end"
            type="submit"
          >
            <span className="text-sm">Ver senha</span>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/eye.svg?alt=media&token=813e59ce-db08-487c-9291-492980df70d0"
              alt="show passsword"
              height={16}
              width={16}
            />
          </button>

          <div className="flex justify-center">
            <ButtonDefault
              text="Cadastrar"
              type="button"
              style="dark"
              radius="rounded-2xl"
              paddingx="px-10"
              paddingy="py-1"
              shadow
            />
          </div>
        </form>

        <p className="my-5 flex items-center justify-center text-light-gray225 before:mr-4 before:inline-block before:h-px before:w-full before:max-w-24 before:bg-light-gray225 before:content-[''] after:ml-3 after:inline-block after:h-px after:w-full after:max-w-24 after:bg-light-gray225 after:content-['']">
          ou
        </p>

        <div className="flex items-center justify-center gap-8">
          <button>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/google-icon.svg?alt=media&token=c5a5060a-2bad-473a-b126-f63fe5a937cc"
              alt="google logo"
              height={40}
              width={40}
            />
          </button>

          <button>
            <Image
              src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/icons8-facebook.svg?alt=media&token=4f134bb3-a925-4526-9939-68b9265bbaee"
              alt="facebook logo"
              height={48}
              width={48}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
