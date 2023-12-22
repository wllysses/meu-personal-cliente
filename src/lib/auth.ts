import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const nextAuthOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        access_code: {
          label: "Código de acesso",
          type: "text",
          placeholder: "ex: 889asda879273",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://localhost:3000/api/login", {
          cache: "no-store",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            access_code: credentials?.access_code,
          }),
        });

        const data = await response.json();

        if (response.ok && data) {
          return await data;
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/",
  },
  callbacks: {
    async jwt({ token, user }) {
      user && (token.user = user);
      return token;
    },
    async session({ session, token }) {
      session = token.user as any;
      return session;
    },
  },
};
