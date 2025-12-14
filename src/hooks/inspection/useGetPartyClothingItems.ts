import { useQuery } from "@tanstack/react-query";
import {
  getPartyClothingItems,
  type PartyClothingItem,
} from "@/apis/inspection/getPartyClothingItems";

export const useGetPartyClothingItems = (partyId: string, params?: { searchKeyword?: string }) => {
  // 검색어가 2자 이상일 때만 API 호출 (처음에는 아무것도 표시하지 않음)
  const shouldFetch = !!partyId && !!params?.searchKeyword && params.searchKeyword.length >= 2;

  return useQuery<PartyClothingItem[]>({
    queryKey: ["partyClothingItems", partyId, params],
    queryFn: () => getPartyClothingItems(partyId, params),
    enabled: shouldFetch,
  });
};
