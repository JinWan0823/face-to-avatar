import CharacterCard from "@/_components/main/CharacterCard";
import MyCharacter from "@/_components/main/MyCharacter";
import { checkUser } from "@/_lib/checkUser";
import { aiSample } from "../../ai-data";

export default async function Home() {
  await checkUser();
  return (
    <>
      <div className="inner w-[95%] min-h-[100vh] mx-auto py-8">
        <MyCharacter />

        <div className="mt-10 text-xl font-bold">
          <p>다른 사람들이 만든 캐릭터</p>
          <ul className="grid grid-cols-2 gap-2 mt-2">
            {/* <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard />
            <CharacterCard /> */}
            {aiSample.map((item, idx) => (
              <CharacterCard item={item} key={idx} />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
