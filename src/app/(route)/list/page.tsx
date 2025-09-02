"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import Image from "next/image";
import { aiSample } from "../../../../ai-data";

const ITEMS_PER_PAGE = 15;

export default function ListPage() {
  const [visibleItems, setVisibleItems] = useState(
    aiSample.slice(0, ITEMS_PER_PAGE)
  );
  const [page, setPage] = useState(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(() => {
    const nextPage = page + 1;
    const nextItems = aiSample.slice(0, nextPage * ITEMS_PER_PAGE);
    setVisibleItems(nextItems);
    setPage(nextPage);
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && visibleItems.length < aiSample.length) {
          loadMore();
        }
      },
      {
        rootMargin: "100px",
      }
    );

    if (loaderRef.current) observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) observer.unobserve(loaderRef.current);
    };
  }, [loadMore, visibleItems]);

  return (
    <div className="inner w-full min-h-[100vh] mx-auto">
      <ul className="w-full grid grid-cols-3 gap-0">
        {visibleItems.map((item, idx) => (
          <li
            key={idx}
            className="w-full h-[160px] bg-[#333] border-1 border-white"
          >
            <Image
              src={item.image}
              alt={`${item.image}-img`}
              width={110}
              height={160}
              className="object-cover w-full h-full"
            />
          </li>
        ))}
      </ul>

      <div
        ref={loaderRef}
        className="h-[50px] my-6 flex items-center justify-center"
      >
        {visibleItems.length < aiSample.length ? (
          <p className="text-gray-300 font-bold">로딩 중...</p>
        ) : (
          <p className="text-gray-300 font-bold">더 이상 게시글이 없습니다.</p>
        )}
      </div>
    </div>
  );
}
