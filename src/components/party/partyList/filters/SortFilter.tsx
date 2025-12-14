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
      theme={"normalOutlined"}
      onClick={toggleSort}
      className='h-9 w-fit min-w-max rounded-full border transition-colors text-[#222222] hover:bg-(--color-mint-light) hover:border-(--color-mint-light) hover:text-white'
    >
      {value === "popular" ? "인기순" : "최신순"}
      <ArrowUpDownIcon className='ml-1 size-4' />
    </Button>
  );
}
