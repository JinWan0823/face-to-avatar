import LoadingSpinner from "@/_components/common/LoadingSpinner";
import { CiImageOn } from "react-icons/ci";

export default async function CreatePage() {
  return (
    <>
      <div className="inner w-[95%] min-h-[100vh] mx-auto py-8">
        <div className="img-box relative w-full h-[230px] bg-white rounded shadow-lg">
          <p
            className="w-full px-1 bg-gray-100 text-sm text-gray-400
            flex items-center gap-1"
          >
            <CiImageOn /> IMG
          </p>
          <p
            className="text-[#aaa] text-center w-full
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
          >
            이미지를 끌어오거나 클릭하여 업로드해주세요.
          </p>
        </div>

        <div className="text-sm text-[#aaa] mt-2 px-1">
          <div className="flex items-center gap-1">
            <input type="radio" name="version" id="version-1" />
            <label htmlFor="version-1">
              Version 1 - 1번 버전으로 하겠습니다.{" "}
            </label>
          </div>
          <div className="flex items-center gap-1 mt-1">
            <input type="radio" name="version" id="version-2" />
            <label htmlFor="version-2">
              Version 2 - 2번 버전으로 하겠습니다.{" "}
            </label>
          </div>
        </div>

        <div className="mt-2 flex gap-2">
          <button className="flex-1 bg-gray-300 p-3 rounded">초기화</button>
          <button className="flex-1 bg-[#da6319] text-white p-3 rounded">
            이미지 생성
          </button>
        </div>

        <div
          className="img-box relative w-full mt-8 
          bg-white rounded shadow-lg"
        >
          <p
            className="w-full px-1 bg-gray-100 text-sm text-gray-400
            flex items-center gap-1"
          >
            <CiImageOn /> IMG
          </p>
          <div className="w-full h-[460px] flex items-center justify-center">
            <LoadingSpinner />
          </div>
        </div>

        <button className="w-full p-3 mt-4 bg-[#da6319] rounded text-white">
          저장하기
        </button>
      </div>
    </>
  );
}
