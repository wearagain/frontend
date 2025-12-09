import { PartyDetailMap } from "@/constants/adminConstants.ts";
import OrganizationDropdown from "@/components/admin/party/AppliedPartyDetail/DropdownContents/OrganizationDropdown.tsx";

interface DetailSectionProps {
  title: string;
  data: Record<string, any>;
  keys: readonly string[];
  labelWidth?: string;
  isOrganization?: boolean;
}

export default function DetailSection({
  title,
  data,
  keys,
  labelWidth = "w-[45px]",
  isOrganization,
}: DetailSectionProps) {
  return (
    <div className='flex flex-col gap-5 px-5 pb-5'>
      <div className='flex items-center justify-between'>
        <h4 className='font-bold text-base'>{title}</h4>
        {isOrganization && <OrganizationDropdown />}
      </div>
      <div className='flex flex-col gap-4'>
        {keys.map((key) => {
          const value = data[key];
          if (value === undefined) return null;

          return (
            <div key={key} className='flex items-start gap-5'>
              <h3 className={`font-semibold ${labelWidth} shrink-0`}>{PartyDetailMap[key]}</h3>
              <h4 className='font-medium text-base text-[#555558]'>{String(value)}</h4>
            </div>
          );
        })}
      </div>
    </div>
  );
}
