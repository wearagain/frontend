import { Users } from "@/assets/icons";
import type { PartyDTO } from "@/types/party";
import defaultThumbnail from "@/assets/images/default.png";
import { formatDate } from "@/utils/formatDate";
import { useNavigate } from "react-router";

interface PartyCardProps {
  party: PartyDTO;
}

export const PartyCard = ({ party }: PartyCardProps) => {
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
  } = party;

  const navigate = useNavigate();

  const availableSlots = `${currentAttendeeCnt}/${maxAttendeeCnt}`;

  const getStatusLabel = (s: string): string => {
    switch (s) {
      case "UPCOMING":
        return "예정";
      case "ONGOING":
        return "진행중";
      case "COMPLETED":
        return "종료";
      case "CANCELLED":
        return "취소";
      default:
        return "";
    }
  };

  return (
    <div
      className='flex items-center gap-4 bg-white px-4 py-2 hover:bg-gray-200 cursor-pointer'
      onClick={() => navigate(`/party/${id}`)}
    >
      {/* 썸네일 */}
      <div className='h-22 w-22 overflow-hidden rounded-lg bg-gray-100'>
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
      <div className='flex flex-col flex-1 min-w-0'>
        <h3 className='text-base font-semibold truncate'>{title}</h3>

        <div className='text-sm text-gray-900 truncate'>{address}</div>

        <div className='flex items-center gap-1 text-sm text-gray-500 truncate'>
          <span className='truncate'>{formatDate(openAt)}</span>
          <span>~</span>
          <span className='truncate'>{formatDate(closeAt)}</span>
        </div>

        <div className='flex items-center justify-between mt-2'>
          <div className='flex items-center gap-2 text-sm text-gray-700'>
            <Users size={14} />
            <span>{availableSlots}</span>
            <span className='text-gray-300'>•</span>
            <span className='font-medium text-[var(--color-mint-light)]'>
              {getStatusLabel(status)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
