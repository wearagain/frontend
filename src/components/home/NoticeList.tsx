import { useNavigate } from "react-router-dom";
import NoticeItem from "./NoticeItem";

function NoticeList() {
  const navigate = useNavigate();
  const handleNoticeNavigation = () => {
    navigate("/support/notice");
  };
  return (
    <div className='p-5'>
      <div className='flex justify-between pb-5'>
        <h2 className='text-lg font-bold'>공지사항</h2>
        <p onClick={handleNoticeNavigation} className='text-gray-500'>
          더보기
        </p>
      </div>
      <div className='border border-gray-200 rounded-2xl overflow-hidden'>
        {/* TODO: map 적용 */}
        <NoticeItem title={"2월 신규 파티 오픈 안내"} date={"2025.01.20"} category={"공지"} />
      </div>
    </div>
  );
}

export default NoticeList;
