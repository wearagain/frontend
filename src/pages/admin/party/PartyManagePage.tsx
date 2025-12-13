import { useState, useEffect } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import { useGetPartyManageList } from "@/hooks/admin/party/manage/useGetPartyManageList.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateLabelValueObjWithAll } from "@/utils/common/generateLabelValueObj.tsx";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyStatus } from "@/types/party.ts";
import AddPartyButton from "@/components/admin/party/manage/ManageBottom/AddPartyButton.tsx";
import ControlBottomBar from "@/components/admin/party/manage/ManageBottom/ControlBottomBar.tsx";
import ActionBottomBar from "@/components/admin/party/manage/ManageBottom/ActionBottomBar.tsx";
import ManageModal from "@/components/admin/party/manage/Modal/ManageModal.tsx";
import type { ManageAction, SelectedItemStatus } from "@/types/admin/party.ts";
import { usePatchPartyStatus } from "@/hooks/admin/party/manage/usePatchPartyStatus.ts";
import ManageList from "@/components/admin/party/manage/ManageList/ManageList.tsx";


export default function PartyManagePage() {
  const { data, groupedData, isLoading, isError, error } = useGetPartyManageList();

  const tabs = generateLabelValueObjWithAll(PartyStatusDescription);
  const [filterType, setFilterType] = useState<PartyStatus | "ALL">("ALL");

  const [activeSection, setActiveSection] = useState<PartyStatus | null>(null);

  const [selected, setSelected] = useState<SelectedItemStatus<PartyStatus>>({});

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [action, setAction] = useState<ManageAction | null>(null);

  const { mutateAsync: mutatePartyStatus } = usePatchPartyStatus();

  const modalInstance = { setOpenModal, setAction };

  const isManageAction = (status: ManageAction): status is Exclude<ManageAction, null> => {
    return status === "confirm" || status === "delete";
  };

  const renderBottomComponents = () => {
    if (action == null) return <AddPartyButton />;
    if (action == "control") return <ControlBottomBar setAction={setAction} />;
    if (isManageAction(action))
      return <ActionBottomBar action={action} {...selected} {...modalInstance} />;
  };

  /** bottombar 컴포넌트 초기화 */
  useEffect(() => {
    if (activeSection === null) {
      setAction(null);
      setSelected({});
    }
  }, [activeSection]);


  return (
    <StatusHandler isLoading={isLoading} isError={isError} error={error}>
      <div className="flex flex-col h-full relative">
        <FilterHeader onChange={(v) => setFilterType(v ?? "ALL")} tabs={tabs} theme="purple" value={filterType} />
        <ManageList
          total={data?.length ?? 0}
          groupedData={groupedData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          selected={selected}
          setSelected={setSelected}
          modalInstance={modalInstance}
          filterType={filterType}
        />
        {renderBottomComponents()}
      </div>

      {openModal &&
        <ManageModal
          setOpenModal={setOpenModal}
          action={action}
          {...selected}
          mutate={mutatePartyStatus}
        />
      }
    </StatusHandler>
  );
}
