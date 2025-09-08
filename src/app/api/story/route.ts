import { connectDB } from "@/_lib/mongodb";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/authOptions";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { v4 as uuidv4 } from "uuid";

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

  const formData = await req.formData();
  const imgFile = formData.get("imgFile") as File;
  const prompt = formData.get("prompt")?.toString();
  const keywords = formData.get("keywords")?.toString();

  if (!imgFile || !prompt || !keywords) {
    return NextResponse.json(
      { message: "필수 입력란을 확인해주세요." },
      { status: 400 }
    );
  }

  if (imgFile) {
    if (!imgFile.type.startsWith("image/")) {
      return NextResponse.json(
        { message: "이미지 파일만 업로드  가능합니다." },
        { status: 400 }
      );
    }
  }

  const arrayBuffer = await imgFile.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  const s3 = new S3Client({
    region: "ap-northeast-2",
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });

  const fileName = `${uuidv4()}-${imgFile.name}`;
  const bucketName = "draft-player-image";

  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: buffer,
    ContentType: imgFile.type,
  });

  await s3.send(uploadCommand);

  const imageUrl = `https://${bucketName}.s3.amazonaws.com/${fileName}`;

  try {
    const client = await connectDB;
    const db = client.db("heroMe");

    const createData = await db.collection("createData").insertOne({
      username: session.user.username,
      image: imageUrl,
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
