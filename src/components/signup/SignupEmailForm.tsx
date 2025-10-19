import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

export default function SignupEmailForm() {
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [isVerified, setIsVerified] = useState(true);
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();

  const handleVerify = () => setIsVerified(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/signup/terms");
  };

  const isNextDisabled = !isVerified || !password || password !== confirm;

  return (
    <form onSubmit={handleSubmit} className='flex flex-col h-full justify-between'>
      <div className='flex flex-col gap-5'>
        {/* 이름 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>이름</Label>
          <Input id='name' placeholder='이름' />
        </div>

        {/* 이메일 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='email'>이메일</Label>
          <Input
            id='email'
            type='email'
            placeholder='이메일'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        {/* 인증번호 + 버튼 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='code'>인증번호</Label>
          <div className='flex gap-2'>
            <Input
              id='code'
              placeholder='인증번호'
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />
            <Button
              type='button'
              onClick={handleVerify}
              disabled={!email}
              className={cn("whitespace-nowrap w-28")}
            >
              인증하기
            </Button>
          </div>
        </div>

        {/* 비밀번호 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>비밀번호</Label>
          <Input
            id='password'
            type='password'
            placeholder='N자 이상'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* 비밀번호 확인 */}
        <div className='flex flex-col gap-2'>
          <Label htmlFor='confirm'>비밀번호 확인</Label>
          <Input
            id='confirm'
            type='password'
            placeholder='N자 이상'
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
          />
        </div>
      </div>

      <div className='mt-auto pt-6'>
        <Button
          type='submit'
          disabled={isNextDisabled}
          className='w-full h-12 text-base font-semibold'
        >
          다음
        </Button>
      </div>
    </form>
  );
}
