"use client";

import { useEffect, useState } from "react";
import DownloadImage from "./DownloadImage";
import UploadImage from "./UploadImage";
import { useRouter, useSearchParams } from "next/navigation";
import { useAlert } from "@/_context/AlertProvider";
import { prompts } from "../../../ai-data";

export default function ImageCreateWrap() {
  const searchParams = useSearchParams();
  const [generatePreview, setGeneratePreview] = useState("");
  const [keywords, setKeywords] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("version-1");
  const [imgFile, setImgFile] = useState<File | null>(null);

  const { showAlert } = useAlert();
  const router = useRouter();

  useEffect(() => {
    const promptFromQuery = searchParams.get("prompt");
    const keywordsFromQuery = searchParams.get("keywords");

    if (keywordsFromQuery) setKeywords(keywordsFromQuery);
    if (promptFromQuery) {
      setSelectedVersion("version-4");
      setCustomPrompt(promptFromQuery);
    }
  }, [searchParams]);

  const handleSave = async () => {
    if (!generatePreview) {
      showAlert("저장할 이미지가 없습니다.");
      return;
    }

    const prompt =
      selectedVersion === "version-4" ? customPrompt : prompts[selectedVersion];

    try {
      const res = await fetch(generatePreview);
      const blob = await res.blob();
      const file = new File([blob], "generated.png", { type: "image/png" });

      const formData = new FormData();
      formData.append("imgFile", file);
      formData.append("prompt", prompt);
      formData.append("keywords", keywords);

      const result = await fetch("/api/story", {
        method: "POST",
        body: formData,
      });

      const json = await result.json();
      if (!result.ok) {
        showAlert(json.message);
        return;
      }

      showAlert("이미지 저장에 성공했습니다.");
      router.push("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <UploadImage
        setGeneratePreview={setGeneratePreview}
        setCustomPrompt={setCustomPrompt}
        customPrompt={customPrompt}
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
        imgFile={imgFile}
        setImgFile={setImgFile}
      />
      <DownloadImage
        generatePreview={generatePreview}
        setKeywords={setKeywords}
        keywords={keywords}
        handleSave={handleSave}
      />
    </>
  );
}
