import { authOptions } from "@/app/api/auth/[...nextauth]/authOptions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export const checkUser = async () => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }
};
