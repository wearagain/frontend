import { create } from "zustand";

interface AdminStore {
  partyApplicationCount: number;
  inquiryCount: number;

  setAdminInfo: (payload: {
    partyApplicationCount: number;
    inquiryCount: number;
  }) => void;

  clearAdmin: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  partyApplicationCount: 0,
  inquiryCount: 0,

  setAdminInfo: ({ partyApplicationCount, inquiryCount }) =>
    set({
      partyApplicationCount,
      inquiryCount,
    }),

  clearAdmin: () =>
    set({
      partyApplicationCount: 0,
      inquiryCount: 0,
    }),
}));
