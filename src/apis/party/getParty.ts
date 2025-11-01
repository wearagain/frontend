import { axiosInstance } from "@/apis/axios-instance";
import type { PartyListResponse, PartyListQuery } from "@/types/party";

export const getPartyList = async (filters: PartyListQuery): Promise<PartyListResponse> => {
  const { data } = await axiosInstance.get<PartyListResponse>("/api/parties", {
    params: filters,
  });

  return data;
};
