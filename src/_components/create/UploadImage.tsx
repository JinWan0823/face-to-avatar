"use client";
import Image from "next/image";
import { useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import VersionRadio from "./VersionRadio";
import CropImage from "./CropImage";
import { FaCropSimple } from "react-icons/fa6";

export default function UploadImage() {
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [imgPreview, setImgPreview] = useState("");
  const [selectedVersion, setSelectedVersion] = useState("version-1");
  const [openCropImg, setCropImg] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImgPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const files = e.dataTransfer.files;
    if (files && files.length > 0 && fileInputRef.current) {
      const dataTransfer = new DataTransfer();
      dataTransfer.items.add(files[0]);
      fileInputRef.current.files = dataTransfer.files;

      setImgPreview(URL.createObjectURL(files[0]));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleLabelClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleResetBtn = () => {
    if (fileInputRef.current) {
      fileInputRef.current.files = null;
    }
    setImgPreview("");
    setSelectedVersion("version-1");
  };

  const handleModalMenu = () => {
    setCropImg((prev) => !prev);
    document.getElementById("main-wrapper")?.classList.toggle("modal-open");
  };

  return (
    <>
      <div className="img-box relative w-full bg-white rounded shadow-lg">
        <div
          className="w-full p-1 bg-gray-100
          flex itesm-center justify-between"
        >
          <p
            className="text-sm text-gray-400
            flex items-center gap-1"
          >
            <CiImageOn /> IMG
          </p>
          {imgPreview && (
            <button
              onClick={handleModalMenu}
              className="text-sm px-2 bg-[#da6319] rounded text-white
            flex items-center gap-1"
            >
              <FaCropSimple />
              Edit
            </button>
          )}
        </div>
        <input
          type="file"
          onChange={handleFileChange}
          id="image-upload"
          className="hidden"
          accept="image/*"
          ref={fileInputRef}
        />
        <label
          onClick={handleLabelClick}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          className="block w-full h-[230px] relative cursor-pointer overflow-hidden"
        >
          {imgPreview ? (
            <Image
              src={imgPreview}
              width={420}
              height={230}
              alt="upload-img"
              className="w-full h-full object-contain"
            />
          ) : (
            <p
              className="text-[#aaa] text-center w-full
              absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 "
            >
              이미지를 끌어오거나 클릭하여 업로드해주세요.
            </p>
          )}
        </label>
      </div>

      {openCropImg && (
        <CropImage
          handleModalMenu={handleModalMenu}
          imgPreview={imgPreview}
          setImgPreview={setImgPreview}
        />
      )}

      <VersionRadio
        selectedVersion={selectedVersion}
        setSelectedVersion={setSelectedVersion}
      />

      <div className="mt-2 flex gap-2">
        <button
          onClick={handleResetBtn}
          className="flex-1 bg-gray-300 p-3 rounded"
        >
          초기화
        </button>
        <button className="flex-1 bg-[#da6319] text-white p-3 rounded">
          이미지 생성
        </button>
      </div>
    </>
  );
}
