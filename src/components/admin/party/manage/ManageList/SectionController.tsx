import { Checkbox } from "@/components/ui/checkbox.tsx";
import type { AdminPartyModalProps, ManageAction } from "@/types/admin/party.ts";

interface SectionControllerProps
  extends AdminPartyModalProps<ManageAction> {
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
            setOpenModal?.(true);
          }}
          disabled={!isActive}
        >
          변경
        </button>
        <button
          type="button"
          onClick={() => {
            setAction?.("delete");
            setOpenModal?.(true);
          }}
          disabled={!isActive}
        >
          삭제
        </button>
      </div>
    </div>);
}