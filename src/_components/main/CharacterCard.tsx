import Image from "next/image";
import Link from "next/link";

interface CardProps {
  item: {
    keywords: string;
    image: string;
    prompt: string;
  };
}

export default function CharacterCard({ item }: CardProps) {
  return (
    <li className="relative">
      <Link
        href={{
          pathname: "/create",
          query: { prompt: item.prompt, keywords: item.keywords },
        }}
      >
        <div className="w-full h-[180px] bg-[#333] rounded-lg overflow-hidden">
          <Image
            src={item.image}
            alt={item.keywords}
            width={206}
            height={180}
            className="object-cover w-full h-full"
          />
        </div>
        <p className="absolute bottom-2 left-2 text-[#aaa] text-sm">
          {item.keywords}
        </p>
      </Link>
    </li>
  );
}
