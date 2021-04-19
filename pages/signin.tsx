import { Button, IconKey, IconMail } from "@supabase/ui";
import { useForm, Controller } from "react-hook-form";
import { Input } from "@supabase/ui";
const signin = () => {
  const { control, handleSubmit, register } = useForm();
  const test = (data: any) => console.log(data);
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <form onSubmit={handleSubmit(test)}>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, ref } }) => (
              <Input
                onBlur={onBlur}
                onChange={onChange}
                type="email"
                label="Password"
                icon={<IconMail />}
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
                label="Email"
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
          <div className="h-4" />
          <Button block>送信</Button>
        </form>
      </div>
    </div>
  );
};

export default signin;
