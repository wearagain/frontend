import { Button } from "@/components/ui/button";

interface TabFilterProps<T extends string> {
  value?: T;
  onChange: (v?: T) => void;
  tabs: { label: string; value: T }[];
}

export function TabFilter<T extends string>({ value, onChange, tabs }: TabFilterProps<T>) {
  return (
    <div className='flex h-fit gap-x-[6px] overflow-x-auto no-scrollbar pb-3 border-b border-[#E0E2E4]'>
      {tabs.map(({ label, value: tabValue }) => (
        <Button
          key={label}
          onClick={() => onChange(tabValue)}
          className={`h-9 w-fit rounded-full border transition-colors ${
            value === tabValue
              ? "bg-[#ECF9F9] text-[#3DC0C5] border-[#3DC0C5]"
              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-100"
          }`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
