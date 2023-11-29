"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { parseCookies } from "nookies";
import jwt from "jsonwebtoken";
import { Triangle } from "react-loader-spinner";
import Link from "next/link";

interface Recipe {
  id: string;
  name: string | null;
  typeMeal: "BREAKFAST" | "DINNER" | "LUNCH" | "FASTFOOD" | "DESSERT" | null;
  photo: string | null;
  video: string | null;
  ingredients: string[]| null;
  instructions: string| null;
  creator: {
    id: string;
    name: string;
    email: string;
  };
}

export default function Recipes() {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.access_token;

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
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
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
          <span className="p-10 text-3xl font-bold">Todas as receitas</span>

          <div className="flex items-center gap-10 p-10">
            <Triangle
              height="82"
              width="82"
              color="#FFD900"
              ariaLabel="triangle-loading"
              visible={isLoading}
            />

            {!isLoading && (
              <div className="flex items-center gap-10">
                {recipes.map((recipe) => (
                  <div
                    key={recipe.id}
                    className="h-[250px] w-[180px] rounded-[100px] bg-white text-center hover:bg-green-400"
                  >
                    <Image
                      className="h-[180px] w-[180px] rounded-[100px] p-5"
                      src={recipe.photo}
                      alt=""
                      width={180}
                      height={180}
                    />
                    <span className="text-lg font-bold">{recipe.name}</span>
                  </div>
                ))}
                <Button className=" h-50 w-50 rounded-[100%] bg-white text-5xl">
                  +
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="relative h-full w-[650px] bg-[url('/hand.png')]">
      <div className="m-12 flex items-end justify-end">
          <span className="self-end text-lg font-bold">Olá, username!</span>
        </div>
        <Button className="text-md absolute right-12 top-24 h-12 w-60 rounded-full bg-white hover:bg-green-500 hover:text-white">
          Adicionar nova receita
        </Button>
        <Button className="w-50 text-md absolute right-12 top-40 h-11 rounded-full bg-gray-700 text-white hover:bg-blue-700 ">
          Configurações
        </Button>
      </div>
    </div>
  );
}
