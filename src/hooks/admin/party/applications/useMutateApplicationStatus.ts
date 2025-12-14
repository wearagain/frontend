import { AxiosError } from "axios";

import { useMutation } from "@tanstack/react-query";
import { postApplicationStatus } from "@/apis/admin/party/applications/postApplicationStatus.ts";
import type { ApplicationAction } from "@/types/admin/party.ts";
import { queryClient } from "@/lib/queryClient.ts";

interface MutationProps {
  id: string;
  action: ApplicationAction;
  params?: Record<string, string>;
}

export const useMutateApplicationStatus = () => {
  return useMutation({
    mutationKey: ["signup"],
    mutationFn: async ({ id, action, params }: MutationProps) => {
      const res = await postApplicationStatus(id, action, params);
      return res;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party", "application"],
      });
      alert("승인이 완료됐습니다.");
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "승인 도중 오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
