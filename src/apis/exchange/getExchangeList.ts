import { axiosInstance } from "@/apis/axios-instance";
import type { RepairClothsResponse, ClothFilterCategory } from "@/types/community";

export interface ExchangeListQuery {
  isPublic: boolean;
  category?: Exclude<ClothFilterCategory, "ALL">;
}

export const getExchangeList = async (
  params: ExchangeListQuery
): Promise<RepairClothsResponse[]> => {
  const { data } = await axiosInstance.get<RepairClothsResponse[]>("/api/exchange", {
    params,
  });
  return data;
};
