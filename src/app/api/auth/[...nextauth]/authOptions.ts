import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/_lib/mongodb";
import bcrypt from "bcryptjs";

interface UserProps {
  id: string;
  username: string;
  nickname: string;
  autoLogin: boolean;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
        autoLogin: { label: "Auto Login", type: "boolean" },
      },
      async authorize(credentials) {
        const db = (await connectDB).db("heroMe");
        const user = await db
          .collection("user")
          .findOne({ username: credentials?.username });

        if (!user) return null;

        const match = await bcrypt.compare(
          credentials!.password,
          user.password
        );
        if (!match) return null;

        return {
          id: user._id.toString(),
          username: user.username,
          nickname: user.nickname,
          autoLogin: credentials?.autoLogin === "true",
        } as UserProps;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const autoLogin = (user as UserProps).autoLogin;
        const expiresIn = autoLogin ? 30 * 24 * 60 * 60 : 1 * 60 * 5;

        token.user = user;
        token.expires = Math.floor(Date.now() / 1000) + expiresIn;
      }

      if (trigger === "update" && session?.autoLogin !== undefined) {
        const expiresIn = session.autoLogin ? 30 * 24 * 60 * 60 : 1 * 60 * 5;
        token.expires = Math.floor(Date.now() / 1000) + expiresIn;
      }

      return token;
    },

    async session({ session, token }) {
      session.user = token.user as UserProps;
      session.expires = new Date(token.expires * 1000).toISOString();
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
