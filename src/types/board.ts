export type BoardType = "FREE" | "QNA" | "INFO";
export type BoardSort = "RECENT" | "POPULAR";

export interface BoardQuery {
  sort: BoardSort;
  boardType?: BoardType;
  size?: number;
  cursor?: string;
}

export interface Comment {
  id: string;
  content: string;
  creatorId: string;
  creatorNickname: string;
  createdAt: string;
  updatedAt: string;
  communityType: BoardType;
  likedUserIds: string[];
  seq: number;
  likeCount: number;
  creatorImageUrl: string;
}

export interface BoardItem {
  id: string;
  creatorUserImageUrl: string;
  title: string;
  content: string;
  updatedAt: string;
  creatorNickname: string;
  creatorId: string;
  boardType: BoardType;
  images: string[];
  likedUserIds: string[];
  comments: Comment[];
  createdAt: string;
  likeCount: number;
  viewCount: number;
  commentCount: number;
}

export interface BoardListResponse {
  items: BoardItem[];
  nextCursor: string | null;
  hasNext: boolean;
}

// Board Post
export interface BoardPostRequest {
  title: string;
  content: string;
  boardType: BoardType;
  images: string[];
}
