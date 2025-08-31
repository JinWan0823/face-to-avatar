import Image from "next/image";
import { aiSample } from "../../../../ai-data";

export default function ListPage() {
  return (
    <div className="inner w-full min-h-[100vh] mx-auto">
      <ul className="w-full grid grid-cols-3 gap-0">
        {aiSample.map((item, idx) => (
          <li
            key={idx}
            className="w-full h-[160px] bg-[#333] border-1 border-white"
          >
            <Image
              src={item.image}
              alt={`${item.image}-img`}
              width={110}
              height={160}
              className="object-cover w-full h-full"
            />
          </li>
        ))}
      </ul>
      <p className="w-full text-center text-gray-300 font-bold my-6">
        더 이상 게시글이 없습니다.
      </p>
    </div>
  );
}
