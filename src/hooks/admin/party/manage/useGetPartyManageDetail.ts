import { useQuery } from "@tanstack/react-query";
import { getPartyManageDetail } from "@/apis/admin/party/manage/getPartyManageDetail.ts";
import { generateManageDetailResponse } from "@/utils/admin/party/generateManageDetailResponse.ts";

export const useGetPartyManageDetail  = (id: string) => {
    const query = useQuery({
      queryKey: ["admin", "party", "manage", id],
      queryFn: () => getPartyManageDetail(id),
      enabled: !!id,
    });

    const converted = query.data ? generateManageDetailResponse(query.data) : null;

    return {
      ...query,
      data: converted,
    };
  };
