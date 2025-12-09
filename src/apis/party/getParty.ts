import { axiosInstance } from "@/apis/axios-instance";
import type { PartyListResponse, PartyListQuery } from "@/types/party";

export const getPartyList = async (filters: PartyListQuery): Promise<PartyListResponse> => {
  const { data } = await axiosInstance.get<PartyListResponse>("/api/parties", {
    params: filters,
  });
  return data;
};

export const getPartyDetails = async (partyId: string) => {
  const { data } = await axiosInstance.get(`/api/parties/${partyId}`);
  return data;
};

// 내가 주최한 파티 목록 조회
export interface MyHostedPartiesQuery {
  size?: number;
  cursor?: string;
}

export const getMyHostedParties = async (
  params?: MyHostedPartiesQuery
): Promise<PartyListResponse> => {
  const { data } = await axiosInstance.get<PartyListResponse>("/api/parties/my-hosted", {
    params,
  });
  return data;
};
