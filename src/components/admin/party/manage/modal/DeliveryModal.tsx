import Modal from "@/components/ui/modal.tsx";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import type { DeliveryStatus, DeliveryStatusUpdateRequest } from "@/types/admin/party.ts";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";

interface DeliveryModalProps {
  setOpenModal: (v: boolean) => void;
  nextStatus: DeliveryStatus;
  applicationId: string;
  data: DeliveryStatusUpdateRequest;
  mutate: (params: PatchDeliveryStatusParams) => Promise<void>;
}

interface PatchDeliveryStatusParams {
  applicationId: string;
  params: DeliveryStatusUpdateRequest;
}

export default function DeliveryModal(
  {
    nextStatus,
    setOpenModal,
    applicationId,
    data,
    mutate,
  }: DeliveryModalProps) {
  const header = `${nextStatus && DeliveryStatusDescription[nextStatus]} 처리하시겠습니까?`;

  const handleConfirm = async () => {
    try {
      await mutate({
        applicationId: applicationId,
        params: {
          deliveryStatus: getNextDeliveryStatus(data?.deliveryStatus),
          deliveryMemo: data?.deliveryMemo,
          trackingNumber: data?.trackingNumber,
          courierName: data?.courierName,
        },
      });
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