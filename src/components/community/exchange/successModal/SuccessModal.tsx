import { Button } from "@/components/ui/button";
import { X } from "@/assets/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { CircleCheck } from "lucide-react";

interface SuccessModalProps {
  onClose: () => void;
}

const SuccessModal = ({ onClose }: SuccessModalProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className='fixed inset-y-0 left-0 right-0 z-[1001] flex flex-col justify-between px-5 bg-white max-w-[430px] mx-auto top-0'>
      <div className='sticky top-0 flex items-end justify-between w-full h-[var(--header-height)] px-4 pb-3 bg-white    '>
        <button onClick={onClose} className='ml-auto'>
          <X className='w-6 h-6' />
        </button>
      </div>
      <div className='flex flex-1 flex-col items-center justify-center gap-4'>
        <div className='flex gap-4'>
          <CircleCheck strokeWidth={2} className=' fill-mint-dark text-white' size={120} />
        </div>
        <h2 className='h-fit text-wrap'>신청이 완료됐습니다</h2>
      </div>

      <Button
        type='button'
        onClick={() => navigate(location.pathname + "/info")}
        theme='mint'
        variant='primary'
        className='h-[52px] mb-14'
      >
        신청내역 확인하기
      </Button>
    </div>
  );
};

export default SuccessModal;
