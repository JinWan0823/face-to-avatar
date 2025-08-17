import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openAi = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: NextRequest) {
  const data = await req.json();
  const { prompt } = data;

  if (!prompt)
    return NextResponse.json(
      { message: "필수 버전을 선택해주세요." },
      { status: 400 }
    );

  const response = await openAi.images.generate({
    model: "gpt-image-1",
    prompt,
    size: "1024x1536",
  });

  const image_base64 = response?.data?.[0].b64_json;
  return NextResponse.json({ image: `data:image/png;base64,${image_base64}` });
}
