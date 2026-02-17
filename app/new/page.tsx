"use client";
import { Suspense } from "react"; // 1. Suspenseをインポート
import { newMovie as NewMovie } from "@/components/my/create-Edit-form";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

// 3. デフォルトエクスポートでは Suspense で包むだけにする
export default function Page() {
  useEffect(() => {}, []);
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <main>
        <NewMovie />
      </main>
    </Suspense>
  );
}
