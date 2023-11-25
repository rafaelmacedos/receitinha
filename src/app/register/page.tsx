import Image from "next/image";
import Link from "next/link";

import receitinhalogo from "../../assets/img/logo-receitinha.png";
import tituloReceitinha from "../../assets/img/receitinha-titulo.png";
import { RegisterUserForm } from '@/components/register-user-form'

export default function Login() {
  return (
    <div className="container relative flex h-screen items-center justify-center gap-32 bg-[url('/login-background.png')] lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex-col content-center items-center justify-center ">
        <Image
          className=""
          src={receitinhalogo}
          alt="Receitinha Logo"
          width={560}
        />
      </div>

      <div className="flex-col justify-center content-center">
        <Image className="mx-auto mb-4" src={tituloReceitinha} alt="Titulo" width={370} />
        <div
          className="flex h-[500px] w-[471px] items-center
        justify-center rounded-lg bg-white"
        >
          <RegisterUserForm className="w-10/12"/>
        </div>
        
      </div>
    </div>
  );
}
