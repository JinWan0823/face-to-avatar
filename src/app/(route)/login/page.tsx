import LoginForm from "@/_components/adm/LoginForm";
import Image from "next/image";

export default function LoginPage() {
  return (
    <main
      className="w-full max-w-[460px] 
          mx-auto bg-[#fdf2e3]"
    >
      <div
        className="inner w-[95%] min-h-[100vh] mx-auto py-10 
                  flex flex-col items-center justify-center"
      >
        <div className="logo w-full">
          <Image
            src={"/main/logo.png"}
            width={350}
            height={240}
            alt="logo"
            className="w-full"
          />
        </div>
        <LoginForm />
      </div>
    </main>
  );
}
