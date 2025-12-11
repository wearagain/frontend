import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeExchange } from "@/apis/exchange/likeExchange";

export const useLikeExchange = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["likeExchange"],
    mutationFn: (exchangeClothesId: string) => likeExchange(exchangeClothesId),
    onSuccess: (_data, exchangeClothesId) => {
      // 상세 정보 쿼리 무효화하여 다시 가져오기
      queryClient.invalidateQueries({ queryKey: ["exchangeDetail", exchangeClothesId] });
      // 썸네일 목록도 무효화 (찜하기 상태가 변경되므로)
      queryClient.invalidateQueries({ queryKey: ["exchangeThumbnails"] });
      queryClient.invalidateQueries({ queryKey: ["exchangeList"] });
    },
  });
};
