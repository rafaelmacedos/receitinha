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

import { RegisterRecipeForm } from "@/components/register-recipe-form";

export default function RegisterRecipe() {
  return (
    <div className="container relative flex h-screen items-center justify-center bg-zinc-200 bg-opacity-40 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex w-3/4 flex-row">
        <div className="flex flex-col p-20">
          <Link href="/home" className="">
            <Image
              src={receitinhalogo}
              className="mr-20"
              alt="Receitinha Logo"
            />
          </Link>
          <div className="ml-3 mt-10 text-3xl font-semibold">
            <h1>Cadastro de Receita</h1>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <RegisterRecipeForm />
        </div>
      </div>

      <div className="relative h-full w-[650px] bg-[url('/hand.png')]"></div>
    </div>
  );
}
