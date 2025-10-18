import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";

export default function SigninForm() {
  const [visible, setVisible] = useState(false);

  return (
    <form className='flex flex-col gap-3 w-full'>
      <Input type='email' placeholder='이메일' />
      <div className='relative'>
        <Input type={visible ? "text" : "password"} placeholder='비밀번호' className='pr-10' />
        <button
          type='button'
          onClick={() => setVisible(!visible)}
          className='absolute right-3 top-3 text-gray-400 pt-1'
        >
          {visible ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
        </button>
      </div>

      <Button
        type='submit'
        disabled
        className='mt-2 rounded-xl bg-gray-200 text-gray-500 font-semibold h-12'
      >
        로그인
      </Button>
    </form>
  );
}
