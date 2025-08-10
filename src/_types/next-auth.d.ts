import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    nickname: string;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      nickname: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      nickname: string;
    };
  }
}
