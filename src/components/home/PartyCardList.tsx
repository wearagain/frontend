import { useNavigate } from "react-router-dom";
import PartyCard from "./PartyCard";

function PartyCardList() {
  const navigate = useNavigate();
  const handlePartyNavigation = () => {
    navigate("/party");
  };
  return (
    <div className='px-5'>
      <div className='flex justify-between pb-5'>
        <h2 className='text-lg font-bold'>진행중인 파티</h2>
        {/*PartyListPage로 이동 */}
        <p onClick={handlePartyNavigation} className='text-gray-500 cursor-pointer'>
          전체보기
        </p>
      </div>
      <div className='pb-5 flex'>
        {/* api 연결 필요, 최근 파티 여러개 슬라이드 -> Map 사용 예정 */}
        <PartyCard
          title={"광진 능동파티"}
          participants={10}
          date={"2025년 11월 3일"}
          status={"진행예정"}
          thumbnailSrc={""}
        />
      </div>
    </div>
  );
}

export default PartyCardList;
