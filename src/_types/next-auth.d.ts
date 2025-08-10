import NextAuth from "next-auth";

declare module "next-auth" {
  interface User {
    id: string;
    username: string;
    nickname: string;
    autoLogin: boolean;
  }

  interface Session {
    user: {
      id: string;
      username: string;
      nickname: string;
      autoLogin: boolean;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    user: {
      id: string;
      username: string;
      nickname: string;
      autoLogin: boolean;
    };
    expires: number;
  }
}
