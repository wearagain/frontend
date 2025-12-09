import {
  ApplicationStatusDescription,
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import { getDateTime, getNullToString, trueFalseToYesNo } from "@/utils/common/convertDataUtils.ts";
import type { PartyApplicationResponse } from "@/types/admin/party.ts";

export const getDateFromTo = (from?: string | null, to?: string | null) => {
  if (!from && to) return `~ ${getDateTime(to, "yyyy.MM.dd")}`;
  if (from && !to) return `${getDateTime(from, "yyyy.MM.dd")} ~`;
  if (!from && !to) return "-";
  return `${getDateTime(from, "yyyy.MM.dd")} ~ ${getDateTime(to, "yyyy.MM.dd")}`;
};

export const getTimeFromTo = (from?: string | null, to?: string | null) => {
  if (!from && to) return `~ ${getDateTime(to, "a h시")}`;
  if (from && !to) return `${getDateTime(to, "a h시")} ~`;
  if (!from && !to) return "-";
  return `${getDateTime(to, "a h시")} ~ ${getDateTime(to, "a h시")}`;
};

export const getAttendee = (value?: number) => {
  if (value === null || value === undefined) return "-";
  return `${value}명`;
};

export const generateApplicationResponse = (data: PartyApplicationResponse | null | undefined) => {
  if (!data) return null;

  const transformed = {
    ...data,

    isGroup: data.isGroup ? "단체" : "개인",

    status: data.status ? ApplicationStatusDescription[data.status] : "-",
    deliveryStatus: data.deliveryStatus ? DeliveryStatusDescription[data.deliveryStatus] : "-",

    dateFromTo: getDateFromTo(data.openAt, data.closeAt),
    timeFromTo: getTimeFromTo(data?.openAt, data.closeAt),

    maxAttendeeCnt: getAttendee(data.maxAttendeeCnt),
    taxReceipt: trueFalseToYesNo(data.taxReceipt),
    desiredDate: getDateTime(data.desiredDate, "yyyy년 MM월 dd일"),
  };

  const { openAt, closeAt, ...rest } = transformed;

  return Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [key, getNullToString(value)])
  );
};
