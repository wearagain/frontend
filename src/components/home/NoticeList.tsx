import { useNavigate } from "react-router-dom";
import ListItem from "./ListItem.tsx";
import { homeNoticeItems } from "@/utils/home/dummy";
import {NoticeCategoryDescription} from "@/constants/homeConstants.ts";

function NoticeList() {
  const navigate = useNavigate();
  const handleNoticeNavigation = () => {
    navigate("/support/notice");
  };

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
        {homeNoticeItems.map((notice, idx) => (
          <ListItem
            key={notice.title}
            title={notice.title}
            date={notice.date}
            category={NoticeCategoryDescription[notice.category]}
            isFirst={idx === 0}
            isNotice={true}
            onClick={handleNoticeNavigation}
          />
        ))}
      </div>
    </div>
  );
}

export default NoticeList;
