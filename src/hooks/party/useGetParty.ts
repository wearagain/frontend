import { useInfiniteQuery, type InfiniteData } from "@tanstack/react-query";
import { getPartyList } from "@/apis/party/getParty";
import type { PartyListResponse, PartyListQuery } from "@/types/party";

export const useGetPartyList = (params: PartyListQuery) => {
  return useInfiniteQuery<
    PartyListResponse,
    Error,
    InfiniteData<PartyListResponse>,
    (string | PartyListQuery)[],
    string | undefined
  >({
    queryKey: ["partyList", params],
    queryFn: ({ pageParam }) =>
      getPartyList({ ...params, cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
};
