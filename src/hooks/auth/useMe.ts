import { useQuery } from "@tanstack/react-query";
import { getMe, type UserProfile } from "@/apis/user/me";

export const useMe = () => {
  return useQuery<UserProfile>({
    queryKey: ["me"],
    queryFn: getMe,
    staleTime: 1000 * 60 * 5,
    retry: false,
  });
};
