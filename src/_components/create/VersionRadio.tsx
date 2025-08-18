import { SetStateAction } from "react";

interface VersionProps {
  selectedVersion: string;
  setSelectedVersion: React.Dispatch<SetStateAction<string>>;
  customPrompt: string;
  setCustomPrompt: React.Dispatch<SetStateAction<string>>;
}

export default function VersionRadio({
  selectedVersion,
  setSelectedVersion,
  customPrompt,
  setCustomPrompt,
}: VersionProps) {
  const handleChangeVersion = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedVersion(e.target.id);
  };

  return (
    <div className="text-sm text-[#aaa] mt-2 px-1">
      <div className="flex items-center gap-1">
        <input
          type="radio"
          name="version"
          id="version-1"
          checked={selectedVersion === "version-1"}
          onChange={handleChangeVersion}
        />
        <label htmlFor="version-1">Version 1 - 피규어 스타일 </label>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <input
          type="radio"
          name="version"
          id="version-2"
          checked={selectedVersion === "version-2"}
          onChange={handleChangeVersion}
        />
        <label htmlFor="version-2">Version 2 - 일본풍 애니메이션 스타일 </label>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <input
          type="radio"
          name="version"
          id="version-3"
          checked={selectedVersion === "version-3"}
          onChange={handleChangeVersion}
        />
        <label htmlFor="version-3">Version 3 - 코믹 히어로/카툰 스타일 </label>
      </div>
      <div>
        <div className="flex items-center gap-1 mt-1">
          <input
            type="radio"
            name="version"
            id="version-4"
            checked={selectedVersion === "version-4"}
            onChange={handleChangeVersion}
          />
          <label htmlFor="version-4">사용자 지정 프롬프트</label>
        </div>

        <textarea
          disabled={selectedVersion !== "version-4"}
          className={`w-full mt-1 p-1 min-h-[70px] rounded outline-[#da6319] ${
            selectedVersion === "version-4" ? "bg-white" : "bg-[#d1d1d1]"
          }`}
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
          placeholder="원하는 이미지 스타일, 분위기, 배경 등을 영어로 입력하세요."
        />
      </div>
    </div>
  );
}
