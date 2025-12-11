import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

interface CollapsibleSectionProps {
  title: string;
  count?: number;
  defaultOpen?: boolean;
  children: React.ReactNode;
  className?: string;
}

export const CollapsibleSection = ({
  title,
  count,
  defaultOpen = true,
  children, className,
}: CollapsibleSectionProps) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <>
      <div
        className={`flex items-center justify-between cursor-pointer ${className}`}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <h3>
          {title} <span className='text-(--color-mint-light)'>{count !== undefined && count}</span>
        </h3>
        {isOpen ? (
          <ChevronUp size={20} className='text-[#939396]' />
        ) : (
          <ChevronDown size={20} className='text-[#939396]' />
        )}
      </div>
      {isOpen && children}
    </>
  );
};
