"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import axios from "axios";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function RegisterUserForm({ className, ...props }: UserAuthFormProps) {
  const authSchema = z.object({
    name: z.string().min(3, "Digite um nome válido"),
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "A senha deve conter no mínimo 8 caracteres")
      .max(12, "A senha deve conter no máximo 12 caracteres"),
  });

  type Auth = z.infer<typeof authSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Auth>({
    resolver: zodResolver(authSchema),
  });

  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const router = useRouter();

  const onSubmit: SubmitHandler<Auth> = async (data) => {
    setIsSubmitting(true);
    console.log(data)
    try {
      const response = await axios.post(
        "https://receita-que-doi-menos-server.up.railway.app/auth/register",
        data,
      );

      if (response.status === 201) {
        window.alert("Usuário cadastrado com sucesso!");
        await router.push("/login");
        setIsSubmitting(false);
      }
    } catch {
      window.alert("Falha ao realizar cadastro");
      setIsSubmitting(false);
    }
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <div className="w-full text-center">
        <h1 className="text-3xl">Cadastro</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <div className="text-lg">
              <Label htmlFor="name" className="text-lg">
                Nome completo <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Digite seu nome completo"
                type="text"
                autoCapitalize="none"
                autoComplete="name"
                autoCorrect="off"
                {...register("name")}
              />

              {errors.name && (
                <span className="text-sm text-red-500">
                  {errors.name?.message}
                </span>
              )}
            </div>

            <Label htmlFor="email" className="text-lg">
              E-mail <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              placeholder="Digite seu e-mail"
              type="text"
              autoCapitalize="none"
              autoComplete="email"
              autoCorrect="off"
              {...register("email")}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label htmlFor="password" className="text-lg">
              Senha <span className="text-red-500">*</span>
            </Label>
            <Input
              id="password"
              placeholder="Digite sua senha"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="text-sm text-red-500">
                {errors.password?.message}
              </span>
            )}
          </div>
          <Button
            className="mt-4 bg-green-500 text-lg text-white hover:bg-green-600"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <CircleNotch className="animate-spin" size={18} />
            ) : (
              "Cadastrar"
            )}
          </Button>
        </div>
      </form>
      <div className="relative flex justify-center text-sm">
        <span className="bg-background px-4 text-muted-foreground">
          <Link href="/login">Voltar para Login</Link>
        </span>
      </div>
    </div>
  );
}
