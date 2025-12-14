import { ApplicationStatusDescription, DeliveryStatusDescription } from "@/constants/adminConstants.ts";
import {
  getDateFromTo,
  getDateTime,
  getTimeFromTo,
  getUnitValue,
  trueFalseToYesNo,
} from "@/utils/common/convertDataUtils.ts";
import type {
  ApplicationStatus, DeliveryStatus,
} from "@/types/admin/party.ts";


export const CONVERT_PARTY_DETAIL_KEYS = [
  "isGroup",
  "status",
  "deliveryStatus",
  "maxAttendeeCnt",
  "maxChangeCnt",
  "taxReceipt",
  "desiredDate",
  "dateFromTo",
  "timeFromTo",
] as const;

export type PartyDetailKey = typeof CONVERT_PARTY_DETAIL_KEYS[number];


type GeneratorFn<T extends Record<string, any>> = (data: T) => string;

export const generateDetailValues: Partial<
  Record<PartyDetailKey, GeneratorFn<Record<string, any>>>
> = {
  isGroup: (data) => (data.isGroup ? "단체" : "개인"),

  status: (data: { status?: ApplicationStatus | null }) =>
    data.status ? ApplicationStatusDescription[data.status] : "-",

  deliveryStatus: (data: { deliveryStatus?: DeliveryStatus | null }) =>
    data.deliveryStatus
      ? DeliveryStatusDescription[data.deliveryStatus]
      : "-",

  dateFromTo: (data) =>
    getDateFromTo(data.openAt, data.closeAt),

  timeFromTo: (data) =>
    getTimeFromTo(data.openAt, data.closeAt),

  maxAttendeeCnt: (data) =>
    getUnitValue(data.maxAttendeeCnt, "명"),

  maxChangeCnt: (data) =>
    getUnitValue(data.maxChangeCnt, "벌"),

  taxReceipt: (data) =>
    trueFalseToYesNo(data.taxReceipt),

  desiredDate: (data) =>
    getDateTime(data.desiredDate, "yyyy년 MM월 dd일"),
};
