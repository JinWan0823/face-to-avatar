"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GoPlus } from "react-icons/go";
import { aiSample } from "../../../ai-data";
import { useHorizontalScroll } from "@/_hooks/useHorizontalScroll";
import Image from "next/image";
import ViewImage from "./ViewImage";
import { useEffect, useState } from "react";
import { useAlert } from "@/_context/AlertProvider";

interface CardTypes {
  username: string;
  prompt: string;
  image: string;
  keywords: string;
}

export default function MyCharacter() {
  const { data: session } = useSession();
  const listWrapperRef = useHorizontalScroll();

  const [visibleImg, setVisibleImg] = useState(false);
  const [viewImg, setViewImg] = useState("");
  const [chkImgIdx, setChkImgIdx] = useState(0);
  const [myCard, setMyCard] = useState<CardTypes[]>([]);

  const handleViewImg = (img: string, idx: number) => {
    setVisibleImg(true);
    setViewImg(img);
    setChkImgIdx(idx);
    document.getElementById("main-wrapper")?.classList.add("modal-open");
  };

  const handleCloseImg = () => {
    setViewImg("");
    setVisibleImg(false);
    setChkImgIdx(0);
    document.getElementById("main-wrapper")?.classList.remove("modal-open");
  };

  // 유저 생성 데이터 조회 추가
  useEffect(() => {
    // const data = fetch("/api/recentStory");
    // console.log(JSON.stringify(data));
    const fetchData = async () => {
      try {
        const res = await fetch("/api/recentStory");
        const data = await res.json();
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <div>
        <p className="font-bold">
          <span className="text-2xl text-[#da6319] underline">
            {session?.user.nickname}님
          </span>{" "}
          새로운 AI 캐릭터를 만들어보세요!
        </p>
        <ul
          ref={listWrapperRef}
          className="scrollbar-none mt-2 flex items-center gap-2 overflow-x-auto"
        >
          <li
            className="w-[110px] h-[160px] relative flex-shrink-0
          rounded border-2 border-[#da6319] bg-[#fff]"
          >
            <Link
              href={"/create"}
              className="w-[full] h-full flex items-center justify-center"
            >
              <GoPlus className="text-3xl text-[#da6319]" />
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2
                  py-1 px-4 rounded-full w-[80px] text-center
                  bg-[#da6319] text-sm text-white"
              >
                만들기
              </span>
            </Link>
          </li>

          {myCard.map((item, idx) => (
            <li
              key={idx}
              className="relative w-[110px] h-[160px] flex-shrink-0 rounded overflow-hidden cursor-pointer"
              onClick={() => handleViewImg(item.image, idx)}
            >
              <Image
                src={item.image}
                alt={`${item.image}-img`}
                width={110}
                height={160}
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#0000008c]"></div>
            </li>
          ))}
        </ul>
      </div>
      {visibleImg && (
        <ViewImage
          img={viewImg}
          item={aiSample}
          chkImgIdx={chkImgIdx}
          handleViewImg={handleViewImg}
          handleCloseImg={handleCloseImg}
        />
      )}
    </>
  );
}
