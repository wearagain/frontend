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
