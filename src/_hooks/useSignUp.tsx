"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function useSignUp() {
  const [viewPwd, setViewPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [pwdChk, setPwdChk] = useState("");

  const router = useRouter();

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = { username, nickname, password };

    try {
      if (!username || !nickname || !password || !pwdChk) {
        alert("필수 입력사항을 확인하세요.");
        return;
      }

      if (password !== pwdChk) {
        alert("비밀번호를 확인해주세요.");
        return;
      }

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const json = await res.json();
      if (!res.ok) {
        alert(json.message);
        return;
      }

      alert(json.message);
      router.push("/login");
    } catch (error) {
      console.error("회원가입 실패", error);
    }
  };

  return {
    viewPwd,
    setViewPwd,
    username,
    setUsername,
    password,
    setPassword,
    nickname,
    setNickname,
    pwdChk,
    setPwdChk,
    handleSignUp,
  };
}
