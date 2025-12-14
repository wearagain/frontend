import { PartyList } from "@/components/party/partyList/PartyList";
import { GoToHostBtn } from "../../components/party/partyList/GotoHostBtn";

const PartyListPage = () => {
  return (
      <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
      <PartyList />
      <GoToHostBtn />
    </div>
  );
};

export default PartyListPage;
