import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import jwt from "jsonwebtoken";

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

export const nextAuthOptions = nextAuthOptions({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "email" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials, req) {
        // Add logic here to look up the user from the credentials supplied
        const body = JSON.stringify({
          email: credentials?.email,
          password: credentials?.password,
        });
        const response = await axios.post(
          "https://receita-que-doi-menos-server.up.railway.app/auth/login",
          body,
        );
        const { access_token } = response.data;
        const decodedToken = jwt.decode(access_token);

        const user = decodedToken as ResPayload;

        if (user && response.status === 200) {
          return user;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "",
    newUser: "/register",
    error: "",
  },
});

const handler = NextAuth(nextAuthOptions);

export { handler as GET, handler as POST };
