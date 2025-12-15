import { create } from "zustand";
import type { UserProfile } from "@/apis/user/getMe.ts";

interface UserStore {
  user: UserProfile | null;
  isLoggedIn: boolean;
  isAdmin: boolean;
  userImageUrl: string | null;
  reduceCarbonAmount: number | null;
  voucherCount: number | null;

  setUser: (user: UserProfile) => void;
  setIsAdmin: (isAdmin: boolean) => void;
  setUserInfo: (payload: {
    isLoggedIn: boolean;
    userImageUrl?: string;
    reduceCarbonAmount?: number;
    voucherCount?: number;
  }) => void;

  clearUser: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  isAdmin: false,
  isLoggedIn: false,

  userImageUrl: null,
  reduceCarbonAmount: null,
  voucherCount: null,


  setUser: (user) => set({ user }),
  setIsAdmin: (isAdmin) => set({ isAdmin }),
  setUserInfo: (
    {
      isLoggedIn,
      userImageUrl,
      reduceCarbonAmount,
      voucherCount,
    }) =>
    set({
      isLoggedIn,
      userImageUrl,
      reduceCarbonAmount: reduceCarbonAmount ?? null,
      voucherCount: voucherCount ?? null,
    }),

  clearUser: () =>
    set({
      user: null,
      isAdmin: false,
      isLoggedIn: false,
      userImageUrl: null,
      reduceCarbonAmount: null,
      voucherCount: null,
    }),

}));
