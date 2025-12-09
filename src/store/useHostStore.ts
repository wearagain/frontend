import { create } from "zustand";
import { persist } from "zustand/middleware";

interface PartyHostState {
  isGroup: boolean;
  groupName: string;
  name: string;
  phone: string;
  email: string;

  // 파티 일정
  openAt: string;
  closeAt: string;
  // 임시 (백엔드 없음)
  openTime?: string;
  closeTime?: string;

  // 파티 장소
  address: string;
  addressDetail: string;
  xmap: number;
  ymap: number;

  // 파티 정보
  maxChangeCnt: number;
  maxAttendeeCnt: number;
  partyTitle: string;
  partyDescription: string;

  // 배송 및 결제
  deliverAddress: string;
  deliverAddressDetail: string;
  desiredDate: string;
  taxReceipt: boolean;
  taxId: string;
  taxEmail: string;

  // 상태 변경 함수
  setField: <K extends keyof PartyHostState>(key: K, value: PartyHostState[K]) => void;
  reset: () => void;
}

export const usePartyHostStore = create<PartyHostState>()(
  persist(
    (set) => ({
      isGroup: false,
      groupName: "",
      name: "",
      phone: "",
      email: "",
      openAt: new Date().toISOString(),
      closeAt: new Date().toISOString(),

      openTime: "",
      closeTime: "",

      address: "",
      addressDetail: "",
      xmap: 0,
      ymap: 0,
      maxChangeCnt: 0,
      maxAttendeeCnt: 0,
      partyTitle: "",
      partyDescription: "",
      deliverAddress: "",
      deliverAddressDetail: "",
      desiredDate: new Date().toISOString(),
      taxReceipt: true,
      taxId: "",
      taxEmail: "",

      setField: (key, value) => set({ [key]: value } as Partial<PartyHostState>),

      reset: () =>
        set({
          isGroup: false,
          groupName: "",
          name: "",
          phone: "",
          email: "",
          openAt: new Date().toISOString(),
          closeAt: new Date().toISOString(),

          openTime: "",
          closeTime: "",

          address: "",
          addressDetail: "",
          xmap: 0,
          ymap: 0,
          maxChangeCnt: 0,
          maxAttendeeCnt: 0,
          partyTitle: "",
          partyDescription: "",
          deliverAddress: "",
          deliverAddressDetail: "",
          desiredDate: new Date().toISOString(),
          taxReceipt: true,
          taxId: "",
          taxEmail: "",
        }),
    }),
    {
      name: "party-host-storage",
      partialize: (state) => ({
        isGroup: state.isGroup,
        groupName: state.groupName,
        name: state.name,
        phone: state.phone,
        email: state.email,
        openAt: state.openAt,
        closeAt: state.closeAt,

        openTime: state.openTime,
        closeTime: state.closeTime,

        address: state.address,
        addressDetail: state.addressDetail,
        xmap: state.xmap,
        ymap: state.ymap,
        maxChangeCnt: state.maxChangeCnt,
        maxAttendeeCnt: state.maxAttendeeCnt,
        partyTitle: state.partyTitle,
        partyDescription: state.partyDescription,
        deliverAddress: state.deliverAddress,
        deliverAddressDetail: state.deliverAddressDetail,
        desiredDate: state.desiredDate,
        taxReceipt: state.taxReceipt,
        taxId: state.taxId,
        taxEmail: state.taxEmail,
      }),
    }
  )
);
