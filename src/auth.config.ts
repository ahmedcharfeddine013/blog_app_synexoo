import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { LoginSchema } from "./schema";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const options: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        const user = { id: "42", name: "Dave", password: "nextauth" };
        if (
          credentials?.username == user.name &&
          credentials?.password == user.password
        ) {
          return user;
        } else {
          return null;
        }
      },
    }),
  ],
};
