"use client";
import Image from "next/image";

import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import jwt from "jsonwebtoken";
import { useEffect, useState } from "react";
import { parseCookies, destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import Link from "next/link";
import axios from "axios";
import "../home/styles.css";

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
        id: 1,
        title: "Café da Manhã",
        photo: "card-receita-1.png",
      },
      {
        id: 2,
        title: "Lanche Rápido",
        photo: "card-receita-2.png",
      },
      {
        id: 3,
        title: "Massas",
        photo: "card-receita-3.png",
      },
      {
        id: 4,
        title: "Cuscuz",
        photo: "card-receita-4.png",
      },
      {
        id: 5,
        title: "Panquecas",
        photo: "card-receita-5.png",
      },
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

  const logout = () => {
    destroyCookie(null, "access_token");
    destroyCookie(null, "refresh_token");
    router.push("/login");
  };

  return (
    //Container Principal
    <div className="flex h-screen w-full max-w-[1600px] items-start justify-center p-4">
      {/* Content */}
      <div className="w-3/4 px-8">
        {/* Header */}
        <div className="mb-[16px] flex h-48 items-center justify-between">
          <Link href="/home">
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
          <span className="block text-left text-3xl font-bold">
            Mais Populares
          </span>

          {/* Cards */}
          <section className="flex w-full flex-nowrap items-center justify-start gap-4 overflow-x-scroll py-4">
            {/* Card */}
            {popularRecipes.map((recipe: PopularRecipes) => (
              <div
                key={recipe.id}
                className="flex h-[201px] w-[134px] flex-none cursor-pointer flex-col items-center justify-start rounded-[100px] bg-white py-4 text-center hover:bg-yellow-400 hover:text-white"
              >
                <img
                  className="mb-4 h-[96px] w-[96px] rounded-full"
                  src={recipe.photo}
                  alt=""
                />
                <span className="block w-[110px] text-base font-bold">
                  {recipe.title}
                </span>
              </div>
            ))}
          </section>
        </section>

        <div className="my-4 flex h-full w-full justify-around gap-4 p-4">
          <Link href="/register-recipe" className="w-fit">
            <Button
              type="button"
              variant="outline"
              className="rounded-12 h-fit w-fit rounded-[16px] bg-green-500 text-lg text-white hover:bg-green-600 hover:text-white"
            >
              adiciona um cumê aí! ❤️
            </Button>
          </Link>
          <Link href="/recipes" className="w-fit">
            <Button
              type="button"
              variant="outline"
              className="rounded-12 h-fit w-fit rounded-[16px] bg-yellow-500 text-lg text-white hover:bg-yellow-600 hover:text-white"
            >
              Conheça nosso Cardápio! 🥓
            </Button>
          </Link>
        </div>

        {/* ENVIADOS RECENTEMENTE */}
        <div>
          <span className="block text-left text-3xl font-bold">
            Enviados Recentemente
          </span>
          <section className="flex flex-wrap items-center justify-start gap-x-4 gap-y-8 py-8">
            {recipes.map((recipe) => (
              <div
                key={recipe.id}
                className="flex h-[180px] min-w-[335px] max-w-[350px] flex-col justify-end rounded-ee-[30px] rounded-es-[60px] rounded-se-[60px] rounded-ss-[30px] bg-cover bg-clip-border bg-center p-6"
                style={{
                  backgroundImage: `url(${
                    recipe.photo ? recipe.photo : "/unavailable.jpg"
                  })`,
                }}
              >
                <div className="w-fit rounded-[4px] bg-green-500 px-2">
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
        </div>
      </div>
      {/* Hand Container */}
      <div className="flex h-full w-1/4 flex-col items-end">
        <span className="block p-8 text-end text-lg font-bold">
          Olá, {username}!
        </span>

        <Link href="/register-recipe" className="w-fit">
          <Button className="text-md right-12 top-24 mb-4 h-12 w-60 rounded-full bg-white font-normal hover:bg-green-500 hover:text-white">
            Adicionar nova receita
          </Button>
        </Link>        

        <Button
          className="w-50 text-md right-12 top-40 h-11 rounded-full bg-gray-400 font-normal text-white hover:bg-blue-700"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
