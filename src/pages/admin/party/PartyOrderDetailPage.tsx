import { useState } from "react";
import { useParams } from "react-router-dom";
import { Outlet } from "react-router-dom";
import DetailSection from "@/components/admin/party/common/Detail/DetailSection.tsx";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import DeliveryModal from "@/components/admin/party/common/Modal/DeliveryModal.tsx";
import TaxModal from "@/components/admin/party/common/Modal/TaxModal.tsx";
import DetailHeader from "@/components/admin/party/common/Detail/DetailHeader.tsx";
import { useGetPartyApplicationDetail } from "@/hooks/admin/party/applications/useGetPartyApplicationDetail.ts";
import { usePatchDeliveryStatus } from "@/hooks/admin/party/applications/usePatchDeliveryStatus.ts";
import { usePatchTax } from "@/hooks/admin/party/manage/usePatchTax.ts";
import { GROUP1_KEYS, GROUP2_KEYS, GROUP3_KEYS, SINGLE_KEYS } from "@/constants/adminConstants.ts";

export default function PartyOrderDetailPage() {
  const { applicationId } = useParams<{ applicationId: string }>();

  const { data, isLoading, isError, error } = useGetPartyApplicationDetail(applicationId ?? "");

  const [openDeliveryModal, setOpenDeliveryModal] = useState<boolean>(false);
  const [openTaxModal, setOpenTaxModal] = useState<boolean>(false);

  const { mutateAsync: mutateDeliveryStatus } = usePatchDeliveryStatus();
  const { mutateAsync: mutateTax } = usePatchTax();

  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div>
        <DetailHeader
          id={applicationId ?? ""}
          title={data?.partyTitle}
          appliedAt={data?.appliedAt}
          isGroup={data?.isGroup}
          // partyStatus={data?.partyStatus}
          deliveryStatus={data?.deliveryStatus}
        />
        <div className="divider" />
        <DetailSection
          isDetail title="주최자 정보" data={data}
          keys={data?.isGroup ? GROUP1_KEYS : SINGLE_KEYS} headerButtonType="host" />
        <div className="divider" />
        <DetailSection
          isDetail title="파티 정보"
          data={data} keys={GROUP2_KEYS}
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
          mutate={mutateDeliveryStatus}
          data={data}
        />
      }
      {/** TODO: API patch Tax 연결 */}
      {openTaxModal &&
        <TaxModal
          setOpenModal={setOpenTaxModal}
          mutate={mutateTax}
          data={data}
        />
      }
    </StatusHandler>
  );
}


