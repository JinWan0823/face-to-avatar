import { SetStateAction } from "react";

interface VersionProps {
  selectedVersion: string;
  setSelectedVersion: React.Dispatch<SetStateAction<string>>;
}

export default function VersionRadio({
  selectedVersion,
  setSelectedVersion,
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
        <label htmlFor="version-1">Version 1 - 1번 버전으로 하겠습니다. </label>
      </div>
      <div className="flex items-center gap-1 mt-1">
        <input
          type="radio"
          name="version"
          id="version-2"
          checked={selectedVersion === "version-2"}
          onChange={handleChangeVersion}
        />
        <label htmlFor="version-2">Version 2 - 2번 버전으로 하겠습니다. </label>
      </div>
    </div>
  );
}
