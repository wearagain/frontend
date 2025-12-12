import { Button } from "@/components/ui/button.tsx";
import type { ManageModalProps, ManageSelectedItem } from "@/pages/admin/party/PartyManagePage.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { ManageAction } from "@/types/admin/party.ts";

interface ActionBottomBarProps extends ManageSelectedItem, ManageModalProps {
  action: ManageAction;
}

export default function ActionBottomBar(
  {
    action,
    ids,
    nextStatus = "ONGOING",
    setModalAction,
    setOpenModal,
  }: ActionBottomBarProps) {

  const description =
    action == "confirm" ?
      `${ids?.length}개 파티 ${PartyStatusDescription[nextStatus]} 처리`
      : `${ids?.length}개 파티 삭제`;

  return nextStatus && (
    <div className="bottombar-wrapper">
      <div className="bottombar">
        <Button
          type="button"
          onClick={() => {
            setModalAction(action);
            setOpenModal(true);
          }}
          theme="purple"
          variant="primary"
          className="flex-1 h-full min-h-[52px]"
        >
          {description}
        </Button>
      </div>
    </div>
  );
}
