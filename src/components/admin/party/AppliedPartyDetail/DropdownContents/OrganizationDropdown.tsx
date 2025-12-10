import DropdownMenuContents from "@/components/admin/party/AppliedPartyDetail/DropdownContents/DropdownMenuContents.tsx";
import LocalDropdownMenu from "@/components/common/LocalDropdownMenu.tsx";

export default function OrganizationDropdown() {
  return (
    <LocalDropdownMenu className='w-4.5'>
      <DropdownMenuContents />
    </LocalDropdownMenu>
  );
}
