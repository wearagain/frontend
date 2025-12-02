import { Button } from "@/components/ui/button";
import { filterTheme, type FilterThemeKey } from "@/constants/themeColor.ts";

interface TabFilterProps<T extends string> {
  value?: T;
  onChange: (v?: T) => void;
  tabs: { label: string; value: T }[];
  theme: FilterThemeKey;
}

export function FilterHeader<T extends string>({
  value,
  onChange,
  tabs,
  theme = "mint",
}: TabFilterProps<T>) {
  const appliedFilterTheme = filterTheme[theme];

  return (
    <div className='main-inner flex h-fit gap-x-[6px] overflow-x-auto no-scrollbar py-3 border-b border-[#E0E2E4]'>
      {tabs.map(({ label, value: tabValue }) => (
        <Button
          key={label}
          onClick={() => onChange(tabValue)}
          className={`h-9 w-fit rounded-full border transition-colors ${
            value === tabValue
              ? appliedFilterTheme
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
