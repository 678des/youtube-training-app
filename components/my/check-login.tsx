import { createClient } from "@/lib/supabase/server";
import { Suspense } from "react";

export async function CheckLogin({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();

  const { data } = await supabase.auth.getClaims();

  const user = data?.claims;

  console.log("CheckLogin: user =", user);

  //TODO: ログインしていない場合、ログインページにリダイレクトする処理を追加する

  return <>{user ? children : "o"}</>;
}
