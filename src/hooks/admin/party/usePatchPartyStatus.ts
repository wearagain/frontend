import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import { patchPartyStatus } from "@/apis/admin/party/patchPartyStatus.ts";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyStatus } from "@/types/party.ts";

interface MutationProps {
  id: string;
  params?: Record<string, string>;

  count: number;
  nextStatus: PartyStatus;
}

export const usePatchPartyStatus = () => {
  return useMutation({
    mutationKey: ["partyStatus"],
    mutationFn: async ({ id, params }: MutationProps) => {
      return await patchPartyStatus(id, params);
    },
    onSuccess: (_data, { count, nextStatus }) => {
      alert(`${count}개 파티를 ${PartyStatusDescription[nextStatus]} 처리 완료했습니다.`);
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "승인 도중 오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
