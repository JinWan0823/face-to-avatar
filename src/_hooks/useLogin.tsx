import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useAlert } from "@/_context/AlertProvider";

export default function useLogin() {
  const [viewPwd, setViewPwd] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rememberId, setRememberId] = useState(false);
  const [autoLogin, setAutoLogin] = useState(false);

  const router = useRouter();
  const { showAlert } = useAlert();

  useEffect(() => {
    const savedId = localStorage.getItem("savedId");

    if (savedId) {
      setUsername(savedId);
      setRememberId(true);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      username,
      password,
      autoLogin,
    });

    if (res?.error) {
      showAlert("아이디 또는 비밀번호를 확인하세요.");
    } else if (res?.ok) {
      if (rememberId) {
        localStorage.setItem("savedId", username);
      } else {
        localStorage.removeItem("savedId");
      }
      showAlert("로그인에 성공했습니다.");
      router.push("/");
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
    rememberId,
    autoLogin,
    setAutoLogin,
    setRememberId,
  };
}
