import { connectDB } from "@/_lib/mongodb";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export default async function GET() {
  const session = await getServerSession();
  if (!session || !session.user) {
    return NextResponse.json(
      { message: "로그인 정보가 필요합니다." },
      { status: 400 }
    );
  }

  const client = await connectDB;
  const db = client.db("heroMe");
  try {
    const threeDays = new Date();
    threeDays.setDate(threeDays.getDate() - 3);

    const data = await db
      .collection("createData")
      .find({
        createdAt: { $gte: threeDays },
      })

      .toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "서버 에러 발생", error: String(error) },
      { status: 500 }
    );
  }
}
