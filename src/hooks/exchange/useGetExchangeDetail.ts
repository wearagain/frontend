import { useQuery } from "@tanstack/react-query";
import { getExchangeDetail } from "@/apis/exchange/getExchangeDetail";

export const useGetExchangeDetail = (exchangeClothesId: string | undefined) => {
  return useQuery({
    queryKey: ["exchangeDetail", exchangeClothesId],
    queryFn: () => getExchangeDetail(exchangeClothesId ?? ""),
    enabled: !!exchangeClothesId,
  });
};
