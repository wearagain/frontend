import { axiosInstance } from "@/apis/axios-instance";
import type { InspectionScanResponse, InspectionStatus, ClothingCategory } from "@/types/inspection";

// QR 코드로 검수 정보 조회
export const scanInspection = async (qrCode: string): Promise<InspectionScanResponse> => {
  const { data } = await axiosInstance.get<InspectionScanResponse>("/api/inspection/scan", {
    params: { qrCode },
  });
  return data;
};

// 의류 아이템 검수 요청 타입
export interface InspectClothingRequest {
  participantId: string;
  clothingNumber: string;
  status: InspectionStatus;
  reason: string;
}

// 교환권 정보
export interface ExchangeVoucher {
  voucherId: string;
  qrCode: string;
  issuedAt: string;
}

// 의류 아이템 검수 응답 타입
export interface InspectClothingResponse {
  participantId: string;
  clothingNumber: string;
  category: ClothingCategory;
  description: string;
  imageUrls: string[];
  inspectionStatus: InspectionStatus;
  inspectionReason: string | null;
  inspectionAt: string;
  inspectorId: string;
  exchangeVoucher: ExchangeVoucher | null;
}

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
