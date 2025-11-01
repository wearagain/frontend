import { PartyBottomActions } from "@/components/party/partyDetails/PartyBottomActions";
import { PartyDescription } from "@/components/party/partyDetails/PartyDescription";
import { PartyInfo } from "@/components/party/partyDetails/PartyInfo";
import { PartyMap } from "@/components/party/partyDetails/PartyMap";
import { useGetParty } from "@/hooks/party/useGetParty";
import { useParams } from "react-router-dom";
import defaultImage from "@/assets/images/default.png";

const PartyDetailPage = () => {
  const { id } = useParams();
  const { data, isLoading } = useGetParty(id!);

  if (isLoading || !data) return <div></div>;

  const imageSrc = data.imageUrl && data.imageUrl.trim() !== "" ? data.imageUrl : defaultImage;

  return (
    <div className='relative pb-5 px-4'>
      <img
        src={imageSrc}
        alt={data.title}
        className='w-full h-56 object-cover rounded-lg mt-4'
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src = defaultImage;
        }}
      />
      <PartyInfo data={data} />
      <PartyDescription description={data.description} />
      <PartyMap xmap={data.xmap} ymap={data.ymap} />
      <PartyBottomActions />
    </div>
  );
};

export default PartyDetailPage;
