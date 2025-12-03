import { type PartyItem } from "@/utils/admin/dummy.ts";
import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface PartyDetailHeader extends PartyItem {
  generatedDate: Date;
}

export default function PartyDetailHeader(items: PartyDetailHeader) {
  const dateFormatted = format(new Date(items.generatedDate), "yyyy.MM.dd HH:mm", {
    locale: ko,
  });
  return (
    <div className='p-5 flex justify-between'>
      <div className='flex flex-col gap-1'>
        <h2 className='font-bold text-base'>{items.partyName}</h2>
        <div className='font-medium text-[#555558] flex gap-1'>
          <p>{items.partyId}</p>
          <p className='text-[#D9D9D9]'>·</p>
          <p>{items.size}</p>
        </div>
        <p className='font-medium text-[#939396]'>{dateFormatted} 신청</p>
      </div>
      <p className='flex mt-0.5 h-fit items-center gap-1 px-2 py-[2px] text-sm border rounded-full text-[#424242] border-[#E4E4E4] font-medium'>
        승인대기
      </p>
    </div>
  );
}
