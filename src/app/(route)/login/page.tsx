import LoginForm from "@/_components/adm/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <div
      className="inner w-[95%] min-h-[100vh] mx-auto py-10 
                  flex flex-col items-center justify-center"
    >
      <div className="logo w-full">
        <Image
          src={"/main/logo.png"}
          width={384}
          height={162}
          alt="logo"
          className="w-full"
        />
      </div>
      <LoginForm />
    </div>
  );
}
