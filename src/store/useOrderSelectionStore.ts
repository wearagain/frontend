import { create } from "zustand";
import type { DeliveryStatus } from "@/types/admin/party";
import type { SelectedOrderItems } from "@/types/admin/party";

export interface OrderSelectionState {
  selected: SelectedOrderItems<DeliveryStatus>;
  activeSection: DeliveryStatus | null;

  setSelected: (
    updater:
      | SelectedOrderItems<DeliveryStatus>
      | ((prev: SelectedOrderItems<DeliveryStatus>) => SelectedOrderItems<DeliveryStatus>)
  ) => void;

  setActiveSection: (status: DeliveryStatus | null) => void;
  reset: () => void;
}

export const useOrderSelectionStore = create<OrderSelectionState>((set) => ({
  selected: {
    nextStatus: "PENDING",
    items: []
  },
  activeSection: null,

  setSelected: (updater) =>
    set((state) => ({
      selected:
        typeof updater === "function" ? updater(state.selected) : updater,
    })),

  setActiveSection: (status) =>
    set({ activeSection: status }),

  reset: () =>
    set({
      selected: {
        nextStatus: "PENDING",
        items: []
      },
      activeSection: null,
    }),
}));
