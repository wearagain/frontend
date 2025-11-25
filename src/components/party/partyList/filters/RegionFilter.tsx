import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/assets/icons";
import type { PartyRegion } from "@/types/party";

interface Props {
  value?: PartyRegion;
  onChange: (region?: PartyRegion) => void;
}

const regionMap: Record<string, PartyRegion> = {
  서울: "SEOUL",
  인천: "INCHEON",
  경기: "GYEONGGI",
  강원: "GANGWON",
  충청: "CHUNGCHEONG",
  전라: "JEOLLA",
  경상: "GYEONGSANG",
  제주: "JEJU",
};

export function RegionFilter({ value, onChange }: Props) {
  const handleSelect = (label: string) => {
    if (label === "전체") {
      onChange(undefined);
      return;
    }
    const newValue = regionMap[label];
    onChange(value === newValue ? undefined : newValue);
  };

  const currentLabel =
    value === undefined
      ? "전체"
      : (Object.keys(regionMap).find((k) => regionMap[k] === value) ?? "전체");

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className='h-10 rounded-full bg-white border border-gray-300 text-gray-700 hover:bg-gray-100'>
          {currentLabel}
          <ChevronDownIcon className='ml-1 size-4' />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className='p-1 min-w-[10rem]'>
        <DropdownMenuItem
          key='전체'
          onClick={() => handleSelect("전체")}
          className={value === undefined ? "bg-gray-100 font-semibold" : ""}
        >
          전체
        </DropdownMenuItem>
        {Object.keys(regionMap).map((region) => (
          <DropdownMenuItem
            key={region}
            onClick={() => handleSelect(region)}
            className={value === regionMap[region] ? "bg-gray-100 font-semibold" : ""}
          >
            {region}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
