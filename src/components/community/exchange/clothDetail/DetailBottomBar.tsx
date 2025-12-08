import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

interface DetailBottomBarProps {
  id: string;
  isLiked: boolean;
}

export default function DetailBottomBar({ isLiked, id }: DetailBottomBarProps) {
  const navigate = useNavigate();
  return (
    <div className='bottombar-wrapper'>
      <div className='bottombar'>
        <button
          // onClick={() =>
          //   setLiked((i) => {
          //     console.log("heart clicked!");
          //     return ++i;
          //   })
          // }
          className='w-[52px] h-full min-h-[52px] bg-white rounded-[10px] border border-[#424242] relative flex items-center justify-center'
        >
          <Heart className='w-6 h-6' fill={isLiked ? "#F23F3F" : "none"} stroke='#F23F3F' />
        </button>

        <Button
          type='button'
          onClick={() => navigate(`/community/exchange/${id}/request`)}
          theme='mint'
          variant='primary'
          className='flex-1 h-full min-h-[52px]'
        >
          교환하기
        </Button>
      </div>
    </div>
  );
}
