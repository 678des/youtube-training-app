import { CheckLogin } from "@/components/my/check-login";
import { Suspense } from "react";
import { SetVideoList } from "@/components/my/SetVideoList";

export default function Page() {
  return (
    <Suspense>
      <CheckLogin>
        <div>
          <h1>動画一覧</h1>
        </div>
        <SetVideoList />
      </CheckLogin>
    </Suspense>
  );
}
