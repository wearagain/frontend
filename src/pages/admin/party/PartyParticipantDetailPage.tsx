import { Outlet, useParams } from "react-router-dom";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { useGetPartyParticipantDetail } from "@/hooks/admin/party/participants/useGetPartyParticipantDetial.ts";
import { useState } from "react";
import ParticipantDetailBottomBar
  from "@/components/admin/party/participants/ParticipantDetail/ParticipantDetailBottomBar.tsx";
import Modal from "@/components/ui/modal.tsx";
import { usePostParticipantStatus } from "@/hooks/admin/party/participants/usePostParticipantStatus.ts";
import ClothSection from "@/components/admin/party/participants/ParticipantDetail/ClothSection.tsx";
import ApplySection from "@/components/admin/party/participants/ParticipantDetail/ApplySection.tsx";
import HeaderSection from "@/components/admin/party/participants/ParticipantDetail/HeaderSection.tsx";

export default function PartyParticipantDetailPage() {

  const { participantId } = useParams<{ participantId: string }>();

  const { data, isLoading, isError, error } = useGetPartyParticipantDetail(participantId ?? "");
  const { mutateAsync: postParticipantStatus } = usePostParticipantStatus();

  const [openApproveModal, setOpenApproveModal] = useState<boolean>(false);



  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full">
        <div className={`flex flex-1 flex-col gap-1 ${data?.status == "PENDING" && "bottombar-p"}`}>
          <HeaderSection data={data} />
          <div className="divider-compact" />
          <ApplySection data={data} />
          <div className="divider-compact" />
          <ClothSection data={data} />
        </div>
        {data?.status == "PENDING" && <ParticipantDetailBottomBar openApproveModal={setOpenApproveModal} />}
        {openApproveModal &&
          <Modal
            theme="purple"
            header="참가자를 승인하시겠습니까?"
            confirmText="승인하기"
            onConfirm={() =>
              postParticipantStatus({
                id: participantId!,
                action: "approve",
              })
            }
            onClose={() => setOpenApproveModal(false)}
          />
        }
        <Outlet />
      </div>
    </StatusHandler>
  );
}
