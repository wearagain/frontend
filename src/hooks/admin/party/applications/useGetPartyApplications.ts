import { useQuery } from "@tanstack/react-query";
import { getPartyApplications } from "@/apis/admin/party/applications/getPartyApplications.ts";

export const useGetPartyApplications = () => {
  return useQuery({
    queryKey: ["admin", "party", "application"],
    queryFn: () => getPartyApplications(),
  });
};
