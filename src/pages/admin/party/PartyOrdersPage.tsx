import { useState, useEffect } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateLabelValueObjWithAll } from "@/utils/common/generateLabelValueObj.tsx";
import {
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import type {
  ManageAction,
  DeliveryStatus,
  OrderAction
} from "@/types/admin/party.ts";
import { useGetPartyOrderList } from "@/hooks/admin/party/orders/useGetPartyOrderList.ts";
import OrderList from "@/components/admin/party/orders/OrderList/OrderList.tsx";
import ActionBottomBar from "@/components/admin/party/orders/OrderListBottom/ActionBottomBar.tsx";
import { usePatchDeliveryStatus } from "@/hooks/admin/party/applications/usePatchDeliveryStatus.ts";
import DeliveryModal from "@/components/admin/party/orders/Modal/DeliveryModal.tsx";
import { useOrderSelectionStore } from "@/store/useOrderSelectionStore.ts";


export interface ManageModalProps {
  setOpenModal: (v: boolean) => void;
  setAction: React.Dispatch<React.SetStateAction<ManageAction>>;
}

export default function PartyOrdersPage() {
  const { data, groupedData, isLoading, isError, error } = useGetPartyOrderList();

  const tabs = generateLabelValueObjWithAll(DeliveryStatusDescription);
  const [filterType, setFilterType] = useState<DeliveryStatus | "ALL">("ALL");

  const {
    selected,
    activeSection,
    reset,
  } = useOrderSelectionStore();


  const [openModal, setOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<OrderAction | null>(null);
  const modalInstance = { setOpenModal, setAction };

  const { mutateAsync: mutateDeliveryStatus } = usePatchDeliveryStatus();

  const renderBottomComponents = () => {
    if (action == "confirm")
      return <ActionBottomBar action={action} {...modalInstance} {...selected} />;
    return null;
  };

  /** bottombar 컴포넌트 초기화 */
  useEffect(() => {
    if (activeSection === null) {
      setAction(null);
      reset();
    }
  }, [activeSection]);


  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full relative">
        <FilterHeader onChange={(v) => setFilterType(v ?? "ALL")} tabs={tabs} theme="purple" value={filterType} />
        <OrderList
          total={data?.length ?? 0}
          groupedData={groupedData}
          filterType={filterType}
          modalInstance={modalInstance}
        />
        {renderBottomComponents()}
      </div>

      {openModal &&
        <DeliveryModal
          setOpenModal={setOpenModal}
          {...selected}
          mutate={mutateDeliveryStatus}
        />
      }
    </StatusHandler>
  );
}
