import Image from 'next/image'
import Link from 'next/link'

export default function Register() {
  return (
    <div>
      <div className="bg-light-blue900 p-5">
        <Image
          src="https://firebasestorage.googleapis.com/v0/b/flashvibe-13cf5.appspot.com/o/logo-2.svg?alt=media&token=e631c314-ed21-4534-af6c-53ef41630d9b"
          alt="sla"
          width={62}
          height={52}
        />

        <h1>Criar uma conta</h1>

        <form action="" className="">
          <input type="text" placeholder="Nome" />
          <input type="text" placeholder="Apelido" />
          <input type="text" placeholder="Email" />
          <input type="text" placeholder="Senha" />
          <input type="text" placeholder="Confirmar senha" />
          <button>Ver senha</button>
          <button>Cadastrar</button>
        </form>
      </div>

      <div className="flex items-center justify-center bg-sky-700 p-36">
        <Link href="/register">Registrar</Link>
      </div>
    </div>
  )
}
