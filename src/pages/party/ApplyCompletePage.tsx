import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ApplyCompletePage = () => {
  const navigate = useNavigate();

  return (
    <div className='flex flex-col h-full px-5 pb-14'>
      <div className='flex gap-4 justify-center'>
        <CheckCircle2 className=' fill-mint-dark text-white' size={100} />
      </div>
      <div className='flex flex-col items-center justify-center flex-1 text-center mt-16'>
        <h1 className='text-xl font-bold mb-2'>신청이 완료됐습니다</h1>
      </div>

      <Button
        type='submit'
        className='w-full h-12 text-base font-semibold'
        onClick={() => navigate("/party/history")}
      >
        신청내역 확인하기
      </Button>
    </div>
  );
};

export default ApplyCompletePage;
