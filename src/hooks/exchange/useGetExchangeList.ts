import { useQuery } from "@tanstack/react-query";
import { getExchangeList, type ExchangeListQuery } from "@/apis/exchange/getExchangeList";

export const useGetExchangeList = (params: ExchangeListQuery) => {
  return useQuery({
    queryKey: ["exchangeList", params],
    queryFn: () => getExchangeList(params),
  });
};
