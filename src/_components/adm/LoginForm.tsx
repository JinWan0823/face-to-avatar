"use client";

import Link from "next/link";
import InputType from "../common/InputType";
import { LuEye, LuEyeClosed } from "react-icons/lu";
import useLogin from "@/_hooks/useLogin";

export default function LoginForm() {
  const {
    viewPwd,
    setViewPwd,
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <InputType
        type="text"
        placeholder="아이디를 입력해주세요."
        value={username}
        onChange={setUsername}
      />
      <div className="relative">
        <InputType
          type={viewPwd ? "text" : "password"}
          value={password}
          onChange={setPassword}
        />
        <div
          onClick={() => setViewPwd((prev) => !prev)}
          className="absolute top-1/2 right-2 -translate-y-1/2 text-[#da6319] text-xl cursor-pointer"
        >
          {viewPwd ? <LuEye /> : <LuEyeClosed />}
        </div>
      </div>
      <div className="text-[#aaa] text-sm flex items-center gap-1">
        <input type="checkbox" name="" id="" />
        <label htmlFor="">자동 로그인</label>
      </div>
      <button
        type="submit"
        className="w-full bg-[#da6319] py-2 mt-2 text-white rounded"
      >
        로그인
      </button>
      <ul
        className="flex items-center justify-center
              mt-2 gap-2 text-sm text-[#aaa]"
      >
        <li>
          <Link href={"/"}>회원가입</Link>
        </li>
        |
        <li>
          <Link href={"/"}>아이디 찾기</Link>
        </li>
        |
        <li>
          <Link href={"/"}>비밀번호 찾기</Link>
        </li>
      </ul>
    </form>
  );
}
