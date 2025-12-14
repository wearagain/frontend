import { Checkbox } from "@/components/ui/checkbox.tsx";
import type { AdminPartyModalProps, OrderAction } from "@/types/admin/party.ts";
import { useOrderSelectionStore } from "@/store/useOrderSelectionStore.ts";
import { useNavigate } from "react-router-dom";
import { clickDeliveryHeaderButton } from "@/utils/admin/party/clickDeliveryButton.ts";

interface SectionControllerProps
  extends AdminPartyModalProps<OrderAction> {
  checked: boolean | "indeterminate";
  onCheckedChange: () => void;
  isActive: boolean;
}

export default function SectionController(
  {
    checked,
    onCheckedChange,
    isActive,
    setAction,
    setOpenModal,
  }: SectionControllerProps,
) {

  const { selected } = useOrderSelectionStore();
  const navigate = useNavigate();

  const handleDeliveryClick = () => {
    clickDeliveryHeaderButton({ nextStatus: selected?.nextStatus, setOpenModal, navigate });
  };

  return (
    <div className="flex justify-between items-center w-full px-5 mb-2">
      <div className="flex items-center gap-2">
        <Checkbox
          id="allCheck"
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <h4 className="font-medium text-base">전체선택</h4>
      </div>
      <div className="flex items-center gap-3 font-medium text-base text-[#424242]">
        <button
          type="button"
          onClick={() => {
            setAction?.("confirm");
            handleDeliveryClick();
          }}
          disabled={!isActive}
        >
          변경
        </button>
      </div>
    </div>);
}