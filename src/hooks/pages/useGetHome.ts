import { useQuery } from "@tanstack/react-query";
import { useUserStore } from "@/store/useUserStore.ts";
import { useEffect } from "react";
import { getHome } from "@/apis/pages/getHome.ts";
import type { HomeResponse } from "@/types/pages.ts";
import { useAdminStore } from "@/store/useAdminStore.ts";

export const useGetHome = () => {
  const { user, setHomeUserInfo } = useUserStore();
  const { setHomeAdminInfo } = useAdminStore();

  const query = useQuery<HomeResponse>({
    queryKey: ["home"],
    queryFn: getHome,
    staleTime: 1000 * 60 * 5,
    retry: false,
    enabled: !user?.id,
  });

  useEffect(() => {
    if (!query.data) return;

    setHomeUserInfo({
      isLoggedIn: query.data.isLoggedIn,
      userImageUrl: query.data.userImageUrl,
      reduceCarbonAmount: query.data.reduceCarbonAmount ? Number(query.data.reduceCarbonAmount.toFixed(1)) : query.data.reduceCarbonAmount,
      voucherCount: query.data.voucherCount,
    });

    setHomeAdminInfo({
      ongoingParties: query.data.ongoingParties,
      noticeDocuments: query.data.noticeDocuments,
    });

  }, [query.data, setHomeUserInfo]);

  return query;
};
