import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

interface ApplyInfoProps {
  date: Date;
  place: string;
  applyDate: Date;
  items: ItemProps[];
}

interface ItemProps {
  name: string;
  code: string;
  image?: string;
}

export default function RequestInfo({
  date = new Date(),
  place,
  applyDate = new Date(),
  items,
}: ApplyInfoProps) {
  const dateFormatted = format(new Date(date), "yyyy년 MM월 dd일(eee)", { locale: ko });
  const formatted = format(applyDate, "yyyy.M.d H:mm");

  return (
    <div className='main-inner min-w-max pr-5 flex flex-col gap-5 mb-5'>
      <h2>신청 정보</h2>
      <div>
        <h2>{dateFormatted} 수령</h2>
        <h4 className='text-medium text-base'>{place}</h4>
        <h5 className='text-medium text-sm text-[#939396]'>{formatted}</h5>
      </div>
      {items && items.length > 0 && (
        <div className='flex flex-col gap-2'>
          {items.map((item, index) => (
            <div key={index} className='text-sm'>
              {item.name} ({item.code})
            </div>
          ))}
        </div>
      )}
      <div className='flex items-center gap-2 bg-[#F4F5F6] h-[40px] p-5 rounded-[10px]'>
        <img src='/icons/warnTriangle.svg' alt='' />
        <h5 className='text-medium text-sm text-[#939396]'>
          선택한 날짜에 필히 수령 부탁드립니다.
        </h5>
      </div>
    </div>
  );
}
