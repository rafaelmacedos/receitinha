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

import { RegisterProductForm } from "@/components/register-product-form";

export default function RegisterRecipe() {
  return (
    <div className="container relative flex h-screen items-center justify-center overflow-hidden bg-zinc-200 bg-opacity-40 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="flex w-3/4 flex-row border border-red-800">
        <div className="flex flex-col border p-20">
          <Link href="/home" className="">
            <Image
              src={receitinhalogo}
              className="mr-20"
              alt="Receitinha Logo"
            />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <RegisterProductForm />
        </div>
      </div>

      <div className="relative h-full w-[650px] bg-[url('/hand.png')]"></div>
    </div>
  );
}
