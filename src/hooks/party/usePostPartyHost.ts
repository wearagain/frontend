import { useMutation } from "@tanstack/react-query";
import { postPartyHost } from "@/apis/party/partyHost";
import { usePartyHostStore } from "@/store/useHostStore";
import type { PartyHostRequest } from "@/types/party";
import { AxiosError } from "axios";

/**
 * Date를 LocalDateTime 형식으로 변환 (2025-01-01T10:00:00)
 */
const toLocalDateTime = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  const hours = String(date.getHours()).padStart(2, "0");
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const seconds = String(date.getSeconds()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

/**
 * 전화번호를 010-XXXX-XXXX 형식으로 변환
 */
const formatPhone = (phone: string): string => {
  // 숫자만 추출
  const digits = phone.replace(/\D/g, "");
  // 이미 올바른 형식이면 그대로 반환
  if (/^010-\d{4}-\d{4}$/.test(phone)) {
    return phone;
  }
  // 11자리 숫자면 포맷팅
  if (digits.length === 11 && digits.startsWith("010")) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 7)}-${digits.slice(7)}`;
  }
  return phone;
};

/**
 * openAt/closeAt에 시간(openTime/closeTime)을 합쳐서 LocalDateTime 문자열로 변환
 */
const combineDateAndTime = (dateStr: string, timeStr: string): string => {
  const date = new Date(dateStr);
  if (timeStr) {
    const [hours, minutes] = timeStr.split(":").map(Number);
    date.setHours(hours, minutes, 0, 0);
  }
  return toLocalDateTime(date);
};

/**
 * 파티 주최 요청 훅
 * Zustand 스토어 값 기반으로 postPartyHost 실행
 */
export const usePostParty = () => {
  const store = usePartyHostStore();

  return useMutation({
    mutationKey: ["postPartyHost"],
    mutationFn: async () => {
      const payload: PartyHostRequest = {
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

      return await postPartyHost(payload);
    },
    onError: (error: AxiosError<{ message?: string; errors?: string[] }>) => {
      console.error("파티 주최 신청 실패:", error);
      console.error("에러 응답:", error.response?.data);

      const errorMessage =
        error.response?.data?.message ||
        error.response?.data?.errors?.join(", ") ||
        "신청 중 오류가 발생했습니다. 다시 시도해주세요.";
      alert(errorMessage);
    },
  });
};
