import { axiosInstance } from "@/apis/axios-instance";

export const likeExchange = async (exchangeClothesId: string): Promise<void> => {
  await axiosInstance.post("/api/exchange/like", null, {
    params: { exchangeClothesId },
  });
};
