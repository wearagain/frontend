import { axiosInstance } from "@/apis/axios-instance.ts";

export const postParticipantStatus = async (
  participantId: string,
  action: string,
  params?: Record<string, string>
) => {
  const { data } = await axiosInstance.post(
    `/api/parties/participants/${participantId}/${action}`,
    params
  );
  return data;
};
