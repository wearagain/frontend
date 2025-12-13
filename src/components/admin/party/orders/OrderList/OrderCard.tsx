import { Users } from "@/assets/icons";
import defaultThumbnail from "@/assets/images/default.png";
import { useNavigate } from "react-router";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import { DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import type { OrderResponse } from "@/types/admin/party.ts";


export const OrderCard = (item: OrderResponse) => {
  const {
    id,
    partyTitle,
    desiredDate,
    maxAttendeeCnt,
    // imageUrl = "",
    deliveryStatus,
  } = item;

  const navigate = useNavigate();

  return (
    <div
      className="flex flex-1 min-w-0 max-w-full items-center gap-4 bg-white pl-[6px] mr-5 py-[10px] hover:bg-gray-200 cursor-pointer"
      onClick={() => navigate(`${id}`)}
    >
      {/* 썸네일 */}
      <div className="h-22 w-22 shrink-0 rounded-lg bg-gray-100">
        <img
          // src={imageUrl || defaultThumbnail}
          src={defaultThumbnail}
          alt={partyTitle}
          className="h-full w-full object-cover"
          onError={(e) => {
            e.currentTarget.src = defaultThumbnail;
          }}
        />
      </div>

      {/* 카드 본문 */}
      <div className="flex flex-col min-w-0">
        <h4 className="text-base font-bold truncate">{partyTitle}</h4>

        <div className="flex items-center gap-1 text-sm text-[#939396] truncate">
          <p className="truncate">{getDateTime(desiredDate, "yyyy.MM.dd")}</p>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-sm text-[#939396]">
            <Users size={14} fill="#939396" stroke="#939396" />
            <span>{maxAttendeeCnt}</span>
            {deliveryStatus &&
              <>
                <span className="text-[#D9D9D9]">•</span>
                <span className="font-medium text-[var(--color-purple-light)] truncate">
              {DeliveryStatusDescription[deliveryStatus]}
              </span>
              </>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
