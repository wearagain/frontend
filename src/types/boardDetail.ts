export interface CommentItem {
  id: string;
  content: string;
  creatorId: string;
  creatorNickname: string;
  createdAt: string;
}

export interface BoardDetail {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  creatorNickname: string;
  creatorId: string;
  boardType: "FREE" | "QNA" | "INFO";
  images: string[];
  comments: CommentItem[];
  createdAt: string;
}

export interface BoardDetailResponse {
  isCreator: boolean;
  board: BoardDetail;
}
