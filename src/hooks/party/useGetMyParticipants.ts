import { useQuery } from "@tanstack/react-query";
import { getMyParticipants } from "@/apis/party/getMyParticipants";
import type { MyParticipantsQuery } from "@/types/participant";

export const useGetMyParticipants = (params?: MyParticipantsQuery) => {
  return useQuery({
    queryKey: ["myParticipants", params],
    queryFn: () => getMyParticipants(params),
  });
};

