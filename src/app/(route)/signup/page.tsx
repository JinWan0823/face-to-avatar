import SignUpForm from "@/_components/adm/SignUpForm";
import Image from "next/image";

export default function SignUpPage() {
  return (
    <>
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
          <SignUpForm />
        </div>
      </div>
    </>
  );
}
