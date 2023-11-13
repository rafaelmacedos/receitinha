import Image from "next/image";
import Link from "next/link";

import receitinhalogo from "../../assets/img/receitinha-logo-home.png";
import { SearchBar } from "@/components/searchbar";

export default function Home() {
  return (
    <div className="container relative flex h-screen items-center justify-center bg-zinc-200 bg-opacity-40 lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="h-full w-3/4">
        <div className="flex h-1/3 w-full border border-red-700 items-center justify-center">
          <div className="">
            <Image src={receitinhalogo} className="mr-20" alt="Receitinha Logo" />
          </div>
          <div className="">
            <SearchBar />
          </div>
        </div>

        <div className="h-1/3 w-full">SEGUNDA</div>

        <div className="h-1/3 w-full">TERCEIRA</div>
      </div>

      <div className="h-full w-[650px] bg-[url('/hand.png')]">
        <h1>direita</h1>
      </div>
    </div>
  );
}
