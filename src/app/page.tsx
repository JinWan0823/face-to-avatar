import { checkUser } from "@/_lib/checkUser";

export default async function Home() {
  await checkUser();
  return (
    <>
      <main
        className="w-full max-w-[460px] 
          mx-auto bg-[#fdf2e3]"
      >
        <div
          className="inner w-[95%] min-h-[100vh] mx-auto py-10 
          flex flex-col items-center justify-center"
        ></div>
      </main>
    </>
  );
}
