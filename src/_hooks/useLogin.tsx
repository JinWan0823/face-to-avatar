import { useState } from "react";
import { signIn } from "next-auth/react";

export default function useLogin() {
  const [viewPwd, setViewPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
    });

    if (res?.error) {
      alert(res.error);
      return;
    } else {
      alert("로그인에 성공했습니다.");
    }
  };

  return {
    viewPwd,
    setViewPwd,
    username,
    setUsername,
    password,
    setPassword,
    handleSubmit,
  };
}
