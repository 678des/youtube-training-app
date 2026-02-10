//TODO　もう、ここでURLInputはって、即座に反映すればいいだけでは？
//編集機能つけるとしたらわざわざ二段階で設定する必要ない。

// "LXb3EKWsInQ"
// 標準的な形式: https://www.youtube.com/watch?v=xxxxxxxxxxx
// 短縮形式: https://youtu.be/xxxxxxxxxxx （共有ボタンを押した時によく使われます）
// YouTube ショート: https://www.youtube.com/shorts/xxxxxxxxxxx
// 埋め込み用: https://www.youtube.com/embed/xxxxxxxxxxx

//https://www.youtube.com/watch?v=hSBXH9i5MaY
//IDだけに変換する処理を

"use client";
import ReactPlayer from "react-player";
import { useState } from "react";
import { newVideo } from "@/lib/my/newVideo";
import { createClient } from "@/lib/supabase/client";
import router from "next/navigation";
import { useEffect } from "react";

export function newMovie() {
  const isEditMode = true;

  const [target, setGroup] = useState("chest");
  const [level, setlevel] = useState(9999);
  const [title, settitle] = useState("新しいトレーニングセット");
  const [movieId, setMovieId] = useState<string>("");
  const [url, setUrl] = useState<string>("");

  //   const supabase = await createClient();
  //   const { data } = await supabase.auth.getClaims();
  //   const user = data?.claims;

  const handleURLInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    //正規表現をし、11桁のIDを取得
    //"https://www.youtube.com/watch?v=hSBXH9i5MaY"
    console.log("いまからURL処理");
    const inputUrl = event.target.value;
    const pattern = /https:\/\/\www.youtube.com\/\watch\?v=/;

    if (pattern.test(event.target.value)) {
      const i = inputUrl.match("(?<=v=).*");
      if (!i) return;
      setUrl(i[0]);
    } else {
      alert("正しいURLを貼ってくださいdd");
    }
  };
  //TODO 一歩前に、確認画面を作る（以下の内容でセットします。よろしいですか）
  //   async function createMovieSet(session: any) {
  //     "use client";
  //     let isSuccess = false;
  //     if (!title) {
  //       alert("タイトルを入力してください");
  //       return;
  //     }

  //     try {
  //       await supabase.from("movies").insert([
  //         {
  //           title: title,
  //           user_id: `${user?.session_id}`,
  //           level: level,
  //           target: target,
  //           url: url,
  //         },
  //       ]);
  //       isSuccess = true;
  //     } catch (error) {
  //       console.error("エラー" + error);
  //     }
  //     if (!isSuccess) return;
  //     router.redirect("/set-movie-list");
  //   }
  //   async function editMovieSet() {
  //     //TODO ここで値が正確に入力されているか確認。空白だったらしっかり入力しろというアラート
  //     console.log(title, url, level, target, movieId);
  //     let isSuccess = false;

  //     if (user)
  //       try {
  //         await supabase
  //           .from("movies")
  //           .update({ title: title, url: url, level: level, target: target })
  //           .eq("id", movieId)
  //           .eq("user_id", user?.session_id);
  //         isSuccess = true;
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     if (isSuccess) {
  //       router.redirect("/set-movie-list");
  //     }
  //   }

  //await supabase.from("todos").delete().eq("id", id);

  const handleLevelChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setlevel(parseInt(event.target.value));
  };
  const handleGroupChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setGroup(event.target.value);
  };
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {};

  return (
    <div>
      <h1>新しいトレーニングセット作成mode</h1>
      <div className="flex flex-col">
        <input
          type="text"
          onChange={(event) => settitle(event.target.value)}
          defaultValue={title}
        />
      </div>

      <div className="flex flex-col justify-center">
        <ReactPlayer
          className="m-auto"
          src={`https://www.youtube.com/watch?v=${url}`}
          //TODO onError={}//動画が消された、存在しなかったときの処理
          //あ、前のページに戻って、アラートで存在しなかったって言えばいい
        ></ReactPlayer>
        <input
          type="text"
          onBlur={handleURLInputChange}
          defaultValue={`https://www.youtube.com/watch?v=${url}`}
        />
      </div>

      <div className="flex items-center justify-center">
        <div>
          <h3>きつさ</h3>
          <p>(体力満タン時)</p>
        </div>
        <select onChange={handleLevelChange} value={level}>
          <option value={1}>Lv1.楽</option>
          <option value={2}>Lv2.普通</option>
          <option value={3}>Lv3.きつい</option>
          <option value={4}>Lv4.とてもきつい</option>
          <option value={5}>Lv5.極限</option>
          <option value={3}>自分次第</option>
        </select>
      </div>
      <div className="flex items-center justify-center">
        <h3>鍛える部位</h3>
        <select className="ml-auto" onChange={handleGroupChange} value={target}>
          <option value="chest">胸</option>
          <option value="back">背中</option>
          <option value="shoulders">肩</option>
          <option value="arms">腕</option>
          <option value="legs">足・下半身</option>
          <option value="abs">体幹・腹筋</option>
          <option value="fullbody">全身運動</option>
          <option value="other">その他</option>
        </select>
      </div>
      <button onClick={() => newVideo(title)}>
        上記の内容でトレーニング動画を登録する
      </button>
    </div>
  );
}
