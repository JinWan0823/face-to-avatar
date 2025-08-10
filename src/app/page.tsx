import CharacterCard from "@/_components/main/CharacterCard";
import { checkUser } from "@/_lib/checkUser";
import { GoPlus } from "react-icons/go";

export default async function Home() {
  await checkUser();
  return (
    <>
      <div className="inner w-[95%] min-h-[100vh] mx-auto py-8">
        <div>
          <p className="font-bold">
            <span className="text-2xl text-[#da6319] underline">
              듀두듀듀님
            </span>{" "}
            새로운 AI 캐릭터를 만들어보세요!
          </p>
          <ul className="mt-2 flex items-center gap-2 overflow-x-auto whitespace-nowrap w-max">
            <li
              className="w-[110px] h-[160px] rounded border-2 border-[#da6319] bg-[#fff]
              flex items-center justify-center relative"
            >
              <GoPlus className="text-3xl text-[#da6319]" />
              <span
                className="absolute bottom-2 left-1/2 -translate-x-1/2
                py-1 px-4 rounded-full
                bg-[#da6319] text-sm text-white"
              >
                만들기
              </span>
            </li>
            <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
            <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
            <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
            <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
            <li className="w-[110px] h-[160px] rounded bg-[#333]"></li>
          </ul>
        </div>

        <div className="mt-10 text-xl font-bold">
          <p>다른 사람들이 만든 캐릭터</p>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
          </ul>
        </div>
      </div>
    </>
  );
}
