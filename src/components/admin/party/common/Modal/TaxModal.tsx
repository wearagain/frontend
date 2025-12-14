import Modal from "@/components/ui/modal.tsx";
import type { OrderDetailResponse, TaxUpdateRequest } from "@/types/admin/party.ts";
import TaxModalContent from "@/components/admin/party/common/Modal/ModalContents/TaxModalContent.tsx";

interface TaxModalProps {
  setOpenModal: (v: boolean) => void;
  data: OrderDetailResponse | undefined;
  mutate: (params: TaxUpdateRequest) => Promise<void>;
}

export default function TaxModal(
  {
    setOpenModal,
    data,
    mutate,
  }: TaxModalProps) {

  const queryBody: TaxUpdateRequest = {
    taxId: data?.taxId ?? undefined,
    name: data?.name ?? undefined,
  };

  const handleConfirm = async () => {
    try {
      await mutate(queryBody);
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
        <TaxModalContent {...queryBody}/>
      </div>
    </Modal>
  );
}