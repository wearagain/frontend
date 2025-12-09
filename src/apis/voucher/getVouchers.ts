import { axiosInstance } from "@/apis/axios-instance";
import type { Voucher } from "@/types/voucher";

// 사용 가능한 교환권 목록 조회
export const getAvailableVouchers = async (): Promise<Voucher[]> => {
  const { data } = await axiosInstance.get<Voucher[]>("/api/inspection/vouchers/available");
  return data;
};

