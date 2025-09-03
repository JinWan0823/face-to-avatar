import { connectDB } from "@/_lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.username);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "로그인 정보가 필요합니다." },
      { status: 400 }
    );
  }

  try {
    const client = await connectDB;
    const db = client.db("heroMe");

    const myStory = await db
      .collection("createData")
      .find({ username: session.user.username })
      .toArray();

    return NextResponse.json(myStory, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러 발생", error: String(error) },
      { status: 500 }
    );
  }
}

// export async function POST(){

//   try{

//   } catch(error){

//   }
// }
