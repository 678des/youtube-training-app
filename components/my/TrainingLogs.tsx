"use client";
import { useEffect, useState } from "react";
import { getTrainingLogs } from "@/lib/my/getTrainingLogs";
import { cdate } from "cdate";
import { getUser } from "@/lib/my/getUser";

//import  from
export default function TrainingLog() {
  //TODO 表示形式をタブで変えられるようにする（〇〇ごとのグラフ、表、など）

  const [displayFormat, setDisplayFormat] = useState("graph");
  const [trainingLogs, setTrainingLogs] = useState<any>();
  const [userName, setUserName] = useState<string | any>();

  const getUserName = async () => {
    const user = await getUser();
    return user?.email;
  };

  const fetchTrainingLog = async () => {
    const data = await getTrainingLogs();
    console.log(data);
    if (!data) return;
    setTrainingLogs(data);
  };
  useEffect(() => {
    fetchTrainingLog();
    setUserName(getUserName());
  }, []);

  return (
    <>
      <div className="flex flex-col">
        {userName && <h1>[{userName}]さんのtraining記録</h1>}
        {trainingLogs &&
          trainingLogs.map((data: any, key: any) => (
            <div key={key} className="flex flex-row gap-x-6">
              {cdate(data.created_at).format("YYYY-MM-DD")}
              <p>{data.group}</p>
              <a
                href={`https://www.youtube.com/watch?v=${data.youtube_video_id}`}
              >
                動画
              </a>
              <p>自覚的運動強度：{data.level}</p>
            </div>
          ))}
        {displayFormat == "graph" ? <></> : <></>}
      </div>
    </>
  );
}
