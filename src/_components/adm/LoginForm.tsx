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
    rememberId,
    autoLogin,
    setAutoLogin,
    setRememberId,
  } = useLogin();

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-2 w-full">
      <InputType
        type="text"
        placeholder={"아이디를 입력해주세요."}
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
      <div className="flex gap-2">
        <div className="text-[#aaa] text-sm flex items-center gap-1">
          <input
            type="checkbox"
            id="save-id"
            onChange={() => setRememberId((prev) => !prev)}
            checked={rememberId}
          />
          <label htmlFor="save-id" className="text-sm ml-1 text-gray-400">
            아이디 저장
          </label>
        </div>
        <div className="text-[#aaa] text-sm flex items-center gap-1">
          <input
            type="checkbox"
            id="save-login"
            onChange={() => setAutoLogin((prev) => !prev)}
            checked={autoLogin}
          />
          <label htmlFor="save-login" className="text-sm ml-1 text-gray-400">
            자동 로그인
          </label>
        </div>
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
          <Link href={"/signup"}>회원가입</Link>
        </li>
        {/* |
        <li>
          <Link href={"/"}>비밀번호 찾기</Link>
        </li> */}
      </ul>
    </form>
  );
}
