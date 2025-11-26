import type { BoardType } from "@/types/board.ts";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";
import { ChevronDown } from "lucide-react";

const TYPE_OPTIONS: { label: string; value: BoardType }[] = [
  { label: "자유", value: "FREE" },
  { label: "정보공유", value: "INFO" },
  { label: "FAQ", value: "QNA" },
];

interface Props {
  value: BoardType;
  onChange: (v: BoardType) => void;
}

export const BoardTypeSelect = ({ value, onChange }: Props) => {
  const selectedLabel = TYPE_OPTIONS.find((t) => t.value === value)?.label ?? "자유";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className='w-32 flex items-center gap-1 bg-gray-100 px-3 py-1.5 rounded-full text-sm justify-between'>
          {selectedLabel}
          <ChevronDown size={16} />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='w-32'>
        {TYPE_OPTIONS.map((type) => (
          <DropdownMenuItem
            key={type.value}
            onClick={() => onChange(type.value)}
            className='cursor-pointer'
          >
            {type.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
