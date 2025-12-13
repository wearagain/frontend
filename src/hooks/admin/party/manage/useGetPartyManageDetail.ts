import { useQuery } from "@tanstack/react-query";
import { getPartyManageDetail } from "@/apis/admin/party/manage/getPartyManageDetail.ts";

export const useGetPartyManageDetail  = (id: string) => {
    return  useQuery({
      queryKey: ["admin", "party", "manage", id],
      queryFn: () => getPartyManageDetail(id),
      enabled: !!id,
    });
  };
