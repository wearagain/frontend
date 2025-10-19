import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const SignupCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col justify-between h-full px-6 pb-8'>
      <div className='flex flex-col items-center justify-center flex-1 text-center mt-16'>
        <h1 className='text-xl font-bold mb-2'>회원가입 완료!</h1>
        <p className='text-gray-500 text-sm mb-8'>함께 가치를 나누어 보아요</p>
        <div className='w-64 h-64 bg-gray-100 rounded-md' />
      </div>

      <Button
        type='submit'
        className='w-full h-12 text-base font-semibold'
        onClick={() => navigate("/auth/signin")}
      >
        로그인
      </Button>
    </div>
  );
};

export default SignupCompletePage;
