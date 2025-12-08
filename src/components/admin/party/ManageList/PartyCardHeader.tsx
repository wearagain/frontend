import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyAdminStatus } from "@/types/adminTypes.ts";

interface PartyCardHeaderProps {
  title: PartyAdminStatus;
  total: number;
  className?: string;
}

export default function PartyCardHeader({title, total, className}: PartyCardHeaderProps ) {
  return(
    <div className={`px-5 flex items-center gap-1 font-bold text-base ${className}`}>
      <h4>{PartyStatusDescription[title]}</h4>
      <h4>{total}</h4>
    </div>
  )
}