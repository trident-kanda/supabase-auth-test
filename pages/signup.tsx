import { Button, IconKey, IconMail } from "@supabase/ui";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@supabase/ui";
import { supabase } from "../supabase/supabase";
import { useContext, useEffect, useRef } from "react";
import Link from "next/link";
import { UserContext } from "../util/UserContext";
import { useRouter } from "next/router";
const signup = () => {
  type formData = {
    email: string;
    password: string;
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const password = useRef({});
  password.current = watch("password", "");
  const { user, session } = useContext(UserContext);
  const { replace } = useRouter();
  useEffect(() => {
    if (user) {
      replace("/");
    }
  }, [user]);

  const signUp = async ({ email, password }: formData) => {
    const res = await supabase.auth.signUp({
      email,
      password,
    });
  };
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <form onSubmit={handleSubmit(signUp)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="email"
                label="Email"
                icon={<IconMail />}
                error={errors.email ? errors.email.message : ""}
                placeholder="メールアドレス"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                message: "メールアドレスが不適切です。",
              },
            }}
          />
          <Controller
            control={control}
            name="password"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="password"
                icon={<IconKey />}
                label="Password"
                error={errors.password ? errors.password.message : ""}
                placeholder="パスワード(8文字以上)"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
            }}
          />
          <Controller
            control={control}
            name="confirmPassword"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="password"
                icon={<IconKey />}
                label="ConfirmPassword"
                error={
                  errors.confirmPassword ? errors.confirmPassword.message : ""
                }
                placeholder="パスワード(確認用)"
              />
            )}
            rules={{
              required: "必須項目です。",
              pattern: {
                value: /^[a-z\d]{8,100}$/i,
                message: "パスワードは8文字以上です。",
              },
              validate: (value) =>
                value === password.current || "パスワードが一致しません。",
            }}
          />
          <div className="h-4" />
          <Button block>サインアップ</Button>
          <div className="h-4" />
          <Link href="/signin">
            <a className=" font-bold hover:text-gray-500">サインインはこちら</a>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default signup;
