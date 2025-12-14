import { axiosInstance } from "@/apis/axios-instance.ts";
import type { PartyManageDetail } from "@/types/admin/party.ts";

export const getPartyManageDetail = async (id: string): Promise<PartyManageDetail> => {
  const { data } = await axiosInstance.get<PartyManageDetail>(
    `/api/parties/${id}`,
  );
  return data;
};
