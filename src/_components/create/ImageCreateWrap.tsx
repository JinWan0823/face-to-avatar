"use client";

import { useState } from "react";
import DownloadImage from "./DownloadImage";
import UploadImage from "./UploadImage";

export default function ImageCreateWrap() {
  const [generatePreview, setGeneratePreview] = useState("");
  const [keywords, setKeywords] = useState("");

  return (
    <>
      <UploadImage setGeneratePreview={setGeneratePreview} />
      <DownloadImage
        generatePreview={generatePreview}
        setKeywords={setKeywords}
        keywords={keywords}
      />
    </>
  );
}
