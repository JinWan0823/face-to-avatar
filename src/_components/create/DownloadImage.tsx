import { CiImageOn } from "react-icons/ci";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";
import InputType from "../common/InputType";
import { SetStateAction } from "react";

interface ImgProps {
  generatePreview: string;
  keywords: string;
  setKeywords: React.Dispatch<SetStateAction<string>>;
}

export default function DownloadImage({
  generatePreview,
  keywords,
  setKeywords,
}: ImgProps) {
  return (
    <>
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
          {generatePreview ? (
            <Image
              src={generatePreview}
              alt="generate-img"
              width={1080}
              height={1940}
              className="w-full object-fit"
            />
          ) : (
            <LoadingSpinner />
          )}
        </div>
      </div>

      <div className="mt-1 bg-white">
        <InputType
          type="text"
          value={keywords}
          onChange={setKeywords}
          placeholder="키워드를 입력해주세요. ex) #OOO"
        />
      </div>

      <button className="w-full p-3 mt-4 bg-[#da6319] rounded text-white">
        저장하기
      </button>
    </>
  );
}
