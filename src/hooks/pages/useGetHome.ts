import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore.ts";
import { useEffect } from "react";
import { getHome } from "@/apis/pages/getHome.ts";
import type { HomeResponse } from "@/types/pages.ts";
import { useAdminStore } from "@/store/useAdminStore.ts";

export const useGetHome = () => {
  const { isAdmin, setUserInfo } = useUserStore();
  const { setAdminInfo } = useAdminStore();

  const query = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (!query.data) return;

    setUserInfo({
      isLoggedIn: query.data.isLoggedIn,
      userImageUrl: query.data.userImageUrl,
      reduceCarbonAmount: query.data.reduceCarbonAmount
        ? Number(query.data.reduceCarbonAmount.toFixed(1))
        : query.data.reduceCarbonAmount,
      voucherCount: query.data.voucherCount,
    });

    setAdminInfo({
      partyApplicationCount: query.data.partyApplicationCount,
      inquiryCount: query.data.inquiryCount,
    });

  }, [query.data, isAdmin]);

  return query;
};
