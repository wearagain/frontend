import { useMutation } from "@tanstack/react-query";
import { postExchangeRequest, type ExchangeRequest } from "@/apis/exchange/postExchangeRequest";

export const usePostExchangeRequest = () => {
  return useMutation({
    mutationKey: ["postExchangeRequest"],
    mutationFn: (payload: ExchangeRequest) => postExchangeRequest(payload),
  });
};
