import { checkUser } from "@/_lib/checkUser";
import { GoPlus } from "react-icons/go";

export default async function Home() {
  await checkUser();
  return (
    <>
      <div className="inner w-[95%] min-h-[100vh] mx-auto pt-24 py-8">
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
              flex items-center justify-center"
            >
              <GoPlus className="text-3xl text-[#da6319]" />
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
        </div>
      </div>
    </>
  );
}
