import { Button } from "@/components/ui/button.tsx";
import type { AdminPartyFilter } from "@/types/adminTypes.ts";
import { useNavigate } from "react-router-dom";

interface PartyRowButtonsProps {
  status: AdminPartyFilter;
  id: string;
}

export default function PartyRowButtons({ status = "PENDING", id }: PartyRowButtonsProps) {
  const navigate = useNavigate();
  return (
    <div className='min-w-max flex gap-2'>
      <Button
        type='button'
        disabled={status == "REJECTED"}
        onClick={() => navigate(`${id}/approve`)}
        theme={status == "APPROVED" ? "purpleOutlined" : "normalOutlined"}
        variant='primary'
        className='h-[40px] w-fit'
      >
        승인
      </Button>

      <Button
        type='button'
        disabled={status == "APPROVED"}
        onClick={() => navigate(`${id}/reject`)}
        theme={status == "REJECTED" ? "purpleOutlined" : "normalOutlined"}
        variant='primary'
        className='h-[40px] w-fit'
      >
        반려
      </Button>
    </div>
  );
}
