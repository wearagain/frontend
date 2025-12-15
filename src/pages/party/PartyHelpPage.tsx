import { useLocation, useParams, useNavigate } from "react-router-dom";
import { HelpHeader } from "@/components/party/partyHelp/HelpHeader";
import { HelpForm } from "@/components/party/partyHelp/HelpForm";
import { usePostInquiry } from "@/hooks/party/usePostInquiry";
import type { CreateInquiryRequest } from "@/types/help";

const PartyHelpPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state as { partyTitle: string } | null;
  const fromPartyTitle = state?.partyTitle ?? "";

  const { mutate: submitInquiry, isPending } = usePostInquiry(id ?? "");

  const handleSubmit = (payload: CreateInquiryRequest) => {
    if (!id) return;

    submitInquiry(payload, {
      onSuccess: () => {
        navigate(`/party/help/${id}/complete`);
      },
    });
  };

  return (
    <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
      <div className='flex flex-col h-screen'>
        <HelpHeader />
        <HelpForm
          defaultPartyTitle={fromPartyTitle ?? ""}
          onSubmit={handleSubmit}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

export default PartyHelpPage;
