import { EllipsisVertical } from "@/assets/icons";
import { useDropdown } from "@/hooks/common/useDropdown.ts";

interface HeaderDropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export default function HeaderDropdownMenu({
  children,
  className = "w-6",
}: HeaderDropdownMenuProps) {
  const { open, toggle } = useDropdown();

  return (
    <div className='relative translate-y-1.5 z-50 '>
      <button onClick={toggle}>
        <EllipsisVertical className={className} />
      </button>
      {open && <div className='dropdown-menu-header'>{children}</div>}
    </div>
  );
}
