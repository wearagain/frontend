import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem.tsx";
import type { NoticeDocument } from "@/types/notice.ts";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";



interface NoticeListProps {
  data: NoticeDocument[] | undefined;
}



function NoticeList({data}: NoticeListProps) {
  const navigate = useNavigate();
  const handleNoticeNavigation = () => {
    navigate("/support/notice");
  };

  console.log(data);
  return (
    <div className='px-5 pb-8 pt-5'>
      <div className='flex justify-between items-center pb-5'>
        <h2>공지사항</h2>
        <p
          onClick={handleNoticeNavigation}
          className='text-[#939396] cursor-pointer hover:underline'
        >
          더보기
        </p>
      </div>
      <div className='border border-[#E0E2E4] rounded-2xl overflow-hidden'>
        {data?.map((notice, idx) => (
          <ListItem
            key={notice.title}
            title={notice.title}
            date={getDateTime(notice.createdAt, "yyyy.MM.dd")}
            isFirst={idx === 0}
            onClick={handleNoticeNavigation}
          />
        ))}
      </div>
    </div>
  );
}

export default NoticeList;
