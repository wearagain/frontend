import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PartyActionGroup = () => {
  const navigate = useNavigate();
  const goToApply = () => {
    navigate("participate");
  };

  return (
    <div className='w-full flex items-center justify-between gap-1 bg-white py-3'>
      <Button
        className='w-full flex-1 h-12 text-base font-medium rounded-lg border border-gray-300 bg-white text-gray-950'
        onClick={goToApply}
      >
        신청하기
      </Button>

      <Button className='flex items-center justify-center h-12 px-4 rounded-lg border border-gray-300 bg-white text-gray-950'>
        <MessageCircle size={18} className='mr-1.5' />
        문의
      </Button>
    </div>
  );
};
