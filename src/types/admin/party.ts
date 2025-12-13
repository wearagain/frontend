import type { PartyStatus } from "@/types/party.ts";

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

export type PartyApplicationView = Omit<
  PartyApplicationResponse,
  "openAt" | "closeAt"
> & {
  dateFromTo: string;
  timeFromTo: string;
};

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
  status: PartyStatus;
  hostName: string;
  isGroup: boolean;
  isFull: boolean;
  imageUrl: string | null;
  xmap: number | null;
  ymap: number | null;
}

export interface PartyManageDetail {
  id: string;
  applicationId: string;

  isGroup: boolean;

  hostId: string;
  hostName: string;
  hostEmail: string;

  openAt: string;
  closeAt: string;

  address: string;
  addressDetail: string | null;

  maxChangeCnt: number;
  maxAttendeeCnt: number;

  title: string;
  description: string;

  currentAttendeeCnt: number;
  status: PartyStatus;

  imageUrl: string | null;
  xmap: number | null;
  ymap: number | null;
}


export type ManageAction = "confirm" | "delete" | null;

export type ManageBarStatus = "control" | "confirm" | "delete" | null;


export interface DeliveryStatusUpdateRequest {
  deliveryStatus: DeliveryStatus;
  deliveryMemo?: string | null;
  trackingNumber?: string | null;
  courierName?: string | null;
}

export interface TaxUpdateRequest {
  taxId?: string;
  name?: string;
}

export interface SelectedItemStatus<TStatus extends string> {
  nextStatus?: TStatus;
  ids?: string[];
}

export interface AdminPartyModalProps {
  setOpenModal?: (v: boolean) => void;
  setModalAction?: React.Dispatch<React.SetStateAction<ManageAction>>;
}

