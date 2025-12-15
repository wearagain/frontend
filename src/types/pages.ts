import type { NoticeDocument } from "@/types/notice.ts";

// HomeResponseDto


interface BaseHomeResponse {
  isLoggedIn: boolean;
  nickname: string;
  userImageUrl?: string;
  noticeDocuments?: NoticeDocument[];
  ongoingParties?: OngoingParty[];
}

export interface UserHomeResponse extends BaseHomeResponse {
  voucherCount?: number;
  reduceCarbonAmount?: number;
  ongoingParties?: OngoingParty[];
}

export interface AdminHomeResponse extends BaseHomeResponse {
  partyApplicationCount: number;
  inquiryCount: number;
  inquiryResponse: InquiryResponse[];
  adminTotalImpactResponse: AdminTotalImpactResponse;
}

export type HomeResponse = UserHomeResponse | AdminHomeResponse;



// export interface HomeResponse extends AdminHomeResponse{
//   isLoggedIn: boolean,
//   nickname: string,
//   userImageUrl?: string,
//   voucherCount?: number,
//   reduceCarbonAmount?: number,
//   ongoingParties?: OngoingParty[],
//   noticeDocuments?: NoticeDocument[],
// }

export interface AdminHomeResponse {
  partyApplicationCount: number,
  inquiryCount: number,
  inquiryResponse: InquiryResponse[],
  adminTotalImpactResponse: AdminTotalImpactResponse,
}

export interface AdminTotalImpactResponse {
  totalUsers: number,
  totalItemCount: number,
  totalMetrics: Metric,
  partyImpacts: PartyImpact
}

export interface PartyImpact {
  partyId: string,
  partyName: string | null,
  partyType: string | null,
  partyStartDate: string | null,
  partyEndDate: string | null,
  itemCount: number,
  userCount: number,
  metrics: Metric
}

export interface Metric {
  co2Kg: number,
  waterM3: number,
  energyMj: number,
}

export interface InquiryResponse {
 id: string,
  applicationId: string,
  partyTitle: string,
  userId: string,
  userName: string,
  inquiryType: string,
  title: string,
  content: string,
  status: string,
  answer: string,
  answeredBy: string,
  answeredAt: string,
  createdAt: string,
  updatedAt: string,
}
// OngoingParties
export interface OngoingParty {
  partyId: string,
  partyTitle: string,
  partyImageUrl: string,
  participantCount: number,
  partyEndDate: string,
}