import { useQuery } from "@tanstack/react-query";
import { getMe, type UserProfile } from "@/apis/user/getMe.ts";
import { useUserStore } from "@/store/useUserStore.ts";
import { useEffect } from "react";
import { getUserRole } from "@/utils/common/getUserRole.ts";

export const useMe = () => {
  const {  setUser, setIsAdmin } = useUserStore();

  const query = useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });

  useEffect(() => {
    if (!query.data)  return;
    setUser(query?.data);
    setIsAdmin(getUserRole(query?.data.role));
  }, [query.data]);

  return query;
};
