import { EllipsisVertical } from "@/assets/icons";
import { useDropdown } from "@/hooks/common/useDropdown.ts";

interface LocalDropdownMenuProps {
  children: React.ReactNode;
  className?: string;
}

export default function LocalDropdownMenu({ children, className = "w-6" }: LocalDropdownMenuProps) {
  const { open, toggle, ref } = useDropdown();

  return (
    <div className='relative inline-block'>
      <button onClick={toggle}>
        <EllipsisVertical className={className} />
      </button>
      {open && (
        <div ref={ref} className='dropdown-menu'>
          {children}
        </div>
      )}
    </div>
  );
}
