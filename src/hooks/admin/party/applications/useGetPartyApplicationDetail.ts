import { useQuery } from "@tanstack/react-query";
import { getPartyApplicationDetail } from "@/apis/admin/party/applications/getPartyApplicationDetail.ts";
// import { generateApplicationResponse } from "@/utils/admin/party/generateApplicationResponse.ts";

export const useGetPartyApplicationDetail = (id: string) => {
  return useQuery({
    queryKey: ["admin", "party", "application", id],
    queryFn: () => getPartyApplicationDetail(id),
    enabled: !!id,
  });


};
