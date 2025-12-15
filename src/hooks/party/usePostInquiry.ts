import { useMutation } from "@tanstack/react-query";
import { postInquiry } from "@/apis/party/postInquiry";
import type { CreateInquiryRequest } from "@/types/help";
import { handleApiError } from "@/utils/handleApiError";

export const usePostInquiry = (applicationId: string) => {
  return useMutation({
    mutationKey: ["postInquiry", applicationId],
    mutationFn: (payload: CreateInquiryRequest) => postInquiry(applicationId, payload),
    onError: (error: unknown) => {
      alert(handleApiError(error));
    },
  });
};
