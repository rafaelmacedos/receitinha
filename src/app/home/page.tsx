"use client";
import Image from "next/image";

import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface DecodedToken {
  iss?: string;
  user_id?: string;
  user_name?: string;
  sub?: string;
  exp?: number;
}

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();

    const decodedToken = jwt.decode(cookies.access_token) as DecodedToken;
    const username = decodedToken?.user_name || "Nome de Usuário Padrão";

    setUsername(username);
  }, []);

  return (
    <div className="container relative flex h-screen items-center justify-center bg-zinc-200 bg-opacity-40 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full w-3/4">
        <div className="flex h-[270px] w-full items-center justify-center">
          <Link href="/home" className="">
            <Image
              src={receitinhalogo}
              className="mr-20"
              alt="Receitinha Logo"
            />
          </Link>
          <div className="">
            <SearchBar />
          </div>
        </div>

        <div>
          <span className="p-10 text-2xl font-bold">Mais Populares</span>

          <div className="flex items-center gap-10 p-10">
            <div className="h-[250px] w-[180px] cursor-pointer rounded-[100px] bg-white text-center hover:bg-yellow-400">
              <img
                className="h-[180px] w-[180px] p-5"
                src="card-receita-1.png"
                alt=""
              />
              <span className="text-lg font-bold">Café da Manhã</span>
            </div>

            <div className="h-[250px] w-[180px] cursor-pointer rounded-[100px] bg-white text-center hover:bg-yellow-400">
              <img
                className="h-[180px] w-[180px] p-5"
                src="card-receita-2.png"
                alt=""
              />
              <span className="text-lg font-bold">Lanche Rápido</span>
            </div>

            <div className="h-[250px] w-[180px] cursor-pointer rounded-[100px] bg-white text-center hover:bg-yellow-400">
              <img
                className="h-[180px] w-[180px] p-5"
                src="card-receita-3.png"
                alt=""
              />
              <span className="text-lg font-bold">Crepioca</span>
            </div>

            <div className="h-[250px] w-[180px] cursor-pointer rounded-[100px] bg-white text-center hover:bg-yellow-400">
              <img
                className="h-[180px] w-[180px] p-5"
                src="card-receita-4.png"
                alt=""
              />
              <span className="text-lg font-bold">Cuscuz</span>
            </div>

            <div className="h-[250px] w-[180px] cursor-pointer rounded-[100px] bg-white text-center hover:bg-yellow-400">
              <img
                className="h-[180px] w-[180px] p-5"
                src="card-receita-5.png"
                alt=""
              />
              <span className="text-lg font-bold">Pizza de Pão</span>
            </div>

            <Link href="/recipes">
              <Button type="button" variant="outline" className="h-16 w-16 rounded-full bg-white text-5xl">
                <span className="mt-[4px]">+</span>
              </Button>
            </Link>

          </div>
        </div>

        <div>
          <span className="p-10 text-2xl font-bold">Enviados Recentemente</span>

          <div className="flex items-center gap-10 p-9">
            <div className="h-[180px] w-[370px] rounded-[70px] bg-[url('/vaca-atolada.jpg')]">
              <span className="text-[27px] font-bold text-white">
                Vaca atolada
              </span>
              <span className="text-[17px] font-bold text-gray-500">
                por Ramon Montenegro
              </span>
            </div>
            
            <Link href="/recipes">
              <Button type="button" variant="outline" className="h-16 w-16 rounded-full bg-white text-5xl">
                <span className="mt-[4px]">+</span>
              </Button>
            </Link>


          </div>
        </div>
      </div>

      <div className="relative h-full w-[650px] bg-[url('/hand.png')]">
        <div className="m-12 flex items-end justify-end">
          <span className="self-end text-lg font-bold">Olá, {username}!</span>
        </div>
        <Button className="text-md absolute right-12 top-24 h-12 w-60 bg-white hover:bg-green-500">
          Adicionar nova receita
        </Button>
        <Button className="w-50 text-md absolute right-12 top-40 h-11 bg-green-200 hover:bg-green-500">
          Configurações
        </Button>
      </div>
    </div>
  );
}
