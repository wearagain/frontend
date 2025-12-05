import { Button } from "@/components/ui/button";
import { filterTheme, type FilterThemeKey } from "@/constants/themeColor.ts";

interface TabFilterProps<T extends string> {
  value?: T;
  onChange: (v?: T) => void;
  tabs: { label: string; value: T }[];
  className?: string;
  theme: FilterThemeKey;
}

export function FilterHeader<T extends string>({
  value,
  onChange,
  tabs,
  className,
  theme = "mint",
}: TabFilterProps<T>) {
  const appliedFilterTheme = filterTheme[theme];

  return (
    <div className={`main-inner flex h-fit gap-x-[6px] overflow-x-auto no-scrollbar custom-scroll py-3 border-b border-[#E0E2E4] ${className}`}>
      {tabs.map(({ label, value: tabValue }) => (
        <Button
          key={label}
          onClick={() => onChange(tabValue)}
          className={`h-9 w-fit min-w-max rounded-full border transition-colors ${
            value === tabValue ? appliedFilterTheme : filterTheme.normal
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
