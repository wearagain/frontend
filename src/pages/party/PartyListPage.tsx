import { PartyList } from "@/components/party/partyList/PartyList";
import { GoToHostBtn } from "../../components/party/partyList/GotoHostBtn";

const PartyListPage = () => {
  return (
    <div className='relative min-h-screen'>
      <PartyList />
      <GoToHostBtn />
    </div>
  );
};

export default PartyListPage;
