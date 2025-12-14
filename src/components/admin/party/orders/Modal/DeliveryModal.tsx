import Modal from "@/components/ui/modal.tsx";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import type {
  DeliveryStatus,
  OrderItem,
  PatchDeliveryStatusParams,
} from "@/types/admin/party.ts";
import { useOrderSelectionStore } from "@/store/useOrderSelectionStore.ts";

interface DeliveryModalProps {
  items?: OrderItem[];
  nextStatus?: DeliveryStatus;
  setOpenModal: (v: boolean) => void;
  mutate: (params: PatchDeliveryStatusParams) => Promise<void>;
}

export default function DeliveryModal(
  {
    items,
    nextStatus = "PREPARING",
    setOpenModal,
    mutate,
  }: DeliveryModalProps) {


  const {
    selected,
  } = useOrderSelectionStore();

  const header = `${items?.length}개 품목을 ${nextStatus && DeliveryStatusDescription[nextStatus]} 처리하시겠습니까?`;

  const handleConfirm = async () => {
    try {
      if (!selected?.items) return alert("품목을 선택하세요.");

      const results = await Promise.allSettled(
        selected?.items?.map(order => {
          const queryBody: PatchDeliveryStatusParams = {
            applicationId: order?.id,
            params: {
              deliveryStatus: selected.nextStatus,
            },
          };
          return mutate(queryBody);
        }),
      );

      const fulfilled = results.filter(r => r.status === "fulfilled");
      const rejected = results.filter(r => r.status === "rejected");

      if (rejected.length > 0) {
        alert(`${rejected.length}건의 요청이 실패했습니다. 다시 시도해주세요.`);
      }

      if (fulfilled.length > 0) {
        alert(`${DeliveryStatusDescription[selected.nextStatus]} 처리가 완료되었습니다.`);
      }
      setOpenModal(false);
    } catch {
    }
  };
  return (
    <Modal
      header={header}
      confirmText="처리하기"
      theme="purple"
      onClose={() => setOpenModal(false)}
      onConfirm={handleConfirm}
    >
      <div className="text-sm font-medium font-[#939396]">
        해당 결제/배송 상태를 변경합니다.
      </div>
    </Modal>
  );
}