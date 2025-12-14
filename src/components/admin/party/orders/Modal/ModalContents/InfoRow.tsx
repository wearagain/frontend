import type { OrderItem } from "@/types/admin/party.ts";
import defaultThumbnail from "@/assets/images/default.png";
import { getDateTime } from "@/utils/common/convertDataUtils.ts";
import { Users } from "@/assets/icons";
import Textarea from "@/components/ui/textarea.tsx";
import { useFormContext } from "react-hook-form";

export default function InfoRow(item: OrderItem) {
  const {
    // id,
    partyTitle,
    desiredDate,
    maxAttendeeCnt,
    // imageUrl = "",
  } = item;

  const { control } = useFormContext();

  return (
    <div
      className="flex flex-col flex-1 min-w-0 max-w-full items-center gap-4 bg-white p-5"
    >
      <div className="flex w-full items-center gap-4">
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
        <div className="flex flex-1 flex-col min-w-0">
          <h4 className="text-base font-bold truncate">{partyTitle}</h4>

          <div className="flex items-center gap-1 text-sm text-[#939396] truncate">
            <p className="truncate">{getDateTime(desiredDate, "yyyy.MM.dd")}</p>
          </div>

          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2 text-sm text-[#939396]">
              <Users size={14} fill="#939396" stroke="#939396" />
              <span>{maxAttendeeCnt}</span>
            </div>
          </div>
        </div>
      </div>
      {/* 송장 번호 */}
      <div className='w-full flex flex-col gap-2'>
        <h4 className='font-semibold text-base text-[#939396]'>
          송장 번호
        </h4>
        <Textarea
          inputName={item.id}
          control={control}
          rules={{
            required: "송장 번호를 입력해주세요",
          }}
          placeholder="송장번호"
          className='h-[60px] w-full'
        />
      </div>
    </div>
  );

}