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

export type ClothCategory = "ALL" | "TOP" | "BOTTOM" | "DRESS" | "OTHERS";
