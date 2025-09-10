"use client";
import LoadingSpinner from "@/_components/common/LoadingSpinner";
import ImageCreateWrap from "@/_components/create/ImageCreateWrap";
import { Suspense } from "react";

export default function CreatePage() {
  return (
    <>
      <div className="inner w-[95%] min-h-[100vh] mx-auto py-8">
        <Suspense fallback={<LoadingSpinner />}>
          <ImageCreateWrap />
        </Suspense>
      </div>
    </>
  );
}
