import { Button } from "@/components/ui/button.tsx";
import type {  DeliveryStatus } from "@/types/admin/party.ts";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";

interface ActionBottomBarProps  {
  ids?: string[];
  nextStatus?: DeliveryStatus;
}

export default function ActionBottomBar(
  {
    ids,
    nextStatus = "PREPARING",
  }: ActionBottomBarProps) {

  return nextStatus && (
    <div className="bottombar-wrapper">
      <div className="bottombar">
        <Button
          type="button"
          onClick={() => {
            console.log("navigate");
            // setOpenModal(true);
          }}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          ${ids?.length}개 품목 ${DeliveryStatusDescription[nextStatus]} 처리
        </Button>
      </div>
    </div>
  );
}
