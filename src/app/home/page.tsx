"use client"
import Image from "next/image";


import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { parseCookies } from "nookies";

interface DecodedToken {
  iss?: string,
  user_id?: string,
  user_name?: string,
  sub?: string,
  exp?: number
}

export default function Home() {

  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    const cookies = parseCookies();
    
    const decodedToken = jwt.decode(cookies.access_token) as DecodedToken;
    const username = decodedToken?.user_name || 'Nome de Usuário Padrão';

    setUsername(username);
  }, []);
  
  return (
    <div className="container relative flex h-screen items-center justify-center bg-zinc-200 bg-opacity-40 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full w-3/4">
        <div className="flex h-[270px] w-full items-center justify-center">
          <div className="">
            <Image src={receitinhalogo} className="mr-20" alt="Receitinha Logo" />
          </div>
          <div className="">
            <SearchBar className="" />
          </div>
        </div>

        <div>

          <span className="p-10 text-2xl font-bold">Mais Populares</span>

          <div className="p-10 flex items-center gap-10">

            <div className="h-[250px] w-[180px] text-center rounded-[100px] bg-white hover:bg-green-400">
              <img className="p-5 h-[180px] w-[180px]" src="card-receita-1.png" alt="" srcset="" />
              <span className="text-lg font-bold">Café da Manhã</span>
            </div>

            <div className="h-[250px] w-[180px] text-center rounded-[100px] bg-white hover:bg-green-400">
              <img className="p-5 h-[180px] w-[180px]" src="card-receita-2.png" alt="" srcset="" />
              <span className="text-lg font-bold">Lanche Rápido</span>
            </div>

            <div className="h-[250px] w-[180px] text-center rounded-[100px] bg-white hover:bg-green-400">
              <img className="p-5 h-[180px] w-[180px]" src="card-receita-3.png" alt="" srcset="" />
              <span className="text-lg font-bold">Crepioca</span>
            </div>

            <div className="h-[250px] w-[180px] text-center rounded-[100px] bg-white hover:bg-green-400">
              <img className="p-5 h-[180px] w-[180px]" src="card-receita-4.png" alt="" srcset="" />
              <span className="text-lg font-bold">Cuscuz</span>
            </div>

            <div className="h-[250px] w-[180px] text-center rounded-[100px] bg-white hover:bg-green-400">
              <img className="p-5 h-[180px] w-[180px]" src="card-receita-5.png" alt="" srcset="" />
              <span className="text-lg font-bold">Pizza de Pão</span>
            </div>

            <Button className=" h-50 w-50 rounded-[100%] bg-white text-5xl" >+</Button>

          </div>
          
        </div>

        <div>

          <span className="p-10 text-2xl font-bold">Enviados Recentemente</span>
          
          <div className="p-9 flex items-center gap-10">

            <div className="h-[180px] w-[370px] rounded-[70px] bg-white"></div>
            <div className="h-[180px] w-[370px] rounded-[70px] bg-white"></div>
            <div className="h-[180px] w-[370px] rounded-[70px] bg-white"></div>

            <Button className=" h-50 w-50 rounded-[100%] bg-white text-5xl" >+</Button>
          </div>

        </div>

      </div>

      <div className="relative h-full w-[650px] bg-[url('/hand.png')]">
        <div className="flex items-end justify-end mr-14 mt-2">
          <span className="self-end text-lg font-bold">Olá, {username}!</span>
        </div>
        
        <Button className="h-12 w-60 bg-white hover:bg-green-500 text-md absolute top-10 right-11">Adicionar nova receita</Button>
        <Button className="h-11 w-50 bg-green-200 hover:bg-green-500 text-md absolute top-24 right-11">Configurações</Button>
      </div>
    </div>
  );
}


