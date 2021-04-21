import { Button } from "@supabase/ui";
import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { supabase } from "../supabase/supabase";
import { UserContext } from "../util/UserContext";

export default function Home() {
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  useEffect(() => {
    if (!user) {
      replace("/signin");
    }
  }, [user]);
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <h2>ログイン中</h2>
        <Button
          block
          onClick={() => {
            supabase.auth.signOut();
          }}
        >
          サインアウト
        </Button>
      </div>
    </div>
  );
}
