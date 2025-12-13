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
    try {
      if (!ids || !nextStatus) return;

      const results = await Promise.allSettled(
        ids?.map(id => mutate({
            id: id,
            status: nextStatus,
            count: ids.length,
        })));

      const fulfilled = results.filter(r => r.status === "fulfilled");
      const rejected = results.filter(r => r.status === "rejected");

      if (rejected.length > 0) {
        alert(`${rejected.length}건의 요청이 실패했습니다. 다시 시도해주세요.`);
      }

      if (fulfilled.length > 0) {

        alert(action == "confirm" ?
          `${fulfilled.length}개 파티를 ${PartyStatusDescription[nextStatus]} 처리 완료했습니다.`:
          `${fulfilled.length}개 파티를 삭제 완료했습니다.`);
      }

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