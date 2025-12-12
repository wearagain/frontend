import PartyCardHeader from "@/components/admin/party/common/List/PartyCardHeader.tsx";
import type { PartyStatus } from "@/types/party.ts";
import { CHANGEABLE_PARTY_STATUS, PartyStatusDescription } from "@/constants/adminConstants.ts";
import { PartySection } from "@/components/admin/party/common/List/PartySection.tsx";
import type { ManageAction, ManageBarStatus, PartyManageResponse, SelectedItemStatus } from "@/types/admin/party.ts";
import { getNextPartyStatus } from "@/utils/admin/party/getNextStatus.ts";
import { ManageCard } from "@/components/admin/party/manage/ManageList/ManageCard.tsx";

interface ManageListProps {
  total: number;

  groupedData: Record<PartyStatus, PartyManageResponse[]>,
  activeSection: PartyStatus | null,
  setActiveSection: React.Dispatch<React.SetStateAction<PartyStatus | null>>,

  selected: SelectedItemStatus<PartyStatus>,
  setSelected: React.Dispatch<React.SetStateAction<SelectedItemStatus<PartyStatus>>>,

  setBottombarStatus: React.Dispatch<React.SetStateAction<ManageBarStatus>>,
  modalInstance: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalAction: React.Dispatch<React.SetStateAction<ManageAction>>;
  }
  filterType: PartyStatus | "ALL";
}

export default function ManageList(
  {
    total,
    groupedData,
    filterType,
    ...props
  }: ManageListProps,
) {


  return (
    <div className="flex-1 overflow-y-auto custom-scroll bottombar-p">
      {filterType == "ALL" ? (
        <>
          <PartyCardHeader<PartyStatus>
            descriptionMap={PartyStatusDescription}
            title={filterType}
            total={total}
            className="py-5"
          />
          {Object.entries(groupedData)?.map(([title, items]) => (
            items.length != 0 &&
            <span key={title}>
                <div className="divider-compact" />
                <PartySection<PartyStatus, ManageBarStatus, PartyManageResponse>
                  header={title as PartyStatus}
                  items={items as PartyManageResponse[]}
                  descriptionMap={PartyStatusDescription}
                  canSelect={CHANGEABLE_PARTY_STATUS.includes(title)}
                  getNextStatus={getNextPartyStatus}
                  checkedAction="control"
                  children={(item: PartyManageResponse) => <ManageCard {...item} />}
                  {...props}
                />
              </span>
          ))}
        </>
      ) : (
        <>
          <PartySection<PartyStatus, ManageBarStatus, PartyManageResponse>
            header={filterType}
            items={groupedData[filterType] as PartyManageResponse[]}
            descriptionMap={PartyStatusDescription}
            canSelect={CHANGEABLE_PARTY_STATUS.includes(filterType)}
            getNextStatus={getNextPartyStatus}
            checkedAction="control"
            children={(item: PartyManageResponse) => <ManageCard {...item} />}
            {...props}
          />
        </>
      )
      }
    </div>
  );
}