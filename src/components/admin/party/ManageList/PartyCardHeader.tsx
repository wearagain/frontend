import { Play } from "lucide-react";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyAdminStatus } from "@/types/adminTypes.ts";

interface PartyCardHeaderProps {
  title: PartyAdminStatus;
  total: number;
  className?: string;
  setAccordian?: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function PartyCardHeader({ title, total, className, setAccordian }: PartyCardHeaderProps) {
  return (
    <div className={`px-5 flex items-center gap-1 font-bold text-base ${className}`}>
      {title !== "ALL" && <button
        type="button"
        onClick={() => setAccordian?.(prev => !prev)}
      >
        <Play fill="#222222" stroke="#222222" className="w-3" />
      </button>}
      <h4>{PartyStatusDescription[title]}</h4>
      <h4>{total}</h4>
    </div>
  );
}