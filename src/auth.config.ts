import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { z } from "zod";

import prisma from "@/lib/prisma";

const restrictedRoutes = [
  { path: "/checkout", role: "user" },
  { path: "/checkout/address", role: "user" },
  { path: "/admin", role: "admin" },
  { path: "/profile", role: "user" },
  { path: "/orders", role: "user" },
];

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    newUser: "auth/new-account",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;

      const isAuthenticatedRoute = restrictedRoutes.find(
        (route) => route.path === nextUrl.pathname
      );

      if (isAuthenticatedRoute) {
        const isAuthorizedUser =
          auth?.user.role === "admin" ||
          isAuthenticatedRoute.role === auth?.user.role;

        if (isLoggedIn)
          return !isAuthorizedUser
            ? Response.redirect(new URL("/not-found", nextUrl))
            : true;

        return Response.redirect(new URL("/auth/login", nextUrl));
      }

      return true;
    },
    jwt({ token, user }) {
      if (user) {
        token.data = user;
      }

      return token;
    },
    session({ session, token }) {
      // console.log({ token });
      session.user = token.data as typeof session.user;
      return session;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        // Validate credential object
        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        // Find email
        const user = await prisma.user.findUnique({
          where: {
            email: email.toLowerCase(),
          },
        });

        if (!user) return null;

        // Check passwords
        const { password: userPassword, ...userInfo } = user;
        if (!bcryptjs.compareSync(password, userPassword)) return null;

        //Return user
        return userInfo;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
