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
    <div className="card flex h-32 w-[800px] items-center justify-center rounded-[45px] bg-white">
      <div className="w-1/5">
        {" "}
        <Select>
          <SelectTrigger className="w-[150px] h-12 text-base rounded-full">
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
      </div>
      <div className="w-2/4">
        <div className="static flex w-full max-w-sm items-center space-x-2">
          <Input className="h-12 w-96 text-base rounded-full" type="text" placeholder="Procurar receita de hoje" />
          <Button className="h-12 w-44 bg-green-500 text-lg text-white hover:bg-green-600 rounded-full" type="submit">Buscar</Button>
        </div>
      </div>
    </div>
  );
}
