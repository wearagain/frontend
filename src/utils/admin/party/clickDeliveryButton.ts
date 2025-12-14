import { useNavigate } from "react-router-dom";
import type { OrderSelectionState } from "@/store/useOrderSelectionStore.ts";
import type { DeliveryStatus } from "@/types/admin/party.ts";

interface ClickDeliveryButtonProps {
  data: Record<string, any>;
  setOpenModal?: (open: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
  store: OrderSelectionState;
}

export function clickDeliveryButton(
  {
    data,
    setOpenModal,
    navigate,
    store,
  }: ClickDeliveryButtonProps) {

  if (data?.deliveryStatus === "PREPARING") {
    store.setSelected({
      nextStatus: "IN_TRANSIT",
      items: [{
        id: data?.applicationId ?? "",
        partyTitle: data?.partyTitle,
        desiredDate: data?.desiredDate,
        maxAttendeeCnt: data?.maxAttendeeCnt,
        price: data?.price,
      }],
    });
    navigate(`/admin/party/orders/tracking`);
  } else {
    setOpenModal?.(true);
  }
}

interface ClickDeliveryHeaderButtonProps {
  nextStatus: DeliveryStatus;
  setOpenModal?: (open: boolean) => void;
  navigate: ReturnType<typeof useNavigate>;
}

export function clickDeliveryHeaderButton(
  {
    nextStatus,
    setOpenModal,
    navigate,
  }: ClickDeliveryHeaderButtonProps) {
  if (nextStatus === "IN_TRANSIT") {
    navigate(`/admin/party/orders/tracking`);
  } else {
    setOpenModal?.(true);
  }
}
