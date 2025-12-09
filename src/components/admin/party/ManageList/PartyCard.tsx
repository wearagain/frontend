import { Users } from "@/assets/icons";
import defaultThumbnail from "@/assets/images/default.png";
import { useNavigate } from "react-router";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyManageResponse } from "@/types/admin/party.ts";


export const PartyCard = (item: PartyManageResponse) => {
  const {
    id,
    title,
    openAt,
    closeAt,
    address,
    status,
    currentAttendeeCnt,
    maxAttendeeCnt,
    imageUrl,
  } = item;

  const navigate = useNavigate();

  const availableSlots = `${currentAttendeeCnt}/${maxAttendeeCnt}`;

  return (
    <div
      className='flex flex-1 min-w-0 max-w-full items-center gap-4 bg-white pl-[6px] mr-5 py-[10px] hover:bg-gray-200 cursor-pointer'
      onClick={() => navigate(`/party/${id}`)}
    >
      {/* 썸네일 */}
      <div className='h-22 w-22 shrink-0 rounded-lg bg-gray-100'>
        <img
          src={imageUrl || defaultThumbnail}
          alt={title}
          className='h-full w-full object-cover'
          onError={(e) => {
            e.currentTarget.src = defaultThumbnail;
          }}
        />
      </div>

      {/* 카드 본문 */}
      <div className='flex flex-col min-w-0'>
        <h4 className='text-base font-bold truncate'>{title}</h4>
        <p className='truncate '>{address}</p>

        <div className='flex items-center gap-1 text-sm text-[#939396] truncate'>
          <p className='truncate'>{getDateTime(openAt, "yyyy.MM.dd")}</p>
          <p>~</p>
          <p className='truncate'>{getDateTime(closeAt,"yyyy.MM.dd")}</p>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-2 text-sm text-[#939396]'>
            <Users size={14} fill='#939396' stroke='#939396'/>
            <span>{availableSlots}</span>
            <span className='text-[#D9D9D9]'>•</span>
            <span className='font-medium text-[var(--color-purple-light)] truncate'>
              {PartyStatusDescription[status]}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
