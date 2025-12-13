import Modal from "@/components/ui/modal.tsx";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import type {
  PartyApplicationResponse,
  PatchDeliveryStatusParams,
} from "@/types/admin/party.ts";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";

interface DeliveryModalProps {
  setOpenModal: (v: boolean) => void;
  data: PartyApplicationResponse | undefined;
  mutate: (params: PatchDeliveryStatusParams) => Promise<void>;
}

export default function DeliveryModal(
  {
    setOpenModal,
    data,
    mutate,
  }: DeliveryModalProps) {

  const nextStatus = getNextDeliveryStatus(data?.deliveryStatus);

  const header = `${nextStatus && DeliveryStatusDescription[nextStatus]} 처리하시겠습니까?`;

  const handleConfirm = async () => {
      try {

        if (!data?.id) return alert("ID가 필요합니다.");

        const queryBody: PatchDeliveryStatusParams = {
          applicationId: data.id,
          params: {
            deliveryStatus: nextStatus,
            deliveryMemo: data?.deliveryMemo,
            trackingNumber: data?.trackingNumber,
            courierName: data?.courierName,
          },
        };

        await mutate(queryBody);
        alert(`${DeliveryStatusDescription[nextStatus]} 처리 완료했습니다.`);
        setOpenModal(false);
      } catch {
      }
    }
  ;
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
};