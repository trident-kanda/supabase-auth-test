import { Input,IconMail ,Button} from "@supabase/ui";
import { useForm,Controller } from "react-hook-form";

const signin = () => {
  const { control, handleSubmit,register } = useForm();
  const test = (data:any) => console.log(data)
  return (
    <div className="h-screen flex center items-center justify-center">
      <div className="sm:max-w-xl bg-white  w-full sm:rounded-lg p-5 shadow">
        <form onSubmit={handleSubmit(test)}>
          <Input {...register("email")} label="Email" icon={<IconMail/>} type="email"/>
          <Button block>送信</Button>
        </form>
      </div>
    </div>
  );
};

export default signin;
