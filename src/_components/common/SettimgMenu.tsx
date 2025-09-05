import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FaDoorOpen, FaHeart, FaHome } from "react-icons/fa";
import { RiCloseLargeLine } from "react-icons/ri";

interface SettingMenuProps {
  handleModalMenu: () => void;
}

export default function SettingMenu({ handleModalMenu }: SettingMenuProps) {
  const router = useRouter();

  const handleLogout = async () => {
    await signOut({ redirect: false });
    handleModalMenu();
    router.push("/login");
  };

  const handleMyInfo = () => {
    handleModalMenu();
    router.push("/list");
  };

  return (
    <div
      className="w-full h-full absolute inset-0
      flex items-center justify-center bg-[#1c1c1cf0] z-999"
      onClick={handleModalMenu}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-[290px] max-w-[95%] p-2 bg-white rounded-lg overflow-hidden"
      >
        <ul className="w-full bg-gray-100 rounded-lg text-sm font-bold text-[#333]">
          <li
            onClick={handleMyInfo}
            className="p-4 border-b-1 border-[#dfdfdf] flex items-center gap-2 cursor-pointer"
          >
            <FaHome className="text-[#da6319]" /> 메인페이지
          </li>

          <li
            onClick={handleMyInfo}
            className="p-4 border-b-1 border-[#dfdfdf] flex items-center gap-2 cursor-pointer"
          >
            <FaHeart className="text-[#da6319]" /> 마이페이지
          </li>
          <li
            onClick={handleLogout}
            className="p-4 border-b-1 border-[#dfdfdf] flex items-center gap-2 cursor-pointer"
          >
            <FaDoorOpen className="text-[#da6319]" /> 로그아웃
          </li>
          <li
            className="p-4 cursor-pointer flex items-center gap-2"
            onClick={() => handleModalMenu()}
          >
            <RiCloseLargeLine className="text-[#da6319]" /> 닫기
          </li>
        </ul>
      </div>
    </div>
  );
}
