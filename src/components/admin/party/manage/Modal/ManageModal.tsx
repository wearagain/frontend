import Modal from "@/components/ui/modal.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { ManageAction } from "@/types/admin/party.ts";
import type { PartyStatus } from "@/types/party.ts";

interface ManageModalProps {
  ids?: string[];                       // 선택된 id
  nextStatus?: PartyStatus;
  action: ManageAction | null;
  setOpenModal: (v: boolean) => void;
  onConfirm?: () => void;
  mutate: (params: { id: string, status: PartyStatus, count: number }) => Promise<void>;
}

export default function ManageModal({ action, ids, nextStatus, setOpenModal, mutate }: ManageModalProps) {
  const header =
    action == "confirm" ?
      `${ids?.length}개 파티를 ${nextStatus && PartyStatusDescription[nextStatus]} 처리하시겠습니까?`
      : `${ids?.length}개 파티를 삭제하시겠습니까?`;

  const confirmText =
    action == "confirm" ?
      "처리하기" : "삭제하기";

  const clickConfirm = async () => {
    if (!ids || !nextStatus) return;
    try {
      await mutate({
        id: ids[0],
        status: nextStatus,
        count: ids.length,
      });
      setOpenModal(false);
    } catch {
    }
  }

  return (
    <Modal
      header={header}
      confirmText={confirmText}
      theme="purple"
      onClose={() => setOpenModal(false)}
      onConfirm={clickConfirm}
    >
    </Modal>
  );
}