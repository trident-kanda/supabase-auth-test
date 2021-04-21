import { Session, User } from "@supabase/supabase-js";
import { AppProps } from "next/dist/next-server/lib/router/router";
import { useEffect, useState } from "react";
import "tailwindcss/tailwind.css";
import { supabase } from "../supabase/supabase";
import { UserContext } from "../util/UserContext";
function MyApp({ Component, pageProps }: AppProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    const session = supabase.auth.session();
    setSession(session);
    setUser(session?.user ?? null);
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);
  return (
    <UserContext.Provider value={{ user, session }}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp;
