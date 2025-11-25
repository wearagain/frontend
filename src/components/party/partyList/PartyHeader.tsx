import { SortFilter } from "./filters/SortFilter";
import { RegionFilter } from "./filters/RegionFilter";
import { ProgressFilter } from "./filters/ProgressFilter";
import { UpcomingFilter } from "./filters/UpcomingFilter";
import type { PartyRegion, PartyStatus } from "@/types/party";

interface PartyHeaderProps {
  sort?: "popular" | "latest";
  region?: PartyRegion;
  status?: PartyStatus;
  onChangeSort: (v: "popular" | "latest") => void;
  onChangeRegion: (v?: PartyRegion) => void;
  onChangeStatus: (v?: PartyStatus) => void;
}

export function PartyHeader({
  sort,
  region,
  status,
  onChangeSort,
  onChangeRegion,
  onChangeStatus,
}: PartyHeaderProps) {
  return (
    <div className='flex gap-3 overflow-x-auto no-scrollbar px-2 py-1'>
      <SortFilter value={sort} onChange={onChangeSort} />
      <RegionFilter value={region} onChange={onChangeRegion} />
      <ProgressFilter active={status === "ONGOING"} onToggle={() => onChangeStatus("ONGOING")} />
      <UpcomingFilter active={status === "UPCOMING"} onToggle={() => onChangeStatus("UPCOMING")} />
    </div>
  );
}
