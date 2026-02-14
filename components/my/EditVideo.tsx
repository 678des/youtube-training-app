"use client";
// import { editVideo } from "@/lib/my/editVideo";
import { CreateVideoSet } from "@/lib/my/newVideo";
import Link from "next/link";
export function EditVideo({
  youtubeVideoSetId,
}: {
  youtubeVideoSetId: string;
}) {
  return (
    <>
      <Link rel="stylesheet" href={`/new?mode=edit&id=${youtubeVideoSetId}`}>
        編集
      </Link>
    </>
  );
}
