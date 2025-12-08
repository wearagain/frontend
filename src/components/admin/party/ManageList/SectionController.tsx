import { Checkbox } from "@/components/ui/checkbox.tsx";

interface SectionControllerProps {
  checked: boolean | "indeterminate";
  onCheckedChange: () => void;
}

export default function SectionController({checked, onCheckedChange}: SectionControllerProps
) {

  return( <div className="flex justify-between items-center w-full px-5 mb-2">
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
      >
        변경
      </button>
      <button
        type="button"
      >
        삭제
      </button>
    </div>
  </div>)
}