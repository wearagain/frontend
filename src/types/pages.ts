import type { NoticeDocument } from "@/types/notice.ts";

// HomeResponseDto
export interface HomeResponse {
  isLoggedIn: boolean,
  nickname: string,
  userImageUrl: string,
  ReduceCarbonAmount?: number,
  ongoingParties: OngoingParty[],
  noticeDocuments: NoticeDocument[],
  voucherCount?: number,
}

// OngoingParties
export interface OngoingParty {
  partyId: string,
  partyTitle: string,
  partyImageUrl: string,
  participantCount: number,
  partyEndDate: string,
}