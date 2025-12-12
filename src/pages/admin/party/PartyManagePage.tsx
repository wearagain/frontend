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
import ManageModal from "@/components/admin/party/modal/ManageModal.tsx";
import type { ManageBarStatus, ManageAction, SelectedItemStatus } from "@/types/admin/party.ts";
import { usePatchPartyStatus } from "@/hooks/admin/party/manage/usePatchPartyStatus.ts";
import ManageList from "@/components/admin/party/manage/ManageList/ManageList.tsx";


export default function PartyManagePage() {
  const { data, groupedData, isLoading, isError, error } = useGetPartyManageList();

  console.log(groupedData);

  const tabs = generateLabelValueObjWithAll(PartyStatusDescription);
  const [filterType, setFilterType] = useState<PartyStatus | "ALL">("ALL");

  const [activeSection, setActiveSection] = useState<PartyStatus | null>(null);

  const [bottombarStatus, setBottombarStatus] = useState<ManageBarStatus>(null);

  const [selected, setSelected] = useState<SelectedItemStatus<PartyStatus>>({});

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ManageAction>(null);

  const { mutateAsync: mutatePartyStatus } = usePatchPartyStatus();

  const modalInstance = { setOpenModal, setModalAction };

  const isManageAction = (status: ManageBarStatus): status is Exclude<ManageAction, null> => {
    return status === "confirm" || status === "delete";
  };

  const renderBottomComponents = () => {
    if (bottombarStatus == null) return <AddPartyButton />;
    if (bottombarStatus == "control") return <ControlBottomBar setBottombarStatus={setBottombarStatus} />;
    if (isManageAction(bottombarStatus))
      return <ActionBottomBar action={bottombarStatus} {...selected} {...modalInstance} />;
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
        <ManageList
          total={data?.length ?? 0}
          groupedData={groupedData}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          selected={selected}
          setSelected={setSelected}
          setBottombarStatus={setBottombarStatus}
          modalInstance={modalInstance}
          filterType={filterType}
        />
        {renderBottomComponents()}
      </div>

      {openModal && <ManageModal
        setOpenModal={setOpenModal}
        action={modalAction}
        {...selected}
        onConfirm={async () => {
          if (!selected.ids || !selected.nextStatus) return;
          try {
            await mutatePartyStatus({
              id: selected.ids[0],
              status: selected.nextStatus,
              count: selected.ids.length,
            });
            setOpenModal(false);
          } catch {
          }
        }}
      />}
    </StatusHandler>
  );
}
