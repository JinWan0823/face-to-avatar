"use client";

import { useEffect, useState } from "react";
import DownloadImage from "./DownloadImage";
import UploadImage from "./UploadImage";
import { useSearchParams } from "next/navigation";

export default function ImageCreateWrap() {
  const searchParams = useSearchParams();
  const [generatePreview, setGeneratePreview] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("version-1");

  useEffect(() => {
    const promptFromQuery = searchParams.get("prompt");
    const keywordsFromQuery = searchParams.get("keywords");

    if (keywordsFromQuery) setKeywords(keywordsFromQuery);
    if (promptFromQuery) {
      setSelectedVersion("version-4");
      setCustomPrompt(promptFromQuery);
    }
  }, [searchParams]);

  return (
    <>
      <UploadImage
        setGeneratePreview={setGeneratePreview}
        setCustomPrompt={setCustomPrompt}
        customPrompt={customPrompt}
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
      />
      <DownloadImage
        generatePreview={generatePreview}
        setKeywords={setKeywords}
        keywords={keywords}
      />
    </>
  );
}
