import Image from "next/image";
import { SetStateAction, useRef, useState } from "react";
import ReactCrop, { Crop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

interface SettingMenuProps {
  handleModalMenu: () => void;
  imgPreview: string;
  setImgPreview: React.Dispatch<SetStateAction<string>>;
  setImgFile: React.Dispatch<SetStateAction<File | null>>;
}

export default function CropImage({
  handleModalMenu,
  imgPreview,
  setImgPreview,
  setImgFile,
}: SettingMenuProps) {
  const [crop, setCrop] = useState<Crop>({
    unit: "%",
    width: 30,
    height: 30,
    x: 0,
    y: 0,
  });

  const imageRef = useRef<HTMLImageElement | null>(null);

  const onImageLoaded = (image: HTMLImageElement) => {
    imageRef.current = image;
  };

  const onCropComplete = (crop: Crop) => {
    setCrop(crop);
  };

  const onCropChange = (crop: Crop) => {
    setCrop(crop);
  };

  const handleSave = () => {
    if (imageRef.current && crop.width && crop.height) {
      const canvas = document.createElement("canvas");
      const image = imageRef.current;
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const context = canvas.getContext("2d");

      canvas.width = crop.width;
      canvas.height = crop.height;

      // 크롭된 이미지 그리기
      context?.drawImage(
        image,
        crop.x * scaleX,
        crop.y * scaleY,
        crop.width * scaleX,
        crop.height * scaleY,
        0,
        0,
        crop.width,
        crop.height
      );

      // Blob을 Data URL로 변환
      const imageExtension = imgPreview.split(".").pop(); // 파일 확장자 추출
      const imageType = imageExtension === "png" ? "image/png" : "image/jpeg";

      // Blob 생성 후 File로 변환
      canvas.toBlob((blob) => {
        if (!blob) return;

        const fileName = `cropped-image.${
          imageExtension === "png" ? "png" : "jpg"
        }`;
        const croppedFile = new File([blob], fileName, { type: imageType });

        const croppedUrl = URL.createObjectURL(croppedFile);
        setImgPreview(croppedUrl);
        setImgFile(croppedFile);
        handleModalMenu();
      }, imageType);
    }
  };

  return (
    <div
      className="w-full min-h-[100vh] overflow-y-auto absolute inset-0 p-2 py-8
       bg-[#1c1c1cf0] z-999"
    >
      <div className="w-full">
        <div className="border-2 border-white">
          <ReactCrop
            crop={crop}
            onChange={onCropChange}
            onComplete={onCropComplete}
            circularCrop={false}
            minWidth={50}
            minHeight={50}
            className="w-full"
          >
            <Image
              src={imgPreview}
              alt="crop-img"
              width={320}
              height={160}
              onLoad={(e) => onImageLoaded(e.target as HTMLImageElement)}
              className="w-full object-contain"
            />
          </ReactCrop>
        </div>
        <div className="w-full mt-2 flex gap-2">
          <button
            onClick={handleModalMenu}
            className="flex-1 bg-gray-300 p-3 rounded"
          >
            취소
          </button>
          <button
            onClick={handleSave}
            className="flex-1 bg-[#da6319] text-white p-3 rounded"
          >
            완료
          </button>
        </div>
      </div>
    </div>
  );
}
