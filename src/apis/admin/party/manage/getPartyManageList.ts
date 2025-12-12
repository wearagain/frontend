import { axiosInstance } from "@/apis/axios-instance.ts";
import type {  PartyManageResponse } from "@/types/admin/party.ts";

export const getPartyManageList = async (): Promise<PartyManageResponse[]> => {
  const { data } = await axiosInstance.get<PartyManageResponse[]>(
    `/api/parties/admin/all`,
  );
  return data;
};
