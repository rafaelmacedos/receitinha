import { createContext, useState, ReactNode } from "react";
import axios from "axios";
import { setCookie } from "nookies";
import jwt from "jsonwebtoken";
import Router from "next/router";

type AuthContextType = {
  isAuthenthicated: boolean;
  resPayload: ResPayload | null;
  signIn: (data: SignInData) => void;
};

type SignInData = {
  email: string;
  password: string;
};

type ResPayload = {
  iss: string;
  user_id: string;
  user_name: string;
  sub: string;
  ex: number;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export function AuthProvider({ children }: AuthProviderProps) {
  const [resPayload, setResPayload] = useState<ResPayload | null>(null);
  const isAuthenthicated = !!resPayload;

async function signIn(data: SignInData) {
  try {
    const response = await axios.post(
      "https://receita-que-doi-menos-server.up.railway.app/auth/login",
      data,
    );

    const { access_token } = response.data;
    console.log(access_token);
    const decodedToken = jwt.decode(access_token) as ResPayload;
    setResPayload(decodedToken);

    setCookie(undefined, "nextauth.token", access_token, {
      maxAge: 60 * 60 * 1, // 1 hora
    });

    Router.push("/home");
  } catch (error) {
    console.error("Erro durante o login:", error);
    // Adicione lógica de tratamento de erro, se necessário
  }
}


  return (
    <AuthContext.Provider value={{ resPayload, isAuthenthicated, signIn }}>
      {children}
    </AuthContext.Provider>
  );
}
