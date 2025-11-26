// 더미 데이터 생성 함수
import type {
  ClothFilterCategory,
  RepairClothsDetail,
  RepairClothsResponse,
  ThumbnailItem,
} from "@/types/community.ts";

export const generateDummyThumbnails = (count: number): ThumbnailItem[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `thumbnail-${index + 1}`,
    thumbnailUrl: `https://via.placeholder.com/150?text=Thumbnail+${index + 1}`,
    name: `썸네일 이름 ${index + 1}`,
    likeCount: Math.floor(Math.random() * 100),
    isLikedByUser: Math.random() > 0.5,
  }));
};

export const generateDummyDetails = (count: number): RepairClothsResponse[] => {
  return Array.from({ length: count }, (_, index) => ({
    clothesId: `thumbnail-${index + 1}`,
    thumbnailUrl: `https://via.placeholder.com/150?text=Thumbnail+${index + 1}`,
    name: `썸네일 이름 ${index + 1}`,
    repairerName: `작성자 ${index + 1}`,
    likeCount: Math.floor(Math.random() * 100),
    isLikedByUser: Math.random() > 0.5,
  }));
};

export const generateDummyRepairClothDetails = (count: number): RepairClothsDetail[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: `repair-${index + 1}`,
    clothingNumber: `CN-${1000 + index}`,
    name: `수선예술가 ${index + 1}`,
    gender: Math.random() > 0.5 ? "남성" : "여성",
    category: "TOP" as ClothFilterCategory, // 필요하면 랜덤 카테고리 생성 가능

    material: ["Cotton", "Wool", "Polyester"][Math.floor(Math.random() * 3)],
    size: ["S", "M", "L", "XL"][Math.floor(Math.random() * 4)],
    sizeDetail: `가슴단면: ${80 + index}cm / 총장: ${100 + index}cm`,
    repairerName: `수선사 ${index + 1}`,
    issueDescription: `상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 상품 설명 `,

    images: [
      `https://via.placeholder.com/300?text=Image+${index + 1}-1`,
      `https://via.placeholder.com/300?text=Image+${index + 1}-2`,
      `https://via.placeholder.com/300?text=Image+${index + 1}-3`,
    ],
    status: ["pending", "in_progress", "completed"][Math.floor(Math.random() * 3)],

    isPublic: Math.random() > 0.5,
    createdAt: new Date(Date.now() - index * 10000000).toISOString(),
    updatedAt: new Date().toISOString(),
    likeCount: Math.floor(Math.random() * 200),

    isExchanged: Math.random() > 0.5,
  }));
};
