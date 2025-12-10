import { useLocation } from "react-router-dom";
import { HelpHeader } from "@/components/party/partyHelp/HelpHeader";
import { HelpForm } from "@/components/party/partyHelp/HelpForm";

const PartyHelpPage = () => {
  const location = useLocation();
  const state = location.state as Partial<{ partyTitle: string }> | null;
  const fromPartyTitle = state?.partyTitle ?? "";

  return (
    <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
      <div className='flex flex-col h-screen'>
        <HelpHeader />
        <HelpForm defaultPartyTitle={fromPartyTitle ?? ""} />
      </div>
    </div>
  );
};

export default PartyHelpPage;
