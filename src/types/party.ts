/**
 * 파티 리스트
 */
// 파티 상태 타입
export type PartyStatus = "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

// 지역 타입
export type PartyRegion =
  | "SEOUL"
  | "INCHEON"
  | "GYEONGGI"
  | "GANGWON"
  | "CHUNGCHEONG"
  | "GYEONGSANG"
  | "JEOLLA"
  | "JEJU";

// 쿼리 파라미터 타입
export interface PartyListQuery {
  size?: number;
  cursor?: string;
  status?: PartyStatus;
  region?: PartyRegion;
  after?: string;
  availableOnly?: boolean;
}

// 단일 파티 요약 정보
export interface PartyDTO {
  id: string;
  title: string;
  openAt: string;
  closeAt: string;
  address: string;
  maxAttendeeCnt: number;
  currentAttendeeCnt: number;
  status: PartyStatus;
  hostName: string;
  isGroup: boolean;
  isFull: boolean;
  imageUrl: string;
  xmap: number;
  ymap: number;
}

export interface PartyListResponse {
  parties: PartyDTO[];
  nextCursor?: string;
  hasNext: boolean;
  size: number;
}

/**
 * 파티 상세 정보
 */
export interface PartyDetailResponse {
  id: string;
  applicationId: string;
  hostId: string;
  isGroup: boolean;
  title: string;
  description: string;
  openAt: string;
  closeAt: string;
  address: string;
  maxChangeCnt: number;
  maxAttendeeCnt: number;
  currentAttendeeCnt: number;
  status: string;
  hostName: string;
  hostEmail: string;
  imageUrl: string;
  xmap: number;
  ymap: number;
}

/**
 * 파티 주최 요청 타입
 */
export interface PartyHostRequest {
  isGroup: boolean;
  groupName: string;
  name: string;
  phone: string;
  email: string;
  openAt: string;
  closeAt: string;
  address: string;
  addressDetail: string;
  xmap: number;
  ymap: number;
  maxChangeCnt: number;
  maxAttendeeCnt: number;
  partyTitle: string;
  partyDescription: string;
  deliverAddress: string;
  deliverAddressDetail: string;
  desiredDate: string; // ISO 8601 형식 (LocalDateTime)
  taxReceipt: boolean;
  taxEmail: string | null;
  taxId: string | null;
}
