import Modal from "@/components/ui/modal.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { ManageSelectedItem } from "@/pages/admin/party/PartyManagePage.tsx";
import type { ManageAction } from "@/types/admin/party.ts";

interface ManageModalProps extends ManageSelectedItem {
  action: ManageAction;
  setOpenModal: (v: boolean) => void;
  onConfirm?: () => void;
}

export default function ManageModal({ action, ids, nextStatus, setOpenModal, onConfirm }: ManageModalProps) {
  const header =
    action == "confirm" ?
      `${ids?.length}개 파티를 ${nextStatus && PartyStatusDescription[nextStatus]} 처리하시겠습니까?`
      : `${ids?.length}개 파티를 삭제하시겠습니까?`;

  const confirmText =
    action == "confirm" ?
      "처리하기" : "삭제하기";

  return (
    <Modal
      header={header}
      confirmText={confirmText}
      theme="purple"
      onClose={() => setOpenModal(false)}
      onConfirm={() => onConfirm?.()}
    >
    </Modal>
  );
}