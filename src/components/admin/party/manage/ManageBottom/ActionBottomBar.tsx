import { Button } from "@/components/ui/button.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { AdminPartyModalProps, ManageAction } from "@/types/admin/party.ts";
import type { PartyStatus } from "@/types/party.ts";

interface ActionBottomBarProps extends AdminPartyModalProps {
  ids?: string[];
  nextStatus?: PartyStatus;
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
