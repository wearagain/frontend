import { create } from "zustand";
import type { OngoingParty } from "@/types/pages.ts";
import type { NoticeDocument } from "@/types/notice.ts";

interface AdminStore {
  ongoingPartyCount: number;
  noticeCount: number;

  setHomeAdminInfo: (payload: {
    ongoingParties: OngoingParty[];
    noticeDocuments: NoticeDocument[];
  }) => void;

  clearAdmin: () => void;
}

export const useAdminStore = create<AdminStore>((set) => ({
  ongoingPartyCount: 0,
  noticeCount: 0,

  setHomeAdminInfo: ({ ongoingParties, noticeDocuments }) =>
    set({
      ongoingPartyCount: ongoingParties.length,
      noticeCount: noticeDocuments.length,
    }),

  clearAdmin: () => set({ ongoingPartyCount: 0, noticeCount: 0 }),
}));
