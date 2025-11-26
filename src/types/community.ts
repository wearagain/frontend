import type { ClothingCategoryCode } from "@/types/clothingCategory.ts";

/**
 * 수선의뢰 게시판 썸네일 정보
 */
export interface ExchangeThumbnailResponse {
  publicThumbnails: ThumbnailItem[];
  privateThumbnails: ThumbnailItem[];
}

export interface ThumbnailItem {
  id: string;
  thumbnailUrl: string;
  name: string;
  likeCount: number;
  isLikedByUser: boolean;
}

export interface RepairClothsResponse {
  clothesId: string;
  isLikedByUser: boolean;
  thumbnailUrl: string;
  repairerName: string;
  name: string;
  likeCount: number;
}

export type ClothFilterCategory = "ALL" | "TOP" | "BOTTOM" | "DRESS" | "ETC";

export interface ClothingCategory {
  code: ClothingCategoryCode;
  mainCategory: ClothFilterCategory;
  subCategory: string;
}

export interface RepairClothsDetail {
  id: string;
  repairerName: string;
  name: string;
  category: ClothFilterCategory;

  clothingNumber: string;
  gender: string;
  size: string;
  material: string;
  issueDescription: string;

  sizeDetail: string;

  images: string[]; // 이미지 URL 또는 경로
  status: string;

  // 선공개 여부
  isPublic: boolean;

  createdAt: string;
  updatedAt: string;
  likeCount: number;

  isExchanged: boolean;
}

export interface RepairClothsDetailResponse {
  clothingDetail: RepairClothsDetail;
  isLikedByUser: boolean;
}
