import type {inquiryType} from "@/types/help";

interface HelpDropdownItemProps {
  category: inquiryType;
  label: string;
  onSelect: (category: inquiryType) => void;
  isSelected?: boolean;
  isLast?: boolean;
}

export function HelpDropdownItem({category, label, onSelect, isSelected, isLast}: HelpDropdownItemProps) {
  return (
      <div className="flex flex-col gap-2 items-center">
        <button
            className={`dropdown-menu-item hover:text-(--color-purple-light) hover:font-medium ${isSelected ? "font-bold text-(--color-purple-light)" : ""}`}
            onClick={() => onSelect(category)}
        >
          {label}
        </button>
        { !isLast && (<div className="border-b border-gray-300 mb-2 w-full" />)}
      </div>
  );
}