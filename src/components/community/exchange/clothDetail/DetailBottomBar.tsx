import { Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import { useLikeExchange } from "@/hooks/exchange/useLikeExchange";
import type { RepairClothsDetail } from "@/types/community";

interface DetailBottomBarProps {
  id: string;
  isLiked: boolean;
  clothingDetail: RepairClothsDetail;
}

export default function DetailBottomBar({ isLiked, id, clothingDetail }: DetailBottomBarProps) {
  const navigate = useNavigate();
  const { mutate: likeExchange, isPending } = useLikeExchange();

  const handleLikeClick = () => {
    likeExchange(id);
  };

  const handleExchangeClick = () => {
    navigate(`/community/exchange/${id}/request`, {
      state: { clothingDetail },
    });
  };

  return (
    <div className='bottombar-wrapper'>
      <div className='bottombar'>
        <button
          onClick={handleLikeClick}
          disabled={isPending}
          className='w-[52px] h-full min-h-[52px] bg-white rounded-[10px] border border-[#424242] relative flex items-center justify-center disabled:opacity-50'
        >
          <Heart className='w-6 h-6' fill={isLiked ? "#F23F3F" : "none"} stroke='#F23F3F' />
        </button>

        <Button
          type='button'
          onClick={handleExchangeClick}
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
