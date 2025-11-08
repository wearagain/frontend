import { axiosInstance } from "../axios-instance";

interface ClothingItemPayload {
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

interface ApplyBody {
  name: string;
  phone: string;
  email: string;
  clothingItems: ClothingItemPayload[];
  attendanceDate: string;
}

// 신청 관련
export const postPartyParticipant = async (partyId: string, payload: ApplyBody) => {
  const { data } = await axiosInstance.post(`/api/parties/${partyId}/participants`, payload, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return data;
};

// 신청 내역 관련

// /api/parties/participants/my -> 전체 내역 조회
// /api/parties/participants/{participantId} -> 상세 내역 조회
