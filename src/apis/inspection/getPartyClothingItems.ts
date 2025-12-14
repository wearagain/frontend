import { axiosInstance } from "@/apis/axios-instance";

export interface PartyClothingItem {
  clothingNumber: string;
  category: string;
  description: string;
  imageUrls: string[];
  donorUserId: string;
}

export const getPartyClothingItems = async (
  partyId: string,
  params?: { searchKeyword?: string }
): Promise<PartyClothingItem[]> => {
  const { data } = await axiosInstance.get<PartyClothingItem[]>(
    `/api/inspection/available-clothes`,
    {
      params: {
        partyId,
        ...params,
      },
    }
  );
  return data;
};
