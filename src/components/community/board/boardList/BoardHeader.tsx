import { SearchBar } from "./filters/SearchBar";
import { SortFilter } from "./filters/SortFilter";
import { BoardTypeFilter } from "./filters/BoardTypeFilter";
import type { BoardType } from "@/types/board";

interface BoardHeaderProps {
  sort?: "popular" | "latest";
  boardType?: BoardType;
  onChangeSort: (v: "popular" | "latest") => void;
  onChangeBoardType: (v?: BoardType) => void;
  onSearch: (keyword: string) => void;
}

export function BoardHeader({
  sort,
  boardType,
  onChangeSort,
  onChangeBoardType,
  onSearch,
}: BoardHeaderProps) {
  return (
    <div className='flex flex-col gap-2 bg-white px-3 py-2 border-b border-gray-200'>
      {/* 검색창 */}
      <SearchBar onSearch={onSearch} />

      {/* 필터 그룹 */}
      <div className='flex gap-2 overflow-x-auto no-scrollbar py-1'>
        <SortFilter value={sort} onChange={onChangeSort} />
        <BoardTypeFilter value={boardType} onChange={onChangeBoardType} />
      </div>
    </div>
  );
}
