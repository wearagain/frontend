import { axiosInstance } from "@/apis/axios-instance";
import type { ExchangeThumbnailResponse } from "@/types/community";

export const getExchangeThumbnails = async (): Promise<ExchangeThumbnailResponse> => {
  const { data } = await axiosInstance.get<ExchangeThumbnailResponse>("/api/exchange/thumbnails");
  return data;
};
