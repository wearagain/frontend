import { useMutation } from "@tanstack/react-query";
import {
  cancelExchangeRequest,
  type CancelExchangeRequest,
} from "@/apis/exchange/cancelExchangeRequest";

export const useCancelExchangeRequest = () => {
  return useMutation({
    mutationKey: ["cancelExchangeRequest"],
    mutationFn: (payload: CancelExchangeRequest) => cancelExchangeRequest(payload),
  });
};
