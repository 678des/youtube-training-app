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
    //TODO 新規作成のカードを１つ追加。＋の画像でわかりやすく。
    <div className="grid grid-cols-4 p-4 shadow-sm rounded-xl justify-between gap-x-4 gap-y-4 shadow-md">
      {videoSets?.map((data: any, key: any) => (
        <div key={key} className="p-4 rounded-lg  bg-zinc-700 ">
          <h2>{data.title}</h2>
          <div className="w-fit">
            <Link className="block w-fit " href={`sets/${data.video_set_id}`}>
              <img
                src={`https://img.youtube.com/vi/${data.youtube_video_id}/maxresdefault.jpg`}
                className=""
              />
            </Link>
          </div>

          <p>{data.youtube_video_id}</p>
          <p>{data.group}</p>
          <p>{data.level}</p>
        </div>
      ))}

      <div className="w-1/4 p-4 rounded shadow-md">
        <h2>新規作成</h2>
        <div className="w-fit">
          <Link className="block w-fit " href={`new/`}>
            <img src="d" alt="＋画像" />
          </Link>
        </div>
      </div>
    </div>
  );
}
