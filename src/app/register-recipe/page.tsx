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
import './styles.css'
import { RegisterRecipeForm } from "@/components/register-recipe-form";

export default function RegisterRecipe() {
  return (
    <div className="h-screen w-full items-center justify-start p-8">
      <div className="flex w-3/4 flex-row">

        <div>
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

        <div className="flex items-center justify-center pb-8">
          <RegisterRecipeForm />
        </div>
      </div>

      {/* <div className="relative h-full w-[650px] bg-[url('/hand.png')]"></div> */}
    </div>
  );
}
