import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient.ts";
import type {  TaxUpdateRequest } from "@/types/admin/party.ts";
import { patchTax } from "@/apis/admin/party/manage/patchTax.ts";


export const usePatchTax = () => {
  return useMutation({
    mutationKey: ["tax"],
    mutationFn: async ({ taxId, name }: TaxUpdateRequest) => {
      return await patchTax({ taxId, name });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["admin", "party"],
      });
      alert(`세금계산서 발행 처리 완료했습니다.`);
    },
    onError: (error: AxiosError<any>) => {
      alert(error.response?.data?.error ?? "승인 도중 오류가 발생했습니다.다시 시도해주세요.");
      console.error(error);
    },
  });
};
