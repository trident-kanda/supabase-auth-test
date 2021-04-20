import { Button } from "@supabase/ui";
import { supabase } from "../supabase/supabase";

export default function Home() {
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <h2>ログイン中</h2>
        <Button block onClick={supabase.auth.signOut}>
          サインアウト
        </Button>
      </div>
    </div>
  );
}
