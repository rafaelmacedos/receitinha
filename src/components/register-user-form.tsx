"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
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

type UserAuthFormProps = React.HTMLAttributes<HTMLDivElement>;

export function RegisterUserForm({ className, ...props }: UserAuthFormProps) {
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

  const router = useRouter();

  const onSubmit: SubmitHandler<Auth> = (data) => {
    setIsSubmitting(true);

    // Armazenando email do usuário "autenticado" no LocalStorage
    LocalStorageUtils.storage(
      LocalStorageKeys.USER_AUTHENTICATED_EMAIL,
      data.email,
    );

    // Fake loading
    setTimeout(() => {
      setIsSubmitting(false);
      router.push("/products");
    }, 1500);
  };

  return (
    <div className={cn("grid gap-4", className)} {...props}>
      <div className="w-full text-center">
        <h1 className="text-3xl">Cadastro</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid gap-2">
          <div className="grid gap-1">
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
            <Label htmlFor="confirm-password" className="text-lg">
              Confirme sua Senha <span className="text-red-500">*</span>
            </Label>
            <Input
              id="confirm-password"
              placeholder="Confirme sua senha"
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
