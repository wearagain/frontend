import { format } from "date-fns";
import { ko } from "date-fns/locale/ko";

/**
 * 1. null 처리
 * */
export const getNullToString = (value: any, fallback = "-") => {
  if (value === null || value === undefined || value === "") return fallback;
  return value;
};

/**
 * 2. boolean 처리
 * */
export const trueFalseToYesNo = (value?: boolean) => {
  if (value === true) return "예";
  if (value === false) return "아니오";
  return "-";
};

/**
 * 3. getDate or Time
 * */
export const getDateTime = (value?: string | null | Date, fallback = "yyyy.MM.dd HH:mm") => {
  if (!value) return "-";

  return format(new Date(value), fallback, {
    locale: ko,
  });
};

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

export const getUnitValue = (value?: number, unit: string = "명") => {
  if (value === null || value === undefined) return "-";
  return `${value}${unit}`;
};