import { useState } from "react";
import { useParams } from "react-router-dom";
import DetailSection from "@/components/admin/party/applications/AppliedPartyDetail/DetailSection.tsx";
import { Outlet } from "react-router-dom";
import {
  GROUP1_KEYS,
  GROUP2_KEYS,
  GROUP3_KEYS,
  SINGLE_KEYS,
} from "@/constants/adminConstants.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/applications/useGetPartyApplicationDetail.ts";
import DeliveryModal from "@/components/admin/party/manage/modal/DeliveryModal.tsx";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";
import { usePatchDeliveryStatus } from "@/hooks/admin/party/applications/usePatchDeliveryStatus.ts";
import TaxModal from "@/components/admin/party/manage/modal/TaxModal.tsx";
import { usePatchTax } from "@/hooks/admin/party/manage/usePatchTax.ts";
import OrderDetailHeader from "@/components/admin/party/orders/OrderList/OrderDetailHeader.tsx";

export default function PartyOrderDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const { data, isLoading, isError, error } = useGetPartyApplicationDetail(applicationId ?? "");

  const [openDeliveryModal, setOpenDeliveryModal] = useState<boolean>(false);
  const [openTaxModal, setOpenTaxModal] = useState<boolean>(false);

  const { mutateAsync: mutateDeliveryStatus } = usePatchDeliveryStatus();
  const { mutateAsync: mutateTax } = usePatchTax();

  console.log(data, data?.status, data?.deliveryStatus)


  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div>
        <OrderDetailHeader
          id={data?.id}
          title={data?.partyTitle}
          appliedAt={data?.appliedAt}
          isGroup={data?.isGroup}
          partyStatus={data?.partyStatus}
          deliveryStatus={data?.deliveryStatus}
        />
        <div className="divider" />
        <DetailSection
          isDetail title="주최자 정보" data={data}
          keys={data?.isGroup == "단체" ? GROUP1_KEYS : SINGLE_KEYS} headerButtonType="host" />
        <div className="divider" />
        <DetailSection
          isDetail title="파티 정보"
          data={{ currentAttendeeCnt: data?.currentAttendeeCnt, ...data }} keys={GROUP2_KEYS}
          labelWidth="w-[92px]" />
        <div className="divider" />
        <DetailSection
          isDetail title="결제 및 배송" data={data} keys={GROUP3_KEYS} labelWidth="w-[102px]"
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
          nextStatus={getNextDeliveryStatus(data?.deliveryStatus)}
          mutate={mutateDeliveryStatus}
          data={{
            deliveryStatus: getNextDeliveryStatus(data?.deliveryStatus),
            deliveryMemo: data?.deliveryMemo,
            trackingNumber: data?.trackingNumber,
            courierName: data?.courierName,
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
            taxId: data?.taxId,
            name: data?.name,
          }}
        />
      }
    </StatusHandler>
  );
}


