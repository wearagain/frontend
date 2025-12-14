import DropdownMenuContents from "@/components/admin/party/common/DropdownContents/DropdownMenuContents.tsx";
import LocalDropdownMenu from "@/components/common/LocalDropdownMenu.tsx";

export default function HostInfoDropdown() {
  return (
    <LocalDropdownMenu className='w-4.5'>
      <DropdownMenuContents />
    </LocalDropdownMenu>
  );
}
