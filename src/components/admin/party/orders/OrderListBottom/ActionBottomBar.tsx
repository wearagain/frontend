import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button.tsx";
import type {
  AdminPartyModalProps,
  DeliveryStatus,
  OrderAction, OrderItem,
} from "@/types/admin/party.ts";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";

interface ActionBottomBarProps
  extends AdminPartyModalProps<OrderAction> {
  items?: OrderItem[];
  nextStatus?: DeliveryStatus;
  action: OrderAction | null;
}

export default function ActionBottomBar(
  {
    items,
    nextStatus = "PREPARING",
    setAction,
    setOpenModal,
  }: ActionBottomBarProps) {

  const needTrackingNumber = ["IN_TRANSIT", "DELIVERED"];

  const navigate = useNavigate();

  return nextStatus && (
    <div className="bottombar-wrapper">
      <div className="bottombar">
        <Button
          type="button"
          onClick={() => {
            if (!needTrackingNumber.includes(nextStatus)) {
              setAction?.("confirm");
              setOpenModal?.(true);
            } else {
              setAction?.(null);
              navigate(`tracking`);
            }
          }}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          {items?.length}개 품목 {DeliveryStatusDescription[nextStatus]} 처리
        </Button>
      </div>
    </div>
  );
}
