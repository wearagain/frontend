import { useNavigate } from "react-router-dom";
import PartyCard from "./PartyCard";
import { homePartyCards } from "@/utils/home/dummy";
import { PartyStatusDescription } from "@/constants/homeConstants.ts";

function PartyCardList() {
  const navigate = useNavigate();
  const handlePartyNavigation = () => {
    navigate("/party");
  };
  return (
    <div className='py-5'>
      <div className='flex justify-between items-center px-5 mb-5'>
        <h2>진행중인 파티</h2>
        <p
          onClick={handlePartyNavigation}
          className='text-[#939396] cursor-pointer hover:underline'
        >
          전체보기
        </p>
      </div>
      <div className='px-5 flex gap-3 min-h-[100px] snap-x pr-4 snap-mandatory overflow-x-auto w-full custom-scroll'>
        {homePartyCards.map((party) => (
          <PartyCard
            key={party.title}
            title={party.title}
            participants={party.currentAttendees}
            date={party.date}
            status={PartyStatusDescription[party.status]}
            thumbnailSrc={party.thumbnailSrc}
            onClick={handlePartyNavigation}
          />
        ))}
      </div>
    </div>
  );
}

export default PartyCardList;
