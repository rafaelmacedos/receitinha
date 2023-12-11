import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function SearchBar() {
  return (
    <div className="w-[700px] p-6 flex flex-wrap items-center rounded-[16px] bg-white gap-4 rounded-se-[60px] rounded-es-[60px] rounded-ss-[30px] rounded-ee-[30px]">
        <Select>
          <SelectTrigger className="w-[100px] flex-1 flex-shrink-0 h-12 text-base rounded-full">
            <SelectValue placeholder="Filtros" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Filtros</SelectLabel>
              <SelectItem className="text-base" value="apple">Café da Manhã</SelectItem>
              <SelectItem className="text-base" value="banana">Almoço</SelectItem>
              <SelectItem className="text-base" value="blueberry">Janta</SelectItem>
              <SelectItem className="text-base" value="grapes">Sobremesa</SelectItem>
              <SelectItem className="text-base" value="pineapple">Comida Rápida</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Input className="w-[240px] flex-1 flex-shrink- h-12 text-base rounded-[16px]" type="text" placeholder="Procurar receita de hoje"/>

        <Button className="max-w-[180px] h-12 flex-1 flex-shrink-0 bg-green-500 text-lg text-white hover:bg-green-600 rounded-[16px] rounded-se-[60px] rounded-es-[60px] rounded-ss-[30px] rounded-ee-[30px]" type="submit">Buscar</Button>
      {/* <div className="">
        <div className="flex-1 flex-shrink-0 w-40 items-center gap-4">
        </div>
      </div> */}
    </div>
  );
}
