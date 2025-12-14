import { axiosInstance } from "@/apis/axios-instance.ts";
import type { OrderDetailResponse } from "@/types/admin/party.ts";

export const getOrderDetail = async (id: string): Promise<OrderDetailResponse> => {
  const { data } = await axiosInstance.get<OrderDetailResponse>(
    `/api/party/orders/${id}`,
  );
  return data;
};
