import { axiosInstance } from "../axios-instance";
import type { PartyParticipantRequest, PartyParticipantResponse } from "@/types/apply";

// 신청 관련
export const postPartyParticipant = async (partyId: string, payload: PartyParticipantRequest) => {
  const { data } = await axiosInstance.post(`/api/parties/${partyId}/participants`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

// 신청 내역 관련
export const getMyParticipations = async (): Promise<PartyParticipantResponse[]> => {
  const { data } = await axiosInstance.get("/api/parties/participants/my");
  return data;
};

export const getParticipationDetail = async (
  participantId: string
): Promise<PartyParticipantResponse> => {
  const { data } = await axiosInstance.get(`/api/parties/participants/${participantId}`);
  return data;
};

// 신청 취소 관련
export const deleteParticipation = async (
  participantId: string
): Promise<PartyParticipantResponse> => {
  const { data } = await axiosInstance.delete(`/api/parties/participants/${participantId}`);
  return data;
};
