import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { SelectedItem } from "@/types/clothingCategory";

interface ItemInfo {
  images: string[]; // 최대 5개
  description: string;
}

type ItemsInfoEntry = [string, ItemInfo];

interface ApplyState {
  partyId: string | null;
  selectedItems: SelectedItem[];
  itemsInfo: Map<string, ItemInfo>;
  selectedDate: Date | null;
  selectedTime: string | null;

  setPartyId: (partyId: string) => void;
  setSelectedItems: (items: SelectedItem[]) => void;
  updateItemsInfo: (itemId: string, info: Partial<ItemInfo>) => void;
  removeItem: (itemId: string) => void;
  setDateTime: (date: Date | null, time: string | null) => void;

  reset: () => void;
}

const INITIAL_STATE = {
  partyId: null as string | null,
  selectedItems: [] as SelectedItem[],
  itemsInfo: new Map<string, ItemInfo>(),
  selectedDate: null as Date | null,
  selectedTime: null as string | null,
};

export const useApplyStore = create<ApplyState>()(
  persist(
    (set) => ({
      ...INITIAL_STATE,

      setPartyId: (id) =>
        set((state) => {
          const newId = id;
          if (state.partyId !== newId) {
            return { ...INITIAL_STATE, partyId: newId };
          }
          return { partyId: newId };
        }),
      setSelectedItems: (items) => set({ selectedItems: items }),
      updateItemsInfo: (itemId, info) =>
        set((state) => {
          const newMap = new Map(state.itemsInfo);
          const currentInfo = newMap.get(itemId) || { images: [], description: "" };
          newMap.set(itemId, { ...currentInfo, ...info });
          return { itemsInfo: newMap };
        }),
      removeItem: (itemId) =>
        set((state) => {
          const [code] = itemId.split("-");
          const itemIndex = state.selectedItems.findIndex((item) => item.code === code);

          if (itemIndex === -1) return state;

          const newItems = [...state.selectedItems];
          const currentCount = newItems[itemIndex].count;

          let updatedItems: SelectedItem[];
          if (currentCount > 1) {
            newItems[itemIndex] = { ...newItems[itemIndex], count: currentCount - 1 };
            updatedItems = newItems;
          } else {
            updatedItems = newItems.filter((item) => item.code !== code);
          }

          const newMap = new Map(state.itemsInfo);
          newMap.delete(itemId);

          return { selectedItems: updatedItems, itemsInfo: newMap };
        }),
      setDateTime: (date, time) => set({ selectedDate: date, selectedTime: time }),

      reset: () => set({ ...INITIAL_STATE }),
    }),
    {
      name: "apply-storage",
      partialize: (state) => ({
        partyId: state.partyId,
        selectedItems: state.selectedItems,
        itemsInfo: Array.from(state.itemsInfo.entries()),
        selectedDate: state.selectedDate,
        selectedTime: state.selectedTime,
      }),
      onRehydrateStorage: () => (state) => {
        if (state && Array.isArray(state.itemsInfo)) {
          state.itemsInfo = new Map(state.itemsInfo as ItemsInfoEntry[]);
        }
        if (state && typeof state.selectedDate === "string") {
          state.selectedDate = new Date(state.selectedDate);
        }
      },
    }
  )
);
