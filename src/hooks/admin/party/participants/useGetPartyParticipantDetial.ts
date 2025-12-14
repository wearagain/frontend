import { useQuery } from "@tanstack/react-query";
import { getParticipationDetail } from "@/apis/party/apply.ts";

export const useGetPartyParticipantDetail  = (participantId: string) => {
    return  useQuery({
      queryKey: ["admin", "party", "participants", participantId],
      queryFn: () => getParticipationDetail(participantId),
      enabled: !!participantId,
    });
  };
