export type AdminPartyFilter = "ALL" | "PENDING" | "APPROVED" | "REJECTED" | "CANCEL";

export type PartyAdminStatus = "ALL" | "UPCOMING" | "ONGOING" | "COMPLETED" | "CANCELLED";

export interface PartyDetailResponse {
  organizer: string;
  department: string;
  contact: string;
  email: string;

  status: string;
  size: number;
  date: string;
  time: string;
  place: string;
  maxParticipants: number;

  paymentStatus: string;
  postalCode: string;
  address: string;
  hopeDeliveryDate: string;
  trackingNumber: string;
  invoice: boolean;
  invoiceEmail: string;
}
