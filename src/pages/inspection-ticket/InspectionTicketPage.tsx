import { useNavigate } from "react-router-dom";
import { useGetMyHostedParties } from "@/hooks/party/useGetParty";
import { Button } from "@/components/ui/button";
import StatusHandler from "@/components/common/StatusHandler";
import { QrCode } from "lucide-react";
import { format } from "date-fns";
import { ko } from "date-fns/locale";

export default function InspectionTicketPage() {
  const navigate = useNavigate();

  const {
    data: hostedPartiesData,
    isLoading,
    isError,
    error,
  } = useGetMyHostedParties({ size: 100 });

  const parties = hostedPartiesData?.pages.flatMap((page) => page.parties) ?? [];

  const handleTicketScan = (partyId: string) => {
    navigate(`/inspection-ticket/${partyId}`);
  };

  return (
    <div className="flex flex-col h-full">
      <StatusHandler isLoading={isLoading} isError={isError} error={error}>
        {parties.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-4">
            <p className="text-gray-400 mb-4">주최한 파티가 없습니다.</p>
            <Button
              theme="purple"
              onClick={() => navigate("/host")}
              className="w-full max-w-sm"
            >
              파티 주최하기
            </Button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-5">
            <div className="flex flex-col gap-4">
              {parties.map((party) => {
                const formattedDate = party.openAt
                  ? format(new Date(party.openAt), "yyyy년 M월 d일", { locale: ko })
                  : "";

                return (
                  <div
                    key={party.id}
                    className="flex items-center justify-between p-4 rounded-lg bg-[var(--color-purple-dark)] text-white"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-base">{party.title}</h3>
                      {formattedDate && (
                        <p className="text-sm text-white/80 mt-1">{formattedDate}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleTicketScan(party.id)}
                      className="ml-4 bg-gray-100 text-gray-700 hover:bg-gray-200 flex items-center gap-2"
                    >
                      <QrCode size={16} />
                      <span>티켓 스캔</span>
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </StatusHandler>
    </div>
  );
}
