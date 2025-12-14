import { ApplyCard } from "./ApplyCard";
import type { PartyParticipantResponse, HostApplicationResponse } from "@/types/apply";

interface ApplyListProps {
  type: "participate" | "host";
  data?: PartyParticipantResponse[] | HostApplicationResponse[];
  onCardClick?: (id: string) => void;
}

export const ApplyList = ({ type, data = [], onCardClick }: ApplyListProps) => {
  if (data.length === 0) {
    return (
        <div className='flex flex-col items-center justify-center py-20 text-[#939396]'>
          <p>내역이 없습니다</p>
        </div>
    );
  }

  return (
      <div className='flex-1 flex-col overflow-y-auto custom-scroll bottombar-p'>
        {data.map((item) => (
            <ApplyCard
                key={item.id}
                type={type}
                data={item}
                onClick={() => onCardClick?.(item.id)}
            />
        ))}
      </div>
  );
};