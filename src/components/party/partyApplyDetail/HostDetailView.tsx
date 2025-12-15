import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import AlertItem from "@/components/party/partyParticipate/step4InfoCheck/AlertItem.tsx";
import { StatusBadge } from "@/components/party/partyApplyDetail/StatusBadge.tsx";
import { CollapsibleSection } from "@/components/party/partyApplyDetail/CollapsibleSection.tsx";
import InfoRow from "@/components/party/partyApplyDetail/DetailInfoRow.tsx";
import { formatDateKR } from "@/utils/formatDate";
import { useCancelHostApplication } from "@/hooks/party/useApply";
import type { HostApplicationResponse } from "@/types/apply";
import { Headset } from "lucide-react";
import {DeliveryStatusDescription} from "@/constants/adminConstants.ts";

interface HostDetailViewProps {
  data: HostApplicationResponse;
}

export const HostDetailView = ({ data }: HostDetailViewProps) => {
  const navigate = useNavigate();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const { mutate: cancelHostApplication, isPending: isCancelling } = useCancelHostApplication();

  const {
    id,
    status,
    partyId,
    partyTitle,
    partyDescription,
    isGroup,
    groupName,
    name,
    phone,
    email,
    address,
    addressDetail,
    openAt,
    closeAt,
    maxChangeCnt,
    maxAttendeeCnt,
    deliverAddress,
    deliverAddressDetail,
    desiredDate,
    appliedAt,
    processMemo,
    taxReceipt,
    taxEmail,
    taxId,
    deliveryStatus,
    trackingNumber,
  } = data;

  const handleConfirmCancel = () => {
    cancelHostApplication(id, {
      onSuccess: () => {
        setShowCancelModal(false);
        navigate("/party/apply?tab=host");
      },
    });
  };

  const handleManage = () => {
    navigate(`/admin/party/manage/${partyId}/participants`)
  }

  const renderAlert = () => {
    switch (status) {
      case "PENDING":
        return <AlertItem message='승인대기 중입니다.' className='my-5 bg-[#F4F5F6]' />;
      case "REJECTED":
        return (
          <AlertItem message={processMemo || "승인 반려 사유"} className='bg-[#FEECEC] my-5' />
        );
      default:
        return <div className='mb-5' />;
    }
  };

  const renderActionButton = () => {
    if (status === "PENDING" || status === "APPROVED") {
      return (
        <div className='flex gap-2'>
          <Button
            theme='purpleOutlined'
            onClick={() => navigate("/party/help", { state: { partyTitle } })}
            className='w-14'
          >
            <Headset size={20} />
          </Button>
          <Button theme='purple' onClick={() => setShowCancelModal(true)} className='w-full'>
            취소하기
          </Button>
        </div>
      );
    } else if (status === "REJECTED") {
      return (
        <Button
          theme='purple'
          onClick={() => navigate(`/party/help`, { state: { partyTitle } })}
          className='w-full'
        >
          문의하기
        </Button>
      );
    }
    return null;
  };

  return (
    <div className='flex flex-col h-screen'>
      {/* 헤더 */}
      <div className='bg-white shrink-0 sticky top-0 p-5 z-10'>
        <div className='flex items-center justify-between gap-2'>
          <h2>{partyTitle}</h2>
          <StatusBadge status={status} />
        </div>
        <div className='flex items-center mt-1 gap-1 text-[#555558] text-sm font-normal'>
          <p>{isGroup ? "단체" : "개인"}</p>
          <div className='w-0.5 h-0.5 rounded-full bg-[#D9D9D9]' />
          <p>{address}</p>
        </div>
      </div>

      <main className='flex-1 overflow-y-auto custom-scroll mb-14'>
        <div className='divider' />
        {/* 신청 정보 */}
        <div className='px-5'>
          <h3 className='mb-4'>신청 정보</h3>
          <h2 className='mb-1'>
            {formatDateKR(openAt)} ~ {formatDateKR(closeAt)}
          </h2>
          <p className='mb-1'>{partyDescription}</p>
          <p className='text-[#939396] text-sm'>{formatDateKR(appliedAt)} 등록</p>
          <div>{renderAlert()}</div>
        </div>
        <div className='divider' />

        {/* 상세 정보 */}
        <CollapsibleSection title='상세 정보' className='px-5'>
          <div className='mt-5 space-y-5'>
            {/* 주최자 정보 */}
            <div className='px-5'>
              <h4 className='font-semibold mb-3'>주최자 정보</h4>
              <div className='flex flex-col gap-2'>
                <InfoRow label='주최자' value={name} />
                <InfoRow label='소속' value={isGroup ? groupName : "-"} />
                <InfoRow label='연락처' value={phone || "-"} />
                <InfoRow label='이메일' value={email} />
              </div>
            </div>
            <div className='divider' />

            {/* 파티 정보 */}
            <div className='px-5'>
              <h4 className='font-semibold mb-3'>파티 정보</h4>
              <div className='flex flex-col gap-2'>
                <InfoRow
                  label='날짜'
                  value={`${formatDateKR(openAt)} ~ ${formatDateKR(closeAt)}`}
                />
                <InfoRow label='장소' value={`${address} ${addressDetail}`} />
                <div className='flex justify-between'>
                <InfoRow label='최대 참석자 수' value={`${maxAttendeeCnt}명`} />
                {data?.partyId &&
                    <button
                        onClick={handleManage}
                        className="min-w-max font-regular text-sm underline text-[#939396]"
                    >
                      참여자 관리
                    </button>
                } </div>
                <InfoRow label='최대 의류 수량' value={`${maxChangeCnt}벌`} />
                <InfoRow label='소개' value={partyDescription} />
              </div>
            </div>
            <div className='divider' />

            {/* 배송 및 결제 */}
            <div className='px-5 mb-5'>
              <h4 className='font-semibold mb-3'>결제 및 배송</h4>
              <div className='flex flex-col gap-2'>
                {deliveryStatus && <InfoRow label='상태' value={DeliveryStatusDescription[deliveryStatus] || "-"} />}
                <InfoRow
                  label='주소'
                  value={`${deliverAddress || ""} ${deliverAddressDetail || ""}`}
                />
                <InfoRow label='희망 배송일' value={formatDateKR(desiredDate)} />
                {trackingNumber && <InfoRow label='운송장 번호' value={trackingNumber || "-"} />}
                <InfoRow label='세금계산서 발행' value={taxReceipt ? "예" : "아니요"} />
                {taxReceipt && <InfoRow label='사업자번호' value={taxId || "-"} />}
                {taxReceipt && <InfoRow label='발행 이메일' value={taxEmail || "-"} />}
              </div>
            </div>
          </div>
        </CollapsibleSection>
      </main>

      {/* 하단 버튼 */}
      <div className='shrink-0 sticky bottom-0 bg-white px-5 pt-4 pb-8'>{renderActionButton()}</div>

      {/* 취소 확인 모달 */}
      {showCancelModal && (
        <Modal
          header='신청을 취소하시겠습니까?'
          confirmText={isCancelling ? "취소 중..." : "취소하기"}
          onConfirm={handleConfirmCancel}
          onClose={() => setShowCancelModal(false)}
          confirmDisabled={isCancelling}
          theme='purple'
        ></Modal>
      )}
    </div>
  );
};
