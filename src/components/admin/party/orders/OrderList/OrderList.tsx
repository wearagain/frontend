import PartyCardHeader from "@/components/admin/party/common/SectionList/PartyCardHeader.tsx";
import {
  CHANGEABLE_ORDER_STATUS,
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import type {
  DeliveryStatus,
  OrderAction, OrderResponse
} from "@/types/admin/party.ts";
import { getNextDeliveryStatus } from "@/utils/admin/party/getNextStatus.ts";
import { OrderCard } from "@/components/admin/party/orders/OrderList/OrderCard.tsx";
import { OrderSection } from "@/components/admin/party/orders/OrderList/OrderSection.tsx";

interface OrderListProps {
  total: number;

  groupedData: Record<DeliveryStatus, OrderResponse[]>,

  modalInstance?: {
    setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
    setAction: React.Dispatch<React.SetStateAction<OrderAction | null>>;
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

  const sectionProps = {
    descriptionMap: DeliveryStatusDescription,
    getNextStatus: getNextDeliveryStatus,
    checkedAction: "confirm" as OrderAction,
    children: (item: OrderResponse) => <OrderCard {...item} />,
  };

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
                <OrderSection
                  header={title as DeliveryStatus}
                  items={items as OrderResponse[]}
                  canSelect={!title || CHANGEABLE_ORDER_STATUS.includes(title)}
                  {...sectionProps}
                  {...props}
                />
              </span>
          ))}
        </>
      ) : (
        <>
          <OrderSection
            header={filterType}
            items={groupedData[filterType] as OrderResponse[]}
            canSelect={CHANGEABLE_ORDER_STATUS.includes(filterType)}
            {...sectionProps}
            {...props}
          />
        </>
      )
      }
    </div>
  );
}