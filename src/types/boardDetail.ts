export interface CommentReply {
  commentId: string;
  creatorId: string;
  creatorNickname: string;
  creatorImageUrl: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  communityType: string | null;
  replies: CommentReply[] | null;
  likeCount: number;
  isLikedByCurrentUser: boolean;
  isCreator: boolean;
}

export interface CommentItem {
  commentId: string;
  creatorId: string;
  creatorNickname: string;
  creatorImageUrl: string | null;
  content: string;
  createdAt: string;
  updatedAt: string;
  communityType: string | null;
  replies: CommentReply[] | null;
  likeCount: number;
  isLikedByCurrentUser: boolean;
  isCreator: boolean;
}

export interface BoardDetail {
  boardId: string;
  creatorImageUrl: string | null;
  creatorNickname: string;
  createdDate: string;
  createdAt?: string; // UI 호환성을 위한 필드 (createdDate에서 매핑)
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
  isLikedByCurrentUser: boolean;
  images: string[];
  isCreator: boolean;
  comments: CommentItem[];
}

export interface BoardDetailResponse extends BoardDetail {}
