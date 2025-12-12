import Modal from "@/components/ui/modal.tsx";
import type { TaxUpdateRequest } from "@/types/admin/party.ts";

interface TaxModalProps {
  setOpenModal: (v: boolean) => void;
  data: TaxUpdateRequest;
  mutate: (params: TaxUpdateRequest) => Promise<void>;
}

export default function TaxModal(
  {
    setOpenModal,
    data,
    mutate,
  }: TaxModalProps) {

  const handleConfirm = async () => {
    try {
      await mutate(data);
      setOpenModal(false);
    } catch {
    }
  };
  return (
    <Modal
      header="세금계산서 발행 처리하시겠습니까?"
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