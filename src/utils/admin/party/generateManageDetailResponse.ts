import {
  convertUndefinedToNull,
  getUnitValue,
} from "@/utils/common/convertDataUtils.ts";
import type { PartyManageDetail } from "@/types/admin/party.ts";


export const generateManageDetailResponse = (data: PartyManageDetail | null | undefined) => {
  if (!data) return null;

  const rest = {
    ...data,

    isGroup: data.isGroup ? "단체" : "개인",
    maxAttendeeCnt: getUnitValue(data.maxAttendeeCnt, "명"),
    maxChangeCnt: getUnitValue(data.maxAttendeeCnt, "벌"),
    currentAttendeeCnt: getUnitValue(data.maxAttendeeCnt, "명"),

  };


  return Object.fromEntries(
    Object.entries(rest).map(([key, value]) => [key, convertUndefinedToNull(value)]),
  );
};
