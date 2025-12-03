import { PartyDetailMap } from "@/constants/adminConstants.ts";
import OrganizationDropdown from "@/components/admin/party/AppliedPartyDetail/DropdownContents/OrganizationDropdown.tsx";

interface DetailSectionProps {
  title: string;
  data: Record<string, any>;
  labelWidth?: string;
  isOrganization?: boolean;
}

export default function DetailSection({
  title,
  data,
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
        {Object.entries(data).map(([key, value]) => (
          <div key={key} className='flex items-center gap-5'>
            <h3 className={`font-semibold ${labelWidth}`}>{PartyDetailMap[key]}</h3>
            <h4 className='font-medium text-base text-[#555558]'>{String(value)}</h4>
          </div>
        ))}
      </div>
    </div>
  );
}
