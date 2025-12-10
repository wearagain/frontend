import { ChevronDownIcon } from "@/assets/icons";
import { Button } from "@/components/ui/button.tsx";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu.tsx";

interface SortFilterProps {
  value?: "popular" | "latest";
  onChange: (v: "popular" | "latest") => void;
}

export function SortFilter({ value, onChange }: SortFilterProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-9 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'>
          {value === "popular" ? "인기순" : "최신순"}
          <ChevronDownIcon className='ml-1 size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='p-1 min-w-[8rem]'>
        <DropdownMenuItem
          onClick={() => onChange("popular")}
          className={value === "popular" ? "bg-gray-100 font-semibold" : ""}
        >
          인기순
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => onChange("latest")}
          className={value === "latest" ? "bg-gray-100 font-semibold" : ""}
        >
          최신순
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
