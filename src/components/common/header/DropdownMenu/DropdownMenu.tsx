import { createPortal } from "react-dom";
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
  const { open, toggle, ref } = useDropdown();

  return (
    <div className='relative translate-y-0.5'>
      <button onClick={toggle}>
        <EllipsisVertical className={className} />
      </button>
      {open &&
        createPortal(
          <div ref={ref} className='dropdown-menu-header'>
            {children}
          </div>,
          document.body
        )}
    </div>
  );
}
