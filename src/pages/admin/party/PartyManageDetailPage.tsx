import { useState } from "react";
import { useParams } from "react-router-dom";
import ManageDetailHeader from "@/components/admin/party/manage/ManageDetail/ManageDetailHeader.tsx";
import DetailSection from "@/components/admin/party/applications/AppliedPartyDetail/DetailSection.tsx";
import { Outlet } from "react-router-dom";
import { GROUP1_KEYS, GROUP2_KEYS, GROUP3_KEYS, SINGLE_KEYS } from "@/constants/adminConstants.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { useGetPartyManageDetail } from "@/hooks/admin/party/manage/useGetPartyManageDetail.ts";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/applications/useGetPartyApplicationDetail.ts";
import DeliveryModal from "@/components/admin/party/manage/modal/DeliveryModal.tsx";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";
import { usePatchDeliveryStatus } from "@/hooks/admin/party/applications/usePatchDeliveryStatus.ts";
import TaxModal from "@/components/admin/party/manage/modal/TaxModal.tsx";
import { usePatchTax } from "@/hooks/admin/party/manage/usePatchTax.ts";

export default function PartyManageDetailPage() {
  const { partyId } = useParams<{ partyId: string }>();

  const { data, isLoading, isError, error } = useGetPartyManageDetail(partyId ?? "");

  const { data: applicationData } = useGetPartyApplicationDetail(data?.applicationId ?? "");

  const [openDeliveryModal, setOpenDeliveryModal] = useState<boolean>(false);
  const [openTaxModal, setOpenTaxModal] = useState<boolean>(false);

  const { mutateAsync: mutateDeliveryStatus } = usePatchDeliveryStatus();
  const { mutateAsync: mutateTax } = usePatchTax();

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div>
        <ManageDetailHeader
          id={data?.id}
          title={data?.title}
          openAt={data?.openAt}
          isGroup={data?.isGroup}
          status={data?.status}
          deliveryStatus={applicationData?.deliveryStatus}
        />
        <div className="divider" />
        <DetailSection
          isDetail title="주최자 정보" data={applicationData}
          keys={data?.isGroup == "단체" ? GROUP1_KEYS : SINGLE_KEYS} headerButtonType="host" />
        <div className="divider" />
        <DetailSection
          isDetail title="파티 정보"
          data={{ currentAttendeeCnt: data?.currentAttendeeCnt, ...applicationData }} keys={GROUP2_KEYS}
          labelWidth="w-[92px]" />
        <div className="divider" />
        <DetailSection
          isDetail title="결제 및 배송" data={applicationData} keys={GROUP3_KEYS} labelWidth="w-[102px]"
          onOpen={() => setOpenDeliveryModal(true)}
          headerButtonType="payDelivery"
          headerButtonProps={{
            taxReceipt: () => setOpenTaxModal(true),
          }}
        />
        <Outlet />
      </div>
      {openDeliveryModal &&
        <DeliveryModal
          setOpenModal={setOpenDeliveryModal}
          nextStatus={getNextDeliveryStatus(applicationData?.deliveryStatus)}
          mutate={mutateDeliveryStatus}
          data={{
            deliveryStatus: getNextDeliveryStatus(applicationData?.deliveryStatus),
            deliveryMemo: applicationData?.deliveryMemo,
            trackingNumber: applicationData?.trackingNumber,
            courierName: applicationData?.courierName,
          }}
          applicationId={data?.applicationId}
        />
      }
      {/** TODO: API patch Tax 연결 */}
      {openTaxModal &&
        <TaxModal
          setOpenModal={setOpenTaxModal}
          mutate={mutateTax}
          data={{
            taxId: applicationData?.taxId,
            name: data?.name,
          }}
        />
      }
    </StatusHandler>
  );
}
