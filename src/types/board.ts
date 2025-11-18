export type BoardType = "FREE" | "QNA" | "INFO";

export interface BoardQuery {
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
}

export interface BoardItem {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  creatorNickname: string;
  creatorId: string;
  boardType: BoardType;
  images: string[];
  comments: Comment[];
  createdAt: string;
}

export interface BoardListResponse {
  items: BoardItem[];
  nextCursor: string | null;
  hasNext: boolean;
}
