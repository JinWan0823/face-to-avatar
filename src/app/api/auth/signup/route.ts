import { connectDB } from "@/_lib/mongodb";
import bcrypt from "bcryptjs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const data = await req.json();
    const { username, password, nickname } = data;

    if (!username || !password || !nickname) {
      return NextResponse.json(
        { message: "필수 입력란을 확인해주세요." },
        { status: 400 }
      );
    }

    const client = await connectDB;
    const db = client.db("heroMe");

    const existingUser = await db.collection("user").findOne({ username });
    if (existingUser) {
      return NextResponse.json(
        { message: "이미 존재하는 아이디입니다." },
        { status: 409 }
      );
    }

    const existingNickname = await db.collection("user").findOne({ nickname });
    if (existingNickname) {
      return NextResponse.json(
        { message: "이미 존재하는 닉네임입니다." },
        { status: 409 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.collection("user").insertOne({
      username,
      nickname,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "회원가입 성공!" }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러 발생", error: String(error) },
      { status: 500 }
    );
  }
}
