// 더미 데이터 생성 함수
import type {RepairClothsResponse, ThumbnailItem} from "@/types/community.ts";

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
