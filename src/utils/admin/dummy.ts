import type { PartyDetailResponse } from "@/types/adminTypes.ts";

export interface PartyItem {
  partyId: string;
  partyName: string;
  register: string;
  size: number;
}

export const generateDummyParties = (count: number): PartyItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    partyId: `party-${index + 1}`,
    partyName: `파티 이름 ${index + 1}`,
    register: `주최자-${index + 1}`,
    size: Math.floor(Math.random() * 50) + 1, // 1~50
  }));
};

// src/utils/admin/generateDummyDetails.ts

export const generateDummyDetails = (count: number): PartyDetailResponse[] => {
  return Array.from({ length: count }, (_, index) => ({
    organizer: `주최자 ${index + 1}`,
    department: `소속 ${index + 1}`,
    contact: `010-1234-${(1000 + index).toString().slice(-4)}`,
    email: `user${index + 1}@example.com`,

    status: index % 2 === 0 ? "진행중" : "마감",
    size: Math.floor(Math.random() * 10) + 1,
    date: `2025-01-${(index + 10).toString().padStart(2, "0")}`,
    time: `${9 + index}:00`,
    place: `서울시 어딘가 ${index + 1}층`,
    maxParticipants: 30 + index,

    paymentStatus: index % 2 === 0 ? "완료" : "대기중",
    postalCode: `1234${index}`,
    address: `서울시 강남구 ~ ${index + 1}번지`,
    hopeDeliveryDate: `2025-02-${(index + 5).toString().padStart(2, "0")}`,
    trackingNumber: `TRACK${index + 1}`,
    invoice: index % 2 === 0,
    invoiceEmail: `invoice${index + 1}@example.com`,
  }));
};
