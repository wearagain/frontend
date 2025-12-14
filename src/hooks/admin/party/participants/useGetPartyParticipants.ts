import { useQuery } from "@tanstack/react-query";
import { getParticipants } from "@/apis/admin/party/participants/getParticipants.ts";

export const useGetPartyParticipants  = (id: string) => {
    return  useQuery({
      queryKey: ["admin", "party", "participants", id],
      queryFn: () => getParticipants(id),
      enabled: !!id,
    });
  };
