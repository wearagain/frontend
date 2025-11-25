import { Button } from "@/components/ui/button";
import type { BoardType } from "@/types/board";

interface BoardTypeFilterProps {
  value?: BoardType;
  onChange: (v?: BoardType) => void;
}

export function BoardTypeFilter({ value, onChange }: BoardTypeFilterProps) {
  const tabs: { label: string; type?: BoardType }[] = [
    { label: "자유", type: "FREE" },
    { label: "정보공유", type: "INFO" },
    { label: "FAQ", type: "QNA" },
  ];

  return (
    <>
      {tabs.map(({ label, type }) => (
        <Button
          key={label}
          onClick={() => onChange(type)}
          className={`h-9 rounded-full border transition-colors ${
            value === type
              ? "bg-gray-700 text-white border-gray-700"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {label}
        </Button>
      ))}
    </>
  );
}
