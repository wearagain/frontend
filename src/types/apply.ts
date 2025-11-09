/**
 * 신청 리스트
 */

// 신청 상태 타입
export type ParticipantStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

// Request DTO
export interface ClothingItemRequest {
  mainCategory: string;
  subCategory: string;
  description: string;
  imageUrls: string[];
}

// Response DTO
export interface ClothingItemResponse extends ClothingItemRequest {
  clothingNumber: string;
}

// 신청 요청 바디
export interface PartyParticipantRequest {
  name: string;
  phone: string;
  email: string;

  clothingItems: ClothingItemRequest[];
  attendanceDate: string;
}

// 신청 상세 정보
export interface PartyParticipantResponse {
  id: string; // Participant ID
  partyId: string;
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
}
