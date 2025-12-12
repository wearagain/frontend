import { useQuery } from "@tanstack/react-query";
import { getPartyApplicationDetail } from "@/apis/admin/party/applications/getPartyApplicationDetail.ts";
import { generateApplicationResponse } from "@/utils/admin/party/generateApplicationResponse.ts";

export const useGetPartyApplicationDetail = (id: string) => {
  const query = useQuery({
    queryKey: ["admin", "party", "application", id],
    queryFn: () => getPartyApplicationDetail(id),
    enabled: !!id,
  });

  const converted = query.data ? generateApplicationResponse(query.data) : null;

  return {
    ...query,
    data: converted,
  };
};
