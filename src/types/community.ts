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

