import { axiosInstance } from "@/apis/axios-instance";

export interface CancelExchangeRequest {
  clothesId: string;
  receiveLocationId: string;
  receiveDate: string;
}

export const cancelExchangeRequest = async (payload: CancelExchangeRequest): Promise<void> => {
  await axiosInstance.post("/api/exchange/request/cancel", payload);
};
