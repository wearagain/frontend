import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import { patchPartyStatus } from "@/apis/admin/party/manage/patchPartyStatus.ts";
import { PartyStatusDescription } from "@/constants/adminConstants.ts";
import type { PartyStatus } from "@/types/party.ts";
import { queryClient } from "@/lib/queryClient.ts";

interface MutationProps {
  id: string;
  status: PartyStatus;
  count: number;
}

export const usePatchPartyStatus = () => {
  return useMutation({
    mutationKey: ["partyStatus"],
    mutationFn: async ({ id, status }: MutationProps) => {
      return await patchPartyStatus(id, status);
    },
    onSuccess: (_data, { count, status }) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party", "manage"],
      });
      alert(`${count}개 파티를 ${PartyStatusDescription[status]} 처리 완료했습니다.`);
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "승인 도중 오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
