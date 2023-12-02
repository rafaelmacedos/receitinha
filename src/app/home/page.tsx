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
import axios from "axios";
import '../home/styles.css'

interface DecodedToken {
  iss?: string;
  user_id?: string;
  user_name?: string;
  sub?: string;
  exp?: number;
}

interface Recipe {
  id: string;
  name: string;
  typeMeal: "BREAKFAST" | "DINNER" | "LUNCH" | "FASTFOOD" | "DESSERT" | null;
  photo: string;
  video: string | null;
  ingredients: string[] | null;
  instructions: string;
  creator: {
    id: string;
    name: string;
    email: string;
  };
}

interface PopularRecipes {
  id: number;
  title: string;
  photo: string;
}

export default function Home() {
  const [username, setUsername] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [popularRecipes, setPopularRecipes] = useState<PopularRecipes[]>([]);
  const router = useRouter();


  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.access_token;

    const decodedToken = jwt.decode(cookies.access_token) as DecodedToken;
    const username = decodedToken?.user_name || "Nome de Usuário Padrão";

    setUsername(username);

    setPopularRecipes([
      {
        id : 1,
        title : 'Café da Manhã',
        photo : 'card-receita-1.png'
      },
      {
        id : 2,
        title : 'Lanche Rápido',
        photo : 'card-receita-2.png'
      },
      {
        id : 3,
        title : 'Massas',
        photo : 'card-receita-3.png'
      },
      {
        id : 4,
        title : 'Cuscuz',
        photo : 'card-receita-4.png'
      },
      {
        id : 5,
        title : 'Panquecas',
        photo : 'card-receita-5.png'
      }
    ]);

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };
    
    axios
      .get(
        "https://receita-que-doi-menos-server.up.railway.app/meals/all",
        config,
      )
      .then((response) => {
        setRecipes(response.data);
        setIsLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    //Container Principal
    <div className="w-full max-w-[1600px] h-screen flex items-start justify-center p-4 "> 
      {/* Content */}
      <div className="w-3/4 px-8">
        {/* Header */}
        <div className="h-48 flex items-center justify-between mb-[16px]">
          <Link href="/home" >
            <Image
              src={receitinhalogo}
              className="min-w-[150px]"
              alt="Receitinha Logo"
              width={200}
            />
          </Link>
          <SearchBar />
        </div>
        {/* Populares */}
        <section className="w-full">
          {/* Titulo */}
          <span className="text-3xl font-bold block text-left">Mais Populares</span>

          {/* Cards */}
          <section className="flex flex-nowrap items-center justify-start gap-4 py-4 w-full overflow-x-scroll">

          {/* Card */}
          {popularRecipes.map((recipe: PopularRecipes) => (
            <div
            key={recipe.id}
            className="h-[201px] w-[134px] rounded-[100px] py-4 flex flex-col flex-none text-center items-center justify-start cursor-pointer bg-white hover:bg-yellow-400 hover:text-white">
              <img
                className="h-[96px] w-[96px] rounded-full mb-4"
                src={recipe.photo} 
                alt=""
              />
              <span className="block text-base font-bold w-[110px]">{recipe.title}</span>
          </div>
          ))}
          </section>
        </section>

        <div className="h-full w-full p-4 text-center my-4">
          <Link href="/recipes" className="w-full">
            <Button
              type="button"
              variant="outline"
              className="h-fit w-64 rounded-12 text-lg bg-green-500 text-white hover:bg-green-600 rounded-[16px]"
            >
              adiciona um cumê aí! ❤️
            </Button>
          </Link>
        </div>

        {/* ENVIADOS RECENTEMENTE */}
        <div className="">
          <span className="text-3xl font-bold block text-left">Enviados Recentemente</span>
          <section className="flex items-center gap-x-4 gap-y-8 py-8 justify-start flex-wrap">
          {recipes.map((recipe) => (
            <div
              key={recipe.id}
              className="h-[180px] max-w-[350px] min-w-[335px] p-6 flex flex-col bg-cover bg-center bg-clip-border justify-end rounded-se-[60px] rounded-es-[60px] rounded-ss-[30px] rounded-ee-[30px]"
              style={{ backgroundImage: `url(${recipe.photo ? recipe.photo : '/unavailable.jpg'})`}}
            >
              <div className="w-fit bg-green-500 px-2 rounded-[4px]">
                <span className="text-[24px] font-bold text-white">
                  {recipe.name}
                </span>
              </div>
              <div className="w-fit bg-yellow-500 px-2">
                <span className="text-[16px] font-medium text-white">
                  {recipe.creator.name}
                </span>
              </div>
            </div>
          ))}
        </section>

          {/* <Link href="/recipes">
            <Button
              type="button"
              variant="outline"
              className="h-16 w-16 rounded-full bg-white text-5xl"
            >
              <span className="mt-[4px]">+</span>
            </Button>
          </Link> */}
        </div>
      </div>
      {/* Hand Container */}
      <div className="w-1/4 h-full flex flex-col items-end">
        <span className="block p-8 text-end text-lg font-bold">Olá, {username}!</span>

        <Button className="text-md font-normal right-12 top-24 h-12 w-60 rounded-full bg-white hover:bg-green-500 hover:text-white mb-4">
          Adicionar nova receita
        </Button>
        <Button className="w-50 text-md font-normal right-12 top-40 h-11 rounded-full bg-gray-400 text-white hover:bg-blue-700 ">
          Configurações
        </Button>
        
      </div>
    </div>
  );
}