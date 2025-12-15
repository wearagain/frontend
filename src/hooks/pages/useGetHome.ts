import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore.ts";
import { useEffect } from "react";
import { getHome } from "@/apis/pages/getHome.ts";
import type { HomeResponse } from "@/types/pages.ts";
import { useAdminStore } from "@/store/useAdminStore.ts";

export const useGetHome = () => {
  const { setUserInfo } = useUserStore();
  const { setAdminInfo } = useAdminStore();

  const query = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    const data = query.data;
    if (!data) return;

    if ("voucherCount" in data || "reduceCarbonAmount" in data) {
      setUserInfo({
        isLoggedIn: data.isLoggedIn,
        userImageUrl: data.userImageUrl,
        reduceCarbonAmount: data.reduceCarbonAmount
          ? Number(data.reduceCarbonAmount.toFixed(1))
          : data.reduceCarbonAmount,
        voucherCount: data.voucherCount,
      });
    }

    if ("partyApplicationCount" in data) {
      setUserInfo({
        isLoggedIn: data.isLoggedIn,
      });
      setAdminInfo({
        partyApplicationCount: data.partyApplicationCount,
        inquiryCount: data.inquiryCount,
      });
    }

  }, [query.data]);

  return query;
};
