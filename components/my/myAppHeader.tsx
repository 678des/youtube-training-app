import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { hasEnvVars } from "@/lib/utils";
import { Suspense } from "react";
import { createClient } from "@/lib/supabase/client";

//import { useRouter } from "next/navigation";

export async function NavVar() {
  const ParenUl = ({ children }: any) => {
    return (
      <ul className="mb-4 p-4 shadow-md">
        <li>{children}</li>
      </ul>
    );
  };

  return (
    <header className="">
      <div className="flex">
        <nav className="flex">
          <ParenUl>
            <a href="/new">筋トレ動画を登録</a>
          </ParenUl>
          <ParenUl>
            <a href="/sets">登録した筋トレ動画</a>
          </ParenUl>{" "}
          <ParenUl>
            <a href="/logs">トレーニング記録</a>
          </ParenUl>
        </nav>
        <div className="ml-auto m-4"></div>
        <AuthButton></AuthButton>
      </div>
    </header>
  );
}
