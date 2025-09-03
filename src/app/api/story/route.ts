import { connectDB } from "@/_lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
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

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "로그인 정보가 필요합니다." },
      { status: 400 }
    );
  }

  const data = await req.json();
  const { imgFile, prompt, keywords } = data;

  if (!imgFile || !prompt || !keywords) {
    return NextResponse.json(
      { message: "필수 입력란을 확인해주세요." },
      { status: 400 }
    );
  }
  try {
    const client = await connectDB;
    const db = client.db("heroMe");

    const createData = await db.collection("createData").insertOne({
      username: session.user.username,
      image: imgFile,
      prompt: prompt,
      keywords: keywords,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "데이터 등록 성공", createData },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러 발생", error: String(error) },
      { status: 500 }
    );
  }
}
