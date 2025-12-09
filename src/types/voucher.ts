// 교환권(바우처) 타입
export interface Voucher {
  id: string;
  userId: string;
  qrCode: string;
  sourcePartyId: string;
  sourceParticipantId: string;
  sourceClothingNumber: string;
  isUsed: boolean;
  usedPartyId: string | null;
  takenClothingNumber: string | null;
  usedAt: string | null;
  issuedAt: string;
}

