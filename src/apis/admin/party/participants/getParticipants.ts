import { axiosInstance } from "@/apis/axios-instance.ts";
import type { PartyParticipantsResponse } from "@/types/admin/party.ts";

export const getParticipants = async (id: string): Promise<PartyParticipantsResponse[]> => {
  const { data } = await axiosInstance.get<PartyParticipantsResponse[]>(
    `/api/parties/${id}/participants/manage`,
  );
  return data;
};
