import { Button } from "@/components/ui/button";
import { ArrowUpDownIcon } from "@/assets/icons";

interface Props {
  value?: "popular" | "latest";
  onChange: (v: "popular" | "latest") => void;
}

export function SortFilter({ value, onChange }: Props) {
  const toggleSort = () => onChange(value === "popular" ? "latest" : "popular");

  return (
    <Button
      onClick={toggleSort}
      className='h-10 rounded-full border-gray-300 bg-white border text-gray-700 hover:bg-gray-100'
    >
      {value === "popular" ? "인기순" : "최신순"}
      <ArrowUpDownIcon className='ml-1 size-4' />
    </Button>
  );
}
