// 의류 카테고리
export type ClothingCategory =
  | "TOP_JACKET"
  | "TOP_COAT"
  | "TOP_LONG_SLEEVE"
  | "TOP_SHORT_SLEEVE"
  | "TOP_SLEEVELESS"
  | "TOP_OTHER"
  | "BOTTOM_PANTS"
  | "BOTTOM_SKIRT"
  | "DRESS_ONE_PIECE"
  | "DRESS_TWO_PIECE"
  | "ETC_SHOES"
  | "ETC_BAG"
  | "ETC_HAT"
  | "ETC_ACCESSORY"
  | "ETC_EYEWEAR";

// 검수 상태
export type InspectionStatus = "PENDING" | "APPROVED" | "REJECTED";

// 검수 의류 아이템
export interface InspectionClothingItem {
  clothingNumber: string;
  category: ClothingCategory;
  description: string;
  imageUrls: string[];
  inspectionStatus: InspectionStatus;
  inspectionReason: string | null;
}

// 검수 스캔 응답
export interface InspectionScanResponse {
  participantId: string;
  partyId: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  clothingItems: InspectionClothingItem[];
  inspectionCompleted: boolean;
  approvedClothingCount: number;
  totalClothingCount: number;
}

// 검수 요청 (승인/반려)
export interface InspectionItemRequest {
  clothingNumber: string;
  status: "APPROVED" | "REJECTED";
  reason?: string;
}

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
