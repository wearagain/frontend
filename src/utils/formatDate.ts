import { getDateTime } from "@/utils/common/convertDataUtils.ts"

/** yyyy.MM.dd */
export const formatDate = (value?: string | Date | null): string => {
  return getDateTime(value, "yyyy.MM.dd");
};

/** yyyy년 M월 d일 */
export const formatDateKR = (value?: string | Date | null): string => {
  return getDateTime(value, "yyyy년 M월 d일");
};

/** yyyy년 M월 d일 HH시 */
export const formatDateTimeKR = (value?: string | Date | null): string => {
  return getDateTime(value, "yyyy년 M월 d일 HH시");
};

/** yyyy년 M월 d일(E) HH:mm */
export const formatDateTimeFullKR = (value?: string | Date | null): string => {
  return getDateTime(value, "yyyy년 M월 d일(E) HH:mm");
};
