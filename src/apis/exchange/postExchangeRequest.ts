import { axiosInstance } from "@/apis/axios-instance";

export interface ExchangeRequest {
  clothesId: string;
  receiveLocationId: string;
  receiveDate: string;
}

export const postExchangeRequest = async (payload: ExchangeRequest): Promise<void> => {
  await axiosInstance.post("/api/exchange/request", payload);
};
