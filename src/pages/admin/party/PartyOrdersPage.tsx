import { useState, useEffect } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateLabelValueObjWithAll } from "@/utils/common/generateLabelValueObj.tsx";
import {
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import type { ManageBarStatus, ManageAction, DeliveryStatus, SelectedItemStatus } from "@/types/admin/party.ts";
import { useGetPartyOrderList } from "@/hooks/admin/party/orders/useGetPartyOrderList.ts";
import OrderList from "@/components/admin/party/orders/OrderList/OrderList.tsx";
import ActionBottomBar from "@/components/admin/party/orders/OrderList/ActionBottomBar.tsx";


export interface ManageModalProps {
  setOpenModal: (v: boolean) => void;
  setModalAction: React.Dispatch<React.SetStateAction<ManageAction>>;
}

export default function PartyOrdersPage() {
  const { data, groupedData, isLoading, isError, error } = useGetPartyOrderList();

  const tabs = generateLabelValueObjWithAll(DeliveryStatusDescription);
  const [filterType, setFilterType] = useState<DeliveryStatus | "ALL">("ALL");

  const [activeSection, setActiveSection] = useState<DeliveryStatus | null>(null);

  const [bottombarStatus, setBottombarStatus] = useState<ManageBarStatus>(null);

  const [selected, setSelected] = useState<SelectedItemStatus<DeliveryStatus>>({});

  const renderBottomComponents = () => {
    if (bottombarStatus == "control") return <ActionBottomBar {...selected} />;
    return null;
  };

  /** bottombar 컴포넌트 초기화 */
  useEffect(() => {
    if (activeSection === null) {
      setBottombarStatus(null);
      setSelected({});
    }
  }, [activeSection]);


  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full relative">
        <FilterHeader onChange={(v) => setFilterType(v ?? "ALL")} tabs={tabs} theme="purple" value={filterType} />
        <OrderList
          total={data?.length ?? 0}
          groupedData={groupedData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          selected={selected}
          setSelected={setSelected}
          setBottombarStatus={setBottombarStatus}
          filterType={filterType}
        />
        {renderBottomComponents()}
      </div>

    </StatusHandler>
  );
}
