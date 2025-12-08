import { useInfiniteQuery, useQuery, type InfiniteData } from "@tanstack/react-query";
import {
  getPartyDetails,
  getPartyList,
  getMyHostedParties,
  type MyHostedPartiesQuery,
} from "@/apis/party/getParty";
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

export const useGetParty = (partyId: string) => {
  return useQuery({
    queryKey: ["party", partyId],
    queryFn: () => getPartyDetails(partyId),
  });
};

// 내가 주최한 파티 목록 조회 (무한 스크롤)
export const useGetMyHostedParties = (params?: MyHostedPartiesQuery) => {
  return useInfiniteQuery<
    PartyListResponse,
    Error,
    InfiniteData<PartyListResponse>,
    (string | MyHostedPartiesQuery | undefined)[],
    string | undefined
  >({
    queryKey: ["myHostedParties", params],
    queryFn: ({ pageParam }) =>
      getMyHostedParties({ ...params, cursor: pageParam as string | undefined }),
    initialPageParam: undefined,
    getNextPageParam: (lastPage) => (lastPage.hasNext ? lastPage.nextCursor : undefined),
  });
};
