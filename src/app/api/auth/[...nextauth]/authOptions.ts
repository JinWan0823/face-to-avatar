import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectDB } from "@/_lib/mongodb";
import bcrypt from "bcryptjs";

interface UserProps {
  id: string;
  username: string;
  nickname: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "아이디", type: "text" },
        password: { label: "비밀번호", type: "password" },
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
        } as UserProps;
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },

  jwt: {
    maxAge: 30 * 24 * 60 * 60, // 자동로그인 30일 유지
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.user = user;
      }
      return token;
    },

    async session({ session, token }) {
      session.user = token.user as UserProps;
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};
