import ProfileIcon from "@/assets/icons/ProfileIcon.tsx";
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface ProfileProps {
  name: string | undefined;
  ticket: number | null;
  impact: number | null;
}

export default function ProfileSection({ name = "", ticket = 0, impact = 0 }: ProfileProps) {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-between p-5">
      <div className="flex flex-col gap-1">
        <h3 className="flex items-center gap-1 cursor-pointer hover:underline" onClick={() => {
          navigate("/settings/profile");
        }}>{name} 님 <ChevronRight className="w-4 h-4" /></h3>
        <div className="flex items-center gap-1 text-[#555558] text-sm font-normal">
          <p className="cursor-pointer hover:underline" onClick={() => {
            navigate("/qr");
          }}>보유 티켓 <span className="font-bold">{ticket}</span></p>
          <div className="w-0.5 h-0.5 rounded-full bg-[#D9D9D9]" />
          <p className="cursor-pointer hover:underline" onClick={() => {
            navigate("/impact/receipt");
          }}>CO<sub>2</sub> 절감 <span className="font-bold">{impact}kg</span></p>
        </div>
      </div>
      <ProfileIcon className="h-14 w-14" />
    </div>
  );
}
