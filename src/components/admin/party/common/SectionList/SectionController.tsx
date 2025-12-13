import { Checkbox } from "@/components/ui/checkbox.tsx";
import type { AdminPartyModalProps } from "@/types/admin/party.ts";

interface SectionControllerProps extends AdminPartyModalProps {
  checked: boolean | "indeterminate";
  onCheckedChange: () => void;
  isActive: boolean;
  isOrder?: boolean;
}

export default function SectionController(
  {
    checked,
    onCheckedChange,
    isActive,
    setModalAction = () => {},
    setOpenModal = () => {},
    isOrder = false
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
            setModalAction("confirm");
            setOpenModal(true);
          }}
          disabled={!isActive}
        >
          변경
        </button>
        <button
          type="button"
          onClick={() => {
            setModalAction("delete");
            setOpenModal(true);
          }}
          disabled={!isActive}
          className={isOrder? "hidden" : ""}
        >
          삭제
        </button>
      </div>
    </div>);
}