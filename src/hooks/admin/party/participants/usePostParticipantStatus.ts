import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import type { ApplicationAction } from "@/types/admin/party.ts";
import { queryClient } from "@/lib/queryClient.ts";
import { postParticipantStatus } from "@/apis/admin/party/participants/postParticipantStatus.ts";

interface MutationProps {
  id: string;
  action: ApplicationAction;
  params?: Record<string, string>;
}

export const usePostParticipantStatus = () => {
  return useMutation({
    mutationKey: ["participantStatus"],
    mutationFn: async ({ id, action, params }: MutationProps) => {
      const res = await postParticipantStatus(id, action, params);
      return res;
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party", "application"],
      });
      alert(`${params?.action == "approve" ? "승인" : "반려"} 처리 완료됐습니다.`);
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
