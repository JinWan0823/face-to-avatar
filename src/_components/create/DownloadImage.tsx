import { CiImageOn } from "react-icons/ci";
import LoadingSpinner from "../common/LoadingSpinner";
import Image from "next/image";

interface ImgProps {
  generatePreview: string;
}

export default function DownloadImage({ generatePreview }: ImgProps) {
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

      <button className="w-full p-3 mt-4 bg-[#da6319] rounded text-white">
        저장하기
      </button>
    </>
  );
}
