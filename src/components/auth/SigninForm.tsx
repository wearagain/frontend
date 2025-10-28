import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { useSignin } from "@/hooks/auth/useAuth";
import { signinSchema, type SigninSchemaType } from "@/utils/validations/signinValidation";

export default function SigninForm() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();
  const { mutateAsync: signin, isPending } = useSignin();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<SigninSchemaType>({
    resolver: zodResolver(signinSchema),
    mode: "onBlur",
  });

  const onSubmit = async (data: SigninSchemaType) => {
    try {
      const response = await signin(data);
      console.log("로그인 성공:", response);

      navigate("/");
    } catch (err) {
      console.error("로그인 실패:", err);
      alert("로그인에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4 w-full'>
      {/* 이메일 */}
      <div className='flex flex-col gap-2'>
        <Label htmlFor='email'>이메일</Label>
        <Input id='email' type='email' placeholder='이메일을 입력하세요' {...register("email")} />
        {errors.email && <p className='text-red-500 text-sm'>{errors.email.message}</p>}
      </div>

      {/* 비밀번호 */}
      <div className='flex flex-col gap-2'>
        <Label htmlFor='password'>비밀번호</Label>
        <div className='relative'>
          <Input
            id='password'
            type={visible ? "text" : "password"}
            placeholder='비밀번호를 입력하세요'
            className='pr-10'
            {...register("password")}
          />
          <button
            type='button'
            onClick={() => setVisible(!visible)}
            className='absolute right-3 top-3 text-gray-400 pt-1'
          >
            {visible ? <Eye className='w-4 h-4' /> : <EyeOff className='w-4 h-4' />}
          </button>
        </div>
        {errors.password && <p className='text-red-500 text-sm'>{errors.password.message}</p>}
      </div>

      {/* 로그인 버튼 */}
      <Button
        type='submit'
        disabled={!isValid || isPending}
        className={`mt-4 rounded-xl h-12 font-semibold ${
          isPending
            ? "bg-gray-200 text-gray-500"
            : "bg-black text-white hover:bg-gray-800 transition-colors"
        }`}
      >
        {isPending ? "로그인 중..." : "로그인"}
      </Button>
    </form>
  );
}
