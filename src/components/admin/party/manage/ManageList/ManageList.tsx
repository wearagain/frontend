import PartyCardHeader from "@/components/admin/party/common/SectionList/PartyCardHeader.tsx";
import type { PartyStatus } from "@/types/party.ts";
import { CHANGEABLE_PARTY_STATUS, PartyStatusDescription } from "@/constants/adminConstants.ts";
import { ManageSection } from "@/components/admin/party/manage/ManageList/ManageSection.tsx";
import type { ManageAction,  PartyManageResponse, SelectedItemStatus } from "@/types/admin/party.ts";
import { getNextPartyStatus } from "@/utils/admin/party/getNextStatus.ts";
import { ManageCard } from "@/components/admin/party/manage/ManageList/ManageCard.tsx";

interface ManageListProps {
  total: number;

  groupedData: Record<PartyStatus, PartyManageResponse[]>,
  activeSection: PartyStatus | null,
  setActiveSection: React.Dispatch<React.SetStateAction<PartyStatus | null>>,

  selected: SelectedItemStatus<PartyStatus>,
  setSelected: React.Dispatch<React.SetStateAction<SelectedItemStatus<PartyStatus>>>,

  modalInstance: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAction: React.Dispatch<React.SetStateAction<ManageAction | null>>;
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
                <ManageSection
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
          <ManageSection
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