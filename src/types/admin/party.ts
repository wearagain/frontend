import type { PartyAdminStatus } from "@/types/adminTypes.ts";

export interface PartyApplicationResponse {
  id: string;

  isGroup: boolean;
  groupName: string | null;

  userId: string;
  name: string; // 주최자 이름
  phone: string;
  email: string;

  openAt: string; // ISO datetime
  closeAt: string | null;

  address: string;
  addressDetail: string | null;

  maxChangeCnt: number;
  maxAttendeeCnt: number;

  partyTitle: string;
  partyDescription: string;

  deliverAddress: string;
  deliverAddressDetail: string | null;

  desiredDate: string;

  taxReceipt: boolean;
  taxEmail: string | null;
  taxId: string | null;

  status: ApplicationStatus | null;
  processMemo: string | null;

  appliedAt: string;
  processedAt: string | null;

  deliveryStatus: DeliveryStatus | null;
  deliveryMemo: string | null;
  trackingNumber: string | null;
  courierName: string | null;
  deliveryStatusUpdatedAt: string | null;

  xmap?: number | null;
  ymap?: number | null;
}

export type ApplicationStatus = "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED";

export type DeliveryStatus = "PENDING" | "PREPARING" | "IN_TRANSIT" | "DELIVERED" | "RETURNED";

export type ApplicationAction = "approve" | "reject";

export interface PartyManageResponse {
  id: string;
  title: string;
  openAt: Date;
  closeAt: Date | null;
  address: string;
  addressDetail: string | null;
  maxAttendeeCnt: number;
  currentAttendeeCnt: number;
  status: PartyAdminStatus;
  hostName: string;
  isGroup: boolean;
  isFull: boolean;
  imageUrl: string | null;
  xmap: number | null;
  ymap: number | null;
}
