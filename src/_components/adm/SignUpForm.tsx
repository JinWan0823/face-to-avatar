"use client";
import InputType from "@/_components/common/InputType";
import useSignUp from "@/_hooks/useSignUp";
import { LuEye, LuEyeClosed } from "react-icons/lu";

export default function SignUpForm() {
  const { viewPwd, setViewPwd, username, setUsername, password, setPassword } =
    useSignUp();
  return (
    <form>
      <div>
        <p className="text-sm font-bold text-[#aaa]">
          이메일 <span className="text-red-500">*</span>
        </p>
        <InputType
          type="text"
          placeholder={"e-mail을 입력해주세요."}
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-[#aaa]">
          닉네임 <span className="text-red-500">*</span>
        </p>
        <InputType
          type="text"
          placeholder={"닉네임을 입력해주세요."}
          value={username}
          onChange={setUsername}
        />
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-[#aaa]">
          비밀번호 <span className="text-red-500">*</span>
        </p>
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
      </div>
      <div className="mt-2">
        <p className="text-sm font-bold text-[#aaa]">
          비밀번호 확인 <span className="text-red-500">*</span>
        </p>
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
      </div>

      <button
        type="submit"
        className="w-full bg-[#da6319] py-2 mt-2 text-white rounded"
      >
        회원가입
      </button>
    </form>
  );
}
