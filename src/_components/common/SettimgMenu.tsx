import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";
import { FaDoorOpen, FaHeart } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

interface SettingMenuProps {
  setOpenSetting: React.Dispatch<SetStateAction<boolean>>;
}

export default function SettingMenu({ setOpenSetting }: SettingMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    setOpenSetting(false);
    router.push("/login");
  };

  const handleMyInfo = () => {
    setOpenSetting(false);
    router.push("/mypage");
  };

  return (
    <div
      className="w-full h-full absolute inset-0
      flex items-center justify-center bg-[#1c1c1cf0]"
    >
      <div className="w-[290px] max-w-[95%] p-2 bg-white rounded-lg overflow-hidden">
        <ul className="w-full bg-gray-100 rounded-lg text-sm font-bold text-[#333]">
          <li
            onClick={handleMyInfo}
            className="p-4 border-b-1 border-[#dfdfdf] flex items-center gap-2 cursor-pointer"
          >
            <FaHeart className="text-[#da6319]" /> 내 정보
          </li>
          <li
            onClick={handleLogout}
            className="p-4 border-b-1 border-[#dfdfdf] flex items-center gap-2 cursor-pointer"
          >
            <FaDoorOpen className="text-[#da6319]" /> 로그아웃
          </li>
          <li
            className="p-4 cursor-pointer flex items-center gap-2"
            onClick={() => setOpenSetting(false)}
          >
            <RiCloseLargeLine className="text-[#da6319]" /> 닫기
          </li>
        </ul>
      </div>
    </div>
  );
}
