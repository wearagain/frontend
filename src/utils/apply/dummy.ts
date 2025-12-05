import type { PartyParticipantResponse, HostApplicationResponse } from "@/types/apply";

// PartyParticipantResponse의 상태 타입: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
export const dummyParticipateData: PartyParticipantResponse[] = [
  {
    id: "p1",
    partyId: "party-001",
    userId: "user-001",

    name: "홍길동",
    phone: "010-1111-2222",
    email: "hong@example.com",

    clothingItems: [
      {
        clothingNumber: "CL-1001",
        mainCategory: "상의",
        subCategory: "자켓",
        description: "깔끔한 블랙 자켓",
        imageUrls: [],
      },
    ],

    attendanceDate: "2025-10-03T14:00:00",
    status: "PENDING",
    appliedAt: "2025-01-20",
    processedAt: null,

    qrCode: null,
    qrExpiresAt: null,

    // 파티 정보
    partyTitle: "광진 능동 파티",
    address: "서울특별시 광진구 군자동",
    addressDetail: ""
  },
  {
    id: "p2",
    partyId: "party-002",
    userId: "user-002",

    name: "김철수",
    phone: "010-2222-3333",
    email: "kim@example.com",

    clothingItems: [
      {
        clothingNumber: "CL-2001",
        mainCategory: "하의",
        subCategory: "바지",
        description: "스트레이트 핏 청바지",
        imageUrls: [],
      },
    ],

    attendanceDate: "2025-10-03T14:00:00",
    status: "CANCELLED",
    appliedAt: "2025-02-15",
    processedAt: "2025-02-18",

    qrCode: null,
    qrExpiresAt: null,

    // 파티 정보
    partyTitle: "광진 능동 파티",
    address: "서울특별시 광진구 군자동",
    addressDetail: ""
  },
  {
    id: "p3",
    partyId: "party-003",
    userId: "user-003",

    name: "이영희",
    phone: "010-3333-4444",
    email: "lee@example.com",

    clothingItems: [
      {
        clothingNumber: "CL-3001",
        mainCategory: "드레스",
        subCategory: "원피스",
        description: "봄 시즌 화이트 원피스",
        imageUrls: [],
      },
      {
        clothingNumber: "CL-3002",
        mainCategory: "기타",
        subCategory: "가방",
        description: "여성 미니백",
        imageUrls: [],
      },
    ],

    attendanceDate: "2025-10-03T14:00:00",
    status: "PENDING",
    appliedAt: "2025-03-22",
    processedAt: null,

    qrCode: null,
    qrExpiresAt: null,

    // 파티 정보
    partyTitle: "광진 능동 파티",
    address: "서울특별시 광진구 군자동",
    addressDetail: ""
  },
  {
    id: "p4",
    partyId: "party-003",
    userId: "user-003",

    name: "이영희",
    phone: "010-3333-4444",
    email: "lee@example.com",

    clothingItems: [
      {
        clothingNumber: "CL-3001",
        mainCategory: "드레스",
        subCategory: "원피스",
        description: "봄 시즌 화이트 원피스",
        imageUrls: [],
      },
      {
        clothingNumber: "CL-3002",
        mainCategory: "기타",
        subCategory: "가방",
        description: "여성 미니백",
        imageUrls: [],
      },
    ],

    attendanceDate: "2025-10-03T14:00:00",
    status: "REJECTED",
    appliedAt: "2025-03-22",
    processedAt: null,

    qrCode: null,
    qrExpiresAt: null,

    // 파티 정보
    partyTitle: "광진 능동 파티",
    address: "서울특별시 광진구 군자동",
    addressDetail: ""
  },
  {
    id: "p5",
    partyId: "party-003",
    userId: "user-003",

    name: "이영희",
    phone: "010-3333-4444",
    email: "lee@example.com",

    clothingItems: [
      {
        clothingNumber: "CL-3001",
        mainCategory: "드레스",
        subCategory: "원피스",
        description: "봄 시즌 화이트 원피스",
        imageUrls: [],
      },
      {
        clothingNumber: "CL-3002",
        mainCategory: "기타",
        subCategory: "가방",
        description: "여성 미니백",
        imageUrls: [],
      },
    ],

    attendanceDate: "2025-10-03T14:00:00",
    status: "APPROVED",
    appliedAt: "2025-03-22",
    processedAt: null,

    qrCode: null,
    qrExpiresAt: null,

    // 파티 정보
    partyTitle: "광진 능동 파티",
    address: "서울특별시 광진구 군자동",
    addressDetail: ""
  },
];

// HostApplicationResponse의 상태 타입: "PENDING" | "APPROVED" | "REJECTED" | "CANCELLED"
export const dummyHostData: HostApplicationResponse[] = [
  {
    id: "h1",
    isGroup: false,
    groupName: "",
    userId: "user-001",

    name: "홍길동",
    phone: "010-1111-2222",
    email: "hong@example.com",

    openAt: "2025-03-01",
    closeAt: "2025-03-05",
    address: "서울특별시 광진구 군자동",
    addressDetail: "",

    maxChangeCnt: 5,
    maxAttendeeCnt: 30,

    partyTitle: "광진 능동 파티",
    partyDescription: "광진구에서 열리는 패션 교환 파티.",
    deliverAddress: "서울 광진구 물류센터",
    deliverAddressDetail: "2층 배송실",
    desiredDate: "2025-10-03",

    taxReceipt: false,
    taxEmail: "",

    status: "PENDING",
    processMemo: "",
    appliedAt: "2025-02-20",
    processedAt: "",

    xmap: 127.0276,
    ymap: 37.4979,
  },
  {
    id: "h2",
    isGroup: true,
    groupName: "패션모임",
    userId: "user-002",

    name: "김철수",
    phone: "010-2222-3333",
    email: "kim@example.com",

    openAt: "2025-04-10",
    closeAt: "2025-04-12",
    address: "서울특별시 광진구 군자동",
    addressDetail: "",

    maxChangeCnt: 5,
    maxAttendeeCnt: 30,

    partyTitle: "광진 능동 파티",
    partyDescription: "광진구에서 열리는 대규모 패션 교환 행사.",
    deliverAddress: "서울 광진구 물류센터",
    deliverAddressDetail: "1층 접수실",
    desiredDate: "2025-10-03",

    taxReceipt: true,
    taxEmail: "kim-tax@example.com",

    status: "CANCELLED",
    processMemo: "",
    appliedAt: "2025-03-10",
    processedAt: "",

    xmap: 126.9143,
    ymap: 37.5481,
  },
];
