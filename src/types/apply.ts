/**
 * 신청 리스트
 */

// 신청 상태 타입
export type ParticipantStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";
export type HostApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export const STATUS_MAP: Record<ParticipantStatus, string> = {
  PENDING: "승인대기",
  APPROVED: "승인완료",
  REJECTED: "반려",
  CANCELLED: "취소",
};

export const STATUS_TABS: { label: string; value: ParticipantStatus }[] = [
  { label: "승인대기", value: "PENDING" },
  { label: "승인완료", value: "APPROVED" },
  { label: "반려", value: "REJECTED" },
  { label: "취소", value: "CANCELLED" },
];

// Request DTO
export interface ClothingItemRequest {
  mainCategory: string;
  subCategory: string;
  description: string;
  imageCount: number;
}

// Response DTO
export interface ClothingItemResponse {
  clothingNumber?: string;
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// 신청 요청 바디
export interface PartyParticipantRequest {
  images: string[]
  request: {
    name: string;
    phone: string;
    email: string;

    clothingItems: ClothingItemRequest[];
    attendanceDate: string;
  }
}



// 교환 의류 관련
export interface MyTakenClothingResponse {
  voucherId: string;
  takenClothingNumber: string;
  originalClothingNumber: string;

  takenPartyId: string;
  takenPartyTitle: string;
  takenAt: string;

  category: string;
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// 신청 상세 정보
export interface PartyParticipantResponse {
  id: string; // Participant ID
  partyId: string;
  partyTitle: string;
  address: string;
  addressDetail: string;
  userId: string;

  name: string;
  phone: string;
  email: string;

  clothingItems: ClothingItemResponse[];
  attendanceDate: string;

  status: ParticipantStatus;
  appliedAt: string;
  processedAt: string | null;

  qrCode: string | null;
  qrExpiresAt: string | null;
  imageUrls?: string[]
}

export interface HostApplicationResponse {
  id: string;
  isGroup: boolean;
  groupName: string;
  userId: string;

  name: string;
  phone: string;
  email: string;

  openAt: string;
  closeAt: string;
  address: string;
  addressDetail: string;

  maxChangeCnt: number;
  maxAttendeeCnt: number;

  partyTitle: string;
  partyDescription: string;
  deliverAddress: string;
  deliverAddressDetail: string;
  desiredDate: string;
  deliveryStatus?: string;
  deliveryMemo?: string;
  trackingNumber?: string;
  courierName?: string;
  deliveryStatusUpdatedAt?: string;

  taxReceipt: boolean;
  taxEmail: string;
  taxId?: string;

  status: HostApplicationStatus;
  processMemo: string;
  appliedAt: string;
  processedAt: string;

  xMap?: number;
  yMap?: number;
}

/**
 * 배송 관련
 */

// TODO: 배송 STATUS 추가