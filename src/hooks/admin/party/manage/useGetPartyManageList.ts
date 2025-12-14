import { useQuery } from "@tanstack/react-query";
import { getPartyManageList } from "@/apis/admin/party/manage/getPartyManageList.ts";
import type { PartyStatus } from "@/types/party.ts";

export const useGetPartyManageList = () => {
  const query =  useQuery({
    queryKey: ["admin", "party", "manage"],
    queryFn: getPartyManageList,
  });

  const groupedData = query.data?.reduce<Record<PartyStatus, typeof query.data>>(
    (acc, party) => {
      const status = party.status as PartyStatus;
      if (!acc[status]) acc[status] = [];
      acc[status].push(party);
      return acc;
    },
    {
      UPCOMING: [],
      ONGOING: [],
      COMPLETED: [],
      CANCELLED: [],
    }
  ) ?? {
    UPCOMING: [],
    ONGOING: [],
    COMPLETED: [],
    CANCELLED: [],
  };

  return { ...query, groupedData };
};
