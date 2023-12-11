import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "./ui/use-toast";
import { api } from "@/lib/api";
import { parseCookies } from "nookies";
import axios from "axios";
import { useState } from "react";
import jwt from "jsonwebtoken";

interface DecodedToken {
  iss?: string;
  user_id?: string;
  user_name?: string;
  sub?: string;
  exp?: number;
}

export function RegisterRecipeForm() {
  const productSchema = z.object({
    name: z
      .string()
      .min(3, "O nome da receita deve conter no mínimo 3 caracteres"),
    typeMeal: z.enum(["FASTFOOD", "DINNER", "LUNCH", "BREAKFAST", "DESSERT"]),
    photoURL: z.string().url("Insira uma URL válida"),
    videoURL: z.string().optional(),
    ingredients: z.any(),
    instructions: z.string(),
    creatorID: z.any(),
  });
  type RecipeType = z.infer<typeof productSchema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RecipeType>({
    resolver: zodResolver(productSchema),
  });

  
  const { toast } = useToast();

  const onSubmit: SubmitHandler<RecipeType> = async (data) => {

    const cookies = parseCookies();
    const authToken = cookies.access_token;
    const decodedToken = jwt.decode(cookies.access_token) as DecodedToken;
    
    data.creatorID = decodedToken?.user_id
    data.ingredients = data.ingredients.split(',').map((ingredient: string) => ingredient.trim());

    console.log(data)
    if (!data.videoURL) {
      delete data.videoURL;
    }

    const config = {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    };

    try {
      const response = await axios.post(
        "https://receita-que-doi-menos-server.up.railway.app/meals",
        data, config
      );

      reset();
      toast({
        title: "Tudo certo!",
        description: "Sua receita foi salva e anunciada com sucesso!",
      });
    } catch (error) {
      console.log(error)
      toast({
        variant: "destructive",
        title: "Algo deu errado!",
        description:
          "Não foi possível anunciar sua receita agora, tente novamente mais tarde.",
      });
    }
  };

  return (
    <form
      className="flex w-full max-w-screen-md flex-col gap-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className="flex flex-col gap-2.5">
        <Label htmlFor="name" className="text-lg">
          Nome da Receita <span className="text-red-500">*</span>
        </Label>
        <Input
          id="name"
          placeholder="Nome da sua receita"
          type="text"
          {...register("name")}
        />
        {errors.name && (
          <span className="mb-1 text-xs text-red-500">
            {errors.name?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="typeMeal" className="text-lg">
          Tipo de refeição <span className="text-red-500">*</span>
        </Label>
        <select
          id="typeMeal"
          {...register("typeMeal")}
          className="rounded-md border p-2"
        >
          <option value="FASTFOOD">Comida Rápida</option>
          <option value="DINNER">Jantar</option>
          <option value="LUNCH">Almoço</option>
          <option value="BREAKFAST">Café da Manhã</option>
          <option value="DESSERT">Sobremesa</option>
        </select>
        {errors.typeMeal && (
          <span className="mb-1 text-xs text-red-500">
            {errors.typeMeal?.message}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="photoURL" className="text-lg">
          URL da foto da receita
        </Label>
        <Input
          id="photoURL"
          placeholder="https://..."
          type="text"
          {...register("photoURL")}
        />
        {errors.photoURL && (
          <span className="mb-1 text-xs text-red-500">
            {errors.photoURL?.message}
          </span>
        )}
        <p className="text-sm text-muted-foreground">
          Adicione uma URL *pública* da foto da sua receita. Receitas com fotos
          tendem a ser mais atraentes!
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="videoURL" className="text-lg">
          URL do vídeo da receita (opcional)
        </Label>
        <Input
          id="videoURL"
          placeholder="https://..."
          type="text"
          {...register("videoURL")}
        />
        {errors.videoURL && (
          <span className="mb-1 text-xs text-red-500">
            {errors.videoURL?.message}
          </span>
        )}
        <p className="text-sm text-muted-foreground">
          Adicione uma URL *pública* do vídeo da sua receita (opcional). Vídeos
          podem aumentar a interação dos espectadores!
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="ingredients" className="text-lg">
          Ingredientes
        </Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="Ingrediente 1, Ingrediente 2, ..."
          id="ingredients"
          {...register("ingredients", { valueAsNumber: false })}
        />
        {errors.ingredients && (
          <span className="mb-1 text-xs text-red-500">
            {errors.ingredients?.message && "Erro nos ingredientes"}
          </span>
        )}
        <p className="text-sm text-muted-foreground">
          Liste os ingredientes da sua receita separados por vírgula.
        </p>
      </div>

      <div className="flex flex-col gap-2.5">
        <Label htmlFor="instructions" className="text-lg">
          Instruções
        </Label>
        <Textarea
          className="h-24 resize-none"
          placeholder="Instruções para preparar a receita..."
          id="instructions"
          {...register("instructions")}
        />
        {errors.instructions && (
          <span className="mb-1 text-xs text-red-500">
            {errors.instructions?.message}
          </span>
        )}
      </div>

      <Button className="w-fit text-lg">Salvar e anunciar</Button>
    </form>
  );
}
