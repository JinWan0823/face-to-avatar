"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import SettingMenu from "./SettimgMenu";
import { CgMenuRightAlt } from "react-icons/cg";

export default function Header() {
  const pathname = usePathname();
  const [openSetting, setOpenSetting] = useState(false);

  if (pathname === "/login" || pathname === "/signup") {
    return null;
  }

  return (
    <>
      <header
        className="w-full py-1 px-1 absolute top-0
      flex items-center justify-between 
      bg-white shadow-lg"
      >
        <Link href={"/"} className="w-[120px]">
          <Image
            src={"/main/logo.png"}
            alt="logo"
            width={384}
            height={162}
            className="w-full"
          />
        </Link>
        <button
          type="button"
          onClick={() => {
            setOpenSetting(true);
            document.documentElement.classList.add("modal-open");
          }}
        >
          <CgMenuRightAlt className="text-[#da6319] text-3xl" />
        </button>
      </header>
      {openSetting && <SettingMenu setOpenSetting={setOpenSetting} />}
    </>
  );
}
