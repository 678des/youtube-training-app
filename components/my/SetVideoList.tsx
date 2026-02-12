"use client";
import { getVideo } from "@/lib/my/getVideo";
import Link from "next/link";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player";
export function SetVideoList() {
  //TODO contextでデータ管理
  const [videoSets, setVideoSets] = useState<any>();
  const fetchData = async () => {
    const i = await getVideo();
    setVideoSets(i);
    console.log(i, "kore");
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      {videoSets?.map((data: any, key: any) => (
        <div key={key} className="flex flex-col items-center">
          <h2>{data.title}</h2>

          <Link className="bg-white" href={`sets/${data.video_set_id}`}>
            <img
              src="https://img.youtube.com/vi/hSBXH9i5MaY/maxresdefault.jpg"
              className="w-1/3"
            />
          </Link>

          <p>{data.youtube_video_id}</p>
          <p>{data.group}</p>
          <p>{data.level}</p>
        </div>
      ))}
    </>
  );
}
