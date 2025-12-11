import { useParams, useSearchParams } from "react-router-dom";
import { useGetParticipation, useGetHostApplication } from "@/hooks/party/useApply";
import { ParticipateDetailView } from "@/components/party/partyApplyDetail/ParticipateDetailView";
import { HostDetailView } from "@/components/party/partyApplyDetail/HostDetailView";
import StatusHandler from "@/components/common/StatusHandler.tsx";

type ApplyType = "participate" | "host";

export default function ApplyDetailPage() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();

  const type = (searchParams.get("type") as ApplyType) || "participate";

  const {
    data: participateData,
    isLoading: isParticipateLoading,
    isError: isParticipateError,
    error: participateError,
  } = useGetParticipation(id ?? "", type === "participate");
  const {
    data: hostData,
    isLoading: isHostLoading,
    isError: isHostError,
    error: hostError,
  } = useGetHostApplication(id ?? "", type === "host");

  const isLoading = type === "participate" ? isParticipateLoading : isHostLoading;
  const isError = type === "participate" ? isParticipateError : isHostError;
  const error = type === "participate" ? participateError : hostError;

  return (
    <div className='fixed inset-y-[64px] h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-[64px] mx-auto'>
      <StatusHandler isLoading={isLoading} isError={isError} error={error}>
        {type === "participate" && participateData && (
          <ParticipateDetailView data={participateData} />
        )}
        {type === "host" && hostData && <HostDetailView data={hostData} />}
      </StatusHandler>
    </div>
  );
}
