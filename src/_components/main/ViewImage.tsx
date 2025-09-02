import Image from "next/image";
import Link from "next/link";
import { MdOutlineClose } from "react-icons/md";

interface ViewImgProps {
  img: string;
  item: ItemProps[];
  chkImgIdx: number;
  handleCloseImg: () => void;
  handleViewImg: (img: string, idx: number) => void;
}

interface ItemProps {
  image: string;
  keywords: string;
  prompt: string;
}

export default function ViewImage({
  img,
  item,
  chkImgIdx,
  handleCloseImg,
  handleViewImg,
}: ViewImgProps) {
  return (
    <div className="absolute inset-0 bg-[#000] z-9999">
      <button
        onClick={handleCloseImg}
        className="absolute top-7 right-2 text-4xl text-white z-9999"
      >
        <MdOutlineClose />
      </button>
      <ul className="absolute top-1 w-full flex gap-1 p-2">
        {item.map((_, idx) => (
          <li
            className={`w-full rounded-[2px] h-1 ${
              chkImgIdx === idx ? "bg-white" : "bg-gray-400"
            }`}
            key={idx}
          ></li>
        ))}
      </ul>
      <Image
        src={img}
        alt={`${img}-img`}
        width={458}
        height={919}
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 flex">
        <div
          className="w-[50%] h-full"
          onClick={() => {
            if (chkImgIdx === 0) return;
            handleViewImg(item[chkImgIdx - 1].image, chkImgIdx - 1);
          }}
        ></div>
        <div
          className="w-[50%] h-full"
          onClick={() => {
            if (chkImgIdx === item.length - 1) {
              handleCloseImg();
              return;
            }
            handleViewImg(item[chkImgIdx + 1].image, chkImgIdx + 1);
          }}
        ></div>
      </div>
      <Link
        href={"/"}
        className="absolute left-1/2 bottom-2 -translate-x-1/2
        font-bold text-white p-1 px-4
        bg-[#da6319] border-2 border-point rounded-full
      "
      >
        전체보기
      </Link>
    </div>
  );
}
