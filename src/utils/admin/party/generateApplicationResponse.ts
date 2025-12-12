import {
  ApplicationStatusDescription,
  DeliveryStatusDescription,
} from "@/constants/adminConstants.ts";
import {
  getDateFromTo,
  getDateTime,
  convertUndefinedToNull,
  getTimeFromTo, getUnitValue,
  trueFalseToYesNo,
} from "@/utils/common/convertDataUtils.ts";
import type { PartyApplicationResponse } from "@/types/admin/party.ts";


export const generateApplicationResponse = (data: PartyApplicationResponse | null | undefined) => {
  if (!data) return null;

  const transformed = {
    ...data,

    isGroup: data.isGroup ? "단체" : "개인",

    status: data?.status && ApplicationStatusDescription?.[data.status],
    deliveryStatus: data.deliveryStatus && DeliveryStatusDescription[data.deliveryStatus],

    dateFromTo: getDateFromTo(data.openAt, data.closeAt),
    timeFromTo: getTimeFromTo(data?.openAt, data.closeAt),

    maxAttendeeCnt: getUnitValue(data.maxAttendeeCnt, "명"),
    maxChangeCnt: getUnitValue(data.maxAttendeeCnt, "벌"),
    taxReceipt: trueFalseToYesNo(data.taxReceipt),
    desiredDate: getDateTime(data.desiredDate, "yyyy년 MM월 dd일"),
  };

  const { openAt, closeAt, ...rest } = transformed;

  return Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [key, convertUndefinedToNull(value)]),
  );
};
