import { useMutation } from "@tanstack/react-query";
import { postPartyHost } from "@/apis/party/partyHost";
import { usePartyHostStore } from "@/store/useHostStore";
import type { PartyHostRequest } from "@/types/party";

/**
 * 파티 주최 요청 훅
 * Zustand 스토어 값 기반으로 postPartyHost 실행
 */
export const usePostParty = () => {
  const store = usePartyHostStore();

  return useMutation({
    mutationKey: ["postPartyHost"],
    mutationFn: async () => {
      const payload: PartyHostRequest = {
        isGroup: store.isGroup,
        groupName: store.groupName,
        name: store.name,
        phone: store.phone,
        email: store.email,
        openAt: new Date(store.openAt),
        closeAt: new Date(store.closeAt),
        address: store.address,
        addressDetail: store.addressDetail,
        maxChangeCnt: store.maxChangeCnt,
        maxAttendeeCnt: store.maxAttendeeCnt,
        partyTitle: store.partyTitle,
        partyDescription: store.partyDescription,
        deliverAddress: store.deliverAddress,
        deliverAddressDetail: store.deliverAddressDetail,
        desiredDate: new Date(store.desiredDate),
        taxReceipt: store.taxReceipt,
        taxEmail: store.taxEmail,
        xmap: store.xmap,
        ymap: store.ymap,
      };

      return await postPartyHost(payload);
    },
    onSuccess: () => {
      alert("파티 주최 신청이 완료되었습니다!");
      store.reset();
    },
    onError: (error) => {
      console.error("파티 주최 신청 실패:", error);
      alert("신청 중 오류가 발생했습니다. 다시 시도해주세요.");
    },
  });
};
