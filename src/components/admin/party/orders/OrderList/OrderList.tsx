import PartyCardHeader from "@/components/admin/party/common/List/PartyCardHeader.tsx";
import {
  CHANGEABLE_ORDER_STATUS,
  CHANGEABLE_PARTY_STATUS,
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import { PartySection } from "@/components/admin/party/common/List/PartySection.tsx";
import type {
  DeliveryStatus,
  ManageAction,
  ManageBarStatus, PartyApplicationResponse,
  SelectedItemStatus,
} from "@/types/admin/party.ts";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";
import { OrderCard } from "@/components/admin/party/orders/OrderList/OrderCard.tsx";

interface OrderListProps {
  total: number;

  groupedData: Record<DeliveryStatus, PartyApplicationResponse[]>,
  activeSection: DeliveryStatus | null,
  setActiveSection: React.Dispatch<React.SetStateAction<DeliveryStatus | null>>,

  selected: SelectedItemStatus<DeliveryStatus>,
  setSelected: React.Dispatch<React.SetStateAction<SelectedItemStatus<DeliveryStatus>>>,

  setBottombarStatus: React.Dispatch<React.SetStateAction<ManageBarStatus>>,
  modalInstance?: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setModalAction: React.Dispatch<React.SetStateAction<ManageAction>>;
  }
  filterType: DeliveryStatus | "ALL";
}

export default function OrderList(
  {
    total,
    groupedData,
    filterType,
    ...props
  }: OrderListProps,
) {


  return (
    <div className="flex-1 overflow-y-auto custom-scroll bottombar-p">
      {filterType == "ALL" ? (
        <>
          <PartyCardHeader<DeliveryStatus>
            descriptionMap={DeliveryStatusDescription}
            title={filterType}
            total={total}
            className="py-5"
          />
          {Object.entries(groupedData)?.map(([title, items]) => (
            items.length != 0 &&
            <span key={title}>
                <div className="divider-compact" />
                <PartySection<DeliveryStatus, ManageBarStatus, PartyApplicationResponse>
                  header={title as DeliveryStatus}
                  items={items as PartyApplicationResponse[]}
                  descriptionMap={DeliveryStatusDescription}
                  canSelect={!title || CHANGEABLE_ORDER_STATUS.includes(title)}
                  getNextStatus={getNextDeliveryStatus}
                  checkedAction="control"
                  isOrder
                  children={(item: PartyApplicationResponse) => <OrderCard {...item} />}
                  {...props}
                />
              </span>
          ))}
        </>
      ) : (
        <>
          <PartySection<DeliveryStatus, ManageBarStatus, PartyApplicationResponse>
            header={filterType}
            items={groupedData[filterType] as PartyApplicationResponse[]}
            descriptionMap={DeliveryStatusDescription}
            canSelect={CHANGEABLE_PARTY_STATUS.includes(filterType)}
            getNextStatus={getNextDeliveryStatus}
            checkedAction="control"
            children={(item: PartyApplicationResponse) => <OrderCard {...item} />}
            {...props}
          />
        </>
      )
      }
    </div>
  );
}