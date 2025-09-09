import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SessionProviderWrapper from "./SessionProviderWrapper";
import Header from "@/_components/common/Header";
import { AlertProvider } from "@/_context/AlertProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HeroMe - 나만의 히어로 캐릭터 만들기",
  description:
    "사진을 업로드하고 원하는 스타일을 선택해 나만의 캐릭터를 생성해 보세요. 다양한 효과와 만화풍 변환도 지원합니다!",
  keywords: ["히어로", "캐릭터 생성", "아바타", "만화 변환", "AI 이미지"],
  openGraph: {
    title: "HeroMe - 나만의 히어로 캐릭터 만들기",
    description:
      "AI를 이용해 나만의 캐릭터를 만들어 보세요. 특별한 프로필 이미지로 활용 가능합니다!",
    url: "https://hero-me.vercel.app/",
    siteName: "HeroMe",
    images: [
      {
        url: "https://hero-me.vercel.app/og-image.png", // 실제 대표 이미지 경로
        width: 1200,
        height: 630,
        alt: "HeroMe 캐릭터 미리보기",
      },
    ],
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "HeroMe - 나만의 히어로 캐릭터 만들기",
    description: "사진과 키워드로 나만의 캐릭터를 AI가 생성해 드립니다.",
    images: ["https://hero-me.vercel.app/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper>
          <main
            id="main-wrapper"
            className="w-full max-w-[460px] max-h-[100vh] relative overflow-hidden overflow-y-auto
            mx-auto bg-[#fdf2e3] border-l-1 border-r-1 border-[#dfdfdf]"
          >
            <AlertProvider>
              <Header />
              {children}
            </AlertProvider>
          </main>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
