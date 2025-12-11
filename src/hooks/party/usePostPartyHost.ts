import { useMutation } from "@tanstack/react-query";
import { postPartyHost } from "@/apis/party/partyHost";
import { usePartyHostStore } from "@/store/useHostStore";
import { generatePartyHostRequest } from "@/utils/party/host/generatePartyHostRequest.ts";
import { AxiosError } from "axios";

export const usePostParty = () => {
  const store = usePartyHostStore();

  return useMutation({
    mutationKey: ["postPartyHost"],
    mutationFn: async () => {
      const payload = generatePartyHostRequest(store);

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
