import { useNavigate } from "react-router-dom";
import PartyCard from "./PartyCard";
import type { OngoingParty } from "@/types/pages.ts";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";


interface PartyCardProps {
  data: OngoingParty[] | undefined;
}

function PartyCardList({ data }: PartyCardProps) {
  const navigate = useNavigate();
  const handlePartyNavigation = (id: string) => {
    navigate(`/party/${id}`);
  };
  return (
    <div className="py-5">
      <div className="flex justify-between items-center px-5 mb-5">
        <h2>모집중인 파티</h2>
        <p
          onClick={() => navigate(`/party/`)}
          className="text-[#939396] cursor-pointer hover:underline"
        >
          전체보기
        </p>
      </div>
      <div className="px-5 flex gap-3 min-h-[100px] snap-x pr-4 snap-mandatory overflow-x-auto w-full custom-scroll">
        {data?.map(
          (party) => (
            <PartyCard
              key={party.partyId}
              title={party.partyTitle}
              participants={party.participantCount}
              date={getDateTime(party.partyEndDate, "yyyy년 MM월 dd일")}
              status="진행중"
              thumbnailSrc={party.partyImageUrl}
              onClick={() => handlePartyNavigation(party.partyId)}
            />
          ))}
      </div>
    </div>
  );
}

export default PartyCardList;
