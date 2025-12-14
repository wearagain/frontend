import { axiosInstance } from "@/apis/axios-instance.ts";
import type { OrderResponse } from "@/types/admin/party.ts";

export const getOrders = async (): Promise<OrderResponse[]> => {
  const { data } = await axiosInstance.get<OrderResponse[]>(
    `/api/party/orders`,
  );
  return data;
};
