// import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";

interface PartyDetailBottomBarProps {
  id: string;
}

export default function PartyDetailBottomBar({ id }: PartyDetailBottomBarProps) {
  // const navigate = useNavigate();
  return (
    <div className='bottombar-wrapper'>
      <div className='bottombar'>
        <Button
          type='button'
          // onClick={() => navigate(`/community/exchange/${id}/request`)}
          theme='purple'
          variant='primary'
          className='flex-1 h-full min-h-[52px]'
        >
          승인
        </Button>

        <Button
          type='button'
          // onClick={() => navigate(`/community/exchange/${id}/request`)}
          theme='purple'
          variant='primary'
          className='flex-1 h-full min-h-[52px]'
        >
          반려
        </Button>
      </div>
    </div>
  );
}
