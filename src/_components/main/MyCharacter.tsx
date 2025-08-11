"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { GoPlus } from "react-icons/go";

export default function MyCharacter() {
  const { data: session } = useSession();

  return (
    <div>
      <p className="font-bold">
        <span className="text-2xl text-[#da6319] underline">
          {session?.user.nickname}님
        </span>{" "}
        새로운 AI 캐릭터를 만들어보세요!
      </p>
      <ul className="mt-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap w-max">
        <li
          className="w-[110px] h-[160px] relative
          rounded border-2 border-[#da6319] bg-[#fff]"
        >
          <Link
            href={"/create"}
            className="w-full h-full flex items-center justify-center"
          >
            <GoPlus className="text-3xl text-[#da6319]" />
            <span
              className="absolute bottom-2 left-1/2 -translate-x-1/2
                  py-1 px-4 rounded-full
                  bg-[#da6319] text-sm text-white"
            >
              만들기
            </span>
          </Link>
        </li>
        <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
        <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
        <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
        <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
        <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
      </ul>
    </div>
  );
}
