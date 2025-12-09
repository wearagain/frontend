import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

export interface PartyDetailHeaderProps {
  id: string;
  partyTitle: string;
  appliedAt: string;
  isGroup: boolean;
  status: string;
}

export default function PartyDetailHeader(
  {
    id,
    partyTitle,
    appliedAt,
    isGroup,
    status,
  }: PartyDetailHeaderProps) {
  const dateFormatted = format(new Date(appliedAt), "yyyy.MM.dd HH:mm", {
    locale: ko,
  });
  return (
    <div className="p-5 flex justify-between">
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-base">{partyTitle}</h2>
        <div className="font-medium text-[#555558] flex gap-1">
          <p>{id}</p>
          <p className="text-[#D9D9D9]">·</p>
          <p>{isGroup}</p>
        </div>
        <p className="font-medium text-[#939396]">{dateFormatted} 신청</p>
      </div>
      <p
        className="flex mt-0.5 h-fit items-center gap-1 px-2 py-[2px] text-sm border rounded-full text-[#424242] border-[#E4E4E4] font-medium">
        {status}
      </p>
    </div>
  );
}
