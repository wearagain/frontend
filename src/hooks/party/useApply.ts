import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  postPartyParticipant,
  getMyParticipations,
  getMyHostApplications,
  getParticipationDetail,
  deleteParticipation,
  getMyTakenClothes,
} from "@/apis/party/apply";
import type {
  PartyParticipantResponse,
  HostApplicationResponse,
  MyTakenClothingResponse,
} from "@/types/apply";
import { useMe } from "@/hooks/auth/useMe";
import { handleApiError } from "@/utils/handleApiError";
import type { SelectedItem } from "@/types/clothingCategory";

interface ItemInfo {
  images: string[];
  description: string;
}

interface ApplyData {
  selectedItems: SelectedItem[];
  itemsInfo: Map<string, ItemInfo>;
  selectedDate: Date | null;
  selectedTime: string | null;
}

// 교환 의류 내역
export const useGetMyTakenClothes = () => {
  return useQuery<MyTakenClothingResponse[], Error>({
    queryKey: ["myTakenClothes"],
    queryFn: getMyTakenClothes,
  });
};

export const useApplySubmit = (partyId: string) => {
  const { data: userData } = useMe();

  return useMutation({
    mutationKey: ["applySubmit", partyId],
    mutationFn: async (applyData: ApplyData) => {
      if (!userData) {
        throw new Error("사용자 정보가 없습니다. 다시 로그인해주세요.");
      }

      const { selectedItems, itemsInfo, selectedDate, selectedTime } = applyData;

      const clothingItems = selectedItems.flatMap((item) => {
        return Array.from({ length: item.count }, (_, index) => {
          const itemId = `${item.code}-${index}`;
          const info = itemsInfo.get(itemId) || { images: [], description: "" };

          return {
            mainCategory: item.mainCategory,
            subCategory: item.subCategory,
            description: info.description || "",
            imageUrls: info.images,
          };
        });
      });

      if (!selectedDate || !selectedTime) {
        throw new Error("날짜와 시간을 선택해주세요.");
      }

      const [hours, minutes] = selectedTime.split(":").map(Number);
      const year = selectedDate.getFullYear();
      const month = selectedDate.getMonth();
      const dateOfMonth = selectedDate.getDate();
      const timestamp = Date.UTC(year, month, dateOfMonth, hours, minutes, 0, 0);
      const attendanceDateTime = new Date(timestamp);
      const attendanceDate = attendanceDateTime.toISOString();

      const payload = {
        name: userData.nickname,
        phone: "", // TODO: useMe에 phone 정보 추가 시 사용
        email: userData.email,
        clothingItems,
        attendanceDate,
      };

      const res = await postPartyParticipant(partyId, payload);
      return res;
    },
    onSuccess: (data) => {
      console.log("파티 신청 성공:", data?.message);
    },
    onError: (error: unknown) => {
      alert(handleApiError(error));
      console.error("파티 신청 실패:", error);
    },
  });
};

export const useGetParticipantList = () => {
  return useQuery<PartyParticipantResponse[], Error>({
    queryKey: ["myParticipants"],
    queryFn: getMyParticipations,
  });
};

export const useGetHostApplicationList = () => {
  return useQuery<HostApplicationResponse[], Error>({
    queryKey: ["myHostApplications"],
    queryFn: getMyHostApplications,
  });
};

export const useGetParticipation = (participantId: string) => {
  return useQuery({
    queryKey: ["participant", participantId],
    queryFn: () => getParticipationDetail(participantId),
  });
};

export const useCancelParticipation = () => {
  const queryClient = useQueryClient();

  return useMutation<PartyParticipantResponse, Error, string>({
    mutationKey: ["cancelParticipation"],
    mutationFn: (participantId: string) => deleteParticipation(participantId),

    onSuccess: (data, participantId) => {
      alert(`신청 ${participantId} 취소가 완료되었습니다.`);
      queryClient.invalidateQueries({ queryKey: ["participant", participantId] });
      queryClient.invalidateQueries({ queryKey: ["myParticipants"] });
    },
    onError: (error: unknown) => {
      alert(handleApiError(error));
    },
  });
};
