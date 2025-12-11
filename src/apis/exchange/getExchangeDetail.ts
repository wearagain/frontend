import { axiosInstance } from "@/apis/axios-instance";
import type { RepairClothsDetailResponse } from "@/types/community";

export const getExchangeDetail = async (
  exchangeClothesId: string
): Promise<RepairClothsDetailResponse> => {
  const { data } = await axiosInstance.get<RepairClothsDetailResponse>("/api/exchange/detail", {
    params: { exchangeClothesId },
  });
  return data;
};
