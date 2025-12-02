import { Button } from "@/components/ui/button.tsx";
import type { AdminPartyFilter } from "@/types/adminTypes.ts";

interface PartyRowButtonsProps {
  status: AdminPartyFilter;
}

export default function PartyRowButtons({ status = "PENDING" }: PartyRowButtonsProps) {
  return (
    <div className='min-w-max flex gap-2'>
      <Button
        type='button'
        disabled={status == "REJECTED"}
        // onClick={() => navigate(locatiosn.pathname + "/info")}
        theme={status == "APPROVED" ? "purpleOutlined" : "normalOutlined"}
        variant='primary'
        className='h-[40px] w-fit'
      >
        승인
      </Button>

      <Button
        type='button'
        disabled={status == "APPROVED"}
        // onClick={() => navigate(location.pathname + "/info")}
        theme={status == "REJECTED" ? "purpleOutlined" : "normalOutlined"}
        variant='primary'
        className='h-[40px] w-fit'
      >
        반려
      </Button>
    </div>
  );
}
