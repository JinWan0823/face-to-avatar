"use client";

import { useState } from "react";
import DownloadImage from "./DownloadImage";
import UploadImage from "./UploadImage";

export default function ImageCreateWrap() {
  const [generatePreview, setGeneratePreview] = useState("");
  return (
    <>
      <UploadImage setGeneratePreview={setGeneratePreview} />
      <DownloadImage generatePreview={generatePreview} />
    </>
  );
}
