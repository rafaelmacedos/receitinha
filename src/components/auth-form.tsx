"use client";

import { useContext, useEffect, useState } from "react";
import { z } from "zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CircleNotch } from "@phosphor-icons/react";
import Link from "next/link";

import { cn } from "@/lib/utils";
import { LocalStorageUtils } from "@/utils/local-storage";
import { LocalStorageKeys } from "@/utils/enums/local-storage-keys.enum";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { AuthContext } from "@/contexts/AuthContext";

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function AuthForm({ className, ...props }: UserAuthFormProps) {
  const authSchema = z.object({
    email: z.string().min(1, "E-mail é obrigatório").email("E-mail inválido"),
    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(6, "A senha deve conter no mínimo 6 caracteres"),
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
  const { signIn } = useContext(AuthContext);

  const onSubmit: SubmitHandler<Auth> = (data) => {
    setIsSubmitting(true);

    // Armazenando email do usuário "autenticado" no LocalStorage
    LocalStorageUtils.storage(
      LocalStorageKeys.USER_AUTHENTICATED_EMAIL,
      data.email,
    );
    // console.log(data)
    // Fake loading
    // setTimeout(() => {
    //   setIsSubmitting(false);
    //   router.push("/home");
    // }, 1500);

    signIn(data)
  };

  return (
    <div className={cn("grid gap-6", className)} {...props}>
      <div className="text-center">
        <h1 className="text-3xl">Login</h1>
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="email">
              E-mail
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
              <span className="mb-1 text-sm text-red-500">
                {errors.email?.message}
              </span>
            )}
          </div>
          <div className="grid gap-1">
            <Label className="sr-only" htmlFor="password">
              Senha
            </Label>
            <Input
              id="password"
              placeholder="Digite sua senha"
              type="password"
              {...register("password")}
            />
            {errors.password && (
              <span className="mb-1 text-sm text-red-500">
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
              "Entrar"
            )}
          </Button>
        </div>
      </form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-3 text-muted-foreground">
            <p>
              Ainda não <strong>poupa tempo</strong> com o Receitinha?
            </p>
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center">
      <Link href="/register">
        <Button
          className="w-64 bg-blue-600 text-white hover:bg-blue-800 hover:text-white"
          variant="outline"
          type="button"
        >
          Comece agora
        </Button>
        </Link>
      </div>
    </div>
  );
}
