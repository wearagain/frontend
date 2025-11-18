import { useState } from "react";
import { SearchIcon } from "@/assets/icons";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
}

export function SearchBar({ onSearch }: SearchBarProps) {
  const [keyword, setKeyword] = useState("");

  const handleSearch = () => {
    const trimmed = keyword.trim();
    if (trimmed) onSearch(trimmed);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <div className='flex items-center border border-gray-300 rounded-full px-3 py-1.5 bg-white'>
      <input
        type='text'
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder='검색어를 입력해주세요'
        className='flex-1 bg-transparent outline-none text-sm text-gray-700'
      />
      <button
        onClick={handleSearch}
        className='rounded-full bg-[var(--color-mint-light,#6fd0c2)] p-1.5'
      >
        <SearchIcon className='size-4 text-white' />
      </button>
    </div>
  );
}
