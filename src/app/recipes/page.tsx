"use client";
import axios from "axios";
import Image from "next/image";
import { useEffect, useState } from "react";

import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";
import { Button } from "@/components/ui/button";
import { parseCookies, destroyCookie } from "nookies";
import jwt from "jsonwebtoken";
import { Triangle } from "react-loader-spinner";
import { useRouter } from "next/navigation";

import Link from "next/link";
import "./styles.css";

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

export default function Recipes() {
  const [username, setUsername] = useState<string | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const router = useRouter();

  useEffect(() => {
    const cookies = parseCookies();
    const authToken = cookies.access_token;

    const decodedToken = jwt.decode(cookies.access_token) as DecodedToken;
    const username = decodedToken?.user_name || "Nome de Usuário Padrão";

    setUsername(username);

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

  const logout = () => {
    destroyCookie(null, "access_token");
    destroyCookie(null, "refresh_token");
    router.push("/login");
  };

  return (
    <div className="flex h-screen w-full max-w-[1600px] items-start justify-center p-4">
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
          <span className="block text-left text-3xl font-bold">Todas as receitas</span>

            <Triangle
              height="82"
              width="82"
              color="#FFD900"
              ariaLabel="triangle-loading"
              visible={isLoading}
            />

            {!isLoading && (
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
            )}
        </div>
      </div>

      <div className="relative h-full w-[650px]">
        <div className="m-12 flex items-end justify-end">
          <span className="self-end text-lg font-bold">Olá, {username}!</span>
        </div>
        <Button className="text-md absolute right-12 top-24 h-12 w-60 rounded-full bg-white hover:bg-green-500 hover:text-white">
          Adicionar nova receita
        </Button>
        <Button
          className="w-50 text-md absolute right-12 top-40 h-11 rounded-full bg-gray-400 text-white hover:bg-blue-700"
          onClick={logout}
        >
          Sair
        </Button>
      </div>
    </div>
  );
}
