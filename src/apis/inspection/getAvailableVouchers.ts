import { axiosInstance } from "@/apis/axios-instance";

export interface AvailableVoucher {
  id: string;
  name: string;
  address: string;
}

export const getAvailableVouchers = async (): Promise<AvailableVoucher[]> => {
  const { data } = await axiosInstance.get<AvailableVoucher[]>(
    "/api/inspection/vouchers/available"
  );
  return data;
};
