import { axiosInstance } from "@/apis/axios-instance";
import type {
  InspectionScanResponse,
  InspectClothingRequest,
  InspectClothingResponse,
} from "@/types/inspection";

// QR 코드로 검수 정보 조회
export const scanInspection = async (qrCode: string, partyId: string): Promise<InspectionScanResponse> => {
  const { data } = await axiosInstance.get<InspectionScanResponse>("/api/inspection/scan", {
    params: { qrCode, partyId },
  });
  return data;
};

// 의류 아이템 검수 처리 (승인/반려)
export const inspectClothingItem = async (
  request: InspectClothingRequest
): Promise<InspectClothingResponse> => {
  const { data } = await axiosInstance.post<InspectClothingResponse>(
    "/api/inspection/inspect",
    request
  );
  return data;
};

// 검수 완료
export const completeInspection = async (participantId: string): Promise<void> => {
  await axiosInstance.post(`/api/inspection/complete/${participantId}`);
};
