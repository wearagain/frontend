import type { PartyHostRequest } from "@/types/party";
import type { PartyHostState } from "@/store/useHostStore";

/** ISO 형식 포맷팅 */
export const toLocalDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
}

/** 전화번호 포맷팅 */
export const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, "");

  if (/^010-\d{4}-\d{4}$/.test(phone)) return phone;
  if (digits.length === 11 && digits.startsWith("010")) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

/** 날짜+시간 조합 */
export const combineDateAndTime = (dateStr: string, timeStr: string): string => {
  const date = new Date(dateStr);
  if (timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  }
  return toLocalDateTime(date);
};

export const generatePartyHostRequest = (store: PartyHostState): PartyHostRequest => {
  return {
    isGroup: store.isGroup,
    groupName: store.groupName,
    name: store.name,
    phone: formatPhone(store.phone),
    email: store.email,

    openAt: combineDateAndTime(store.openAt, store.openTime || ""),
    closeAt: combineDateAndTime(store.closeAt, store.closeTime || ""),

    address: store.address,
    addressDetail: store.addressDetail,
    xmap: store.xmap,
    ymap: store.ymap,

    maxChangeCnt: store.maxChangeCnt,
    maxAttendeeCnt: store.maxAttendeeCnt,

    partyTitle: store.partyTitle,
    partyDescription: store.partyDescription,

    deliverAddress: store.deliverAddress,
    deliverAddressDetail: store.deliverAddressDetail,
    desiredDate: toLocalDateTime(new Date(store.desiredDate)),

    taxReceipt: store.taxReceipt,
    taxEmail: store.taxReceipt ? store.taxEmail : null,
    taxId: store.taxReceipt ? store.taxId : null,
  };
};