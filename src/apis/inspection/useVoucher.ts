import { axiosInstance } from "@/apis/axios-instance";

export interface UseVoucherParams {
  voucherQrCode: string;
  partyId: string;
  takenClothingNumber?: string;
}

export const useVoucher = async (params: UseVoucherParams): Promise<void> => {
  await axiosInstance.post("/api/inspection/vouchers/use", null, {
    params,
  });
};
