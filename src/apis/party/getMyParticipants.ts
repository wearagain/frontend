import { axiosInstance } from "@/apis/axios-instance";
import type { MyParticipant, MyParticipantsQuery } from "@/types/participant";

export const getMyParticipants = async (
  params?: MyParticipantsQuery
): Promise<MyParticipant[]> => {
  const { data } = await axiosInstance.get<MyParticipant[]>(
    "/api/parties/participants/my",
    { params }
  );
  return data;
};

