import { useState, useEffect } from "react";
import { FilterHeader } from "@/components/common/FilterHeader.tsx";
import type { PartyAdminStatus } from "@/types/adminTypes.ts";
import { useGetPartyManageList } from "@/hooks/admin/party/useGetPartyManageList.ts";
import StatusHandler from "@/components/common/StatusHandler.tsx";
import { generateLabelValueObj } from "@/utils/common/generateLabelValueObj.tsx";
import { CHANGEABLE_PARTY_STATUS, PartyStatusDescription } from "@/constants/adminConstants.ts";
import { ManageSection } from "@/components/admin/party/ManageList/ManageSection.tsx";
import PartyCardHeader from "@/components/admin/party/ManageList/PartyCardHeader.tsx";
import type { PartyStatus } from "@/types/party.ts";
import AddPartyButton from "@/components/admin/party/ManageBottom/AddPartyButton.tsx";
import ControlBottomBar from "@/components/admin/party/ManageBottom/ControlBottomBar.tsx";
import ActionBottomBar from "@/components/admin/party/ManageBottom/ActionBottomBar.tsx";
import ManageModal from "@/components/admin/party/Modal/ManageModal.tsx";
import type { ManageBarStatus, ManageAction } from "@/types/admin/party.ts";

export interface ManageSelectedItem {
  nextStatus?: PartyStatus;
  ids?: string[];
}

export interface ManageModalProps {
  setOpenModal: (v: boolean) => void;
  setModalAction: React.Dispatch<React.SetStateAction<ManageAction>>;
}

export default function PartyManagePage() {
  const tabs = generateLabelValueObj(PartyStatusDescription);
  const [filterType, setFilterType] = useState<PartyAdminStatus | undefined>("ALL");
  const { data, groupedData, isLoading, isError, error } = useGetPartyManageList();

  const [activeSection, setActiveSection] = useState<PartyStatus | null>(null);

  const [bottombarStatus, setBottombarStatus] = useState<ManageBarStatus>(null);

  const [selected, setSelected] = useState<ManageSelectedItem>({});

  const [openModal, setOpenModal] = useState<boolean>(false);
  const [modalAction, setModalAction] = useState<ManageAction>(null);

  const modalInstance = { setOpenModal, setModalAction };

  const isManageAction = (
    status: ManageBarStatus,
  ): status is Exclude<ManageAction, null> => {
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
        <FilterHeader onChange={setFilterType} tabs={tabs} theme="purple" value={filterType} />
        <div className="flex-1 overflow-y-auto custom-scroll bottombar-p">
          <PartyCardHeader title="ALL" total={data?.length ?? 0} className="py-5" />
          {Object.entries(groupedData)?.map(([title, items]) => (
            items.length != 0 &&
            <span key={title}>
              <div className="divider-compact" />
              <ManageSection
                header={title as PartyStatus}
                items={items}
                activeSection={activeSection}
                setActiveSection={setActiveSection}
                setSelected={setSelected}
                setBottombarStatus={setBottombarStatus}
                canSelect={CHANGEABLE_PARTY_STATUS.includes(title)}
                modalInstance={modalInstance}
              />
            </span>
          ))}
        </div>
        {renderBottomComponents()}
      </div>

      {openModal && <ManageModal setOpenModal={setOpenModal} action={modalAction}  {...selected} />}
    </StatusHandler>
  );
}
