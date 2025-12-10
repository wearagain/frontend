import { axiosInstance } from "../axios-instance";
import type {
  PartyParticipantRequest,
  PartyParticipantResponse,
  HostApplicationResponse,
  MyTakenClothingResponse,
} from "@/types/apply";

// 신청 관련
export const postPartyParticipant = async (partyId: string, payload: PartyParticipantRequest) => {
  const { data } = await axiosInstance.post(`/api/parties/${partyId}/participants`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

  // 교환 의류 내역
export const getMyTakenClothes = async (): Promise<MyTakenClothingResponse[]> => {
  const { data } = await axiosInstance.get("/api/inspection/my-taken-clothes");
  return data;
};

// 신청 내역 관련
export const getMyParticipations = async (): Promise<PartyParticipantResponse[]> => {
  const { data } = await axiosInstance.get("/api/parties/participants/my");
  return data;
};

export const getMyHostApplications = async (): Promise<HostApplicationResponse[]> => {
  const { data } = await axiosInstance.get("/api/party/applications/my");
  return data;
};

export const getParticipationDetail = async (
  participantId: string
): Promise<PartyParticipantResponse> => {
  const { data } = await axiosInstance.get(`/api/parties/participants/${participantId}`);
  return data;
};

export const getHostApplicationDetail = async (
  applicationId: string
): Promise<HostApplicationResponse> => {
  const { data } = await axiosInstance.get(`/api/party/applications/${applicationId}`);
  return data;
};

// 신청 취소 관련
export const deleteParticipation = async (
  participantId: string
): Promise<PartyParticipantResponse> => {
  const { data } = await axiosInstance.delete(`/api/parties/participants/${participantId}`);
  return data;
};
