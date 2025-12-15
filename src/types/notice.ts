// 공지 카테고리 타입
export type NoticeCategory = "NOTICE" | "UPDATE";

// NoticeDocument
export interface NoticeDocument {
  id: string,
  title: string,
  content: string,
  createdAt: string,
  updatedAt: string,
  creatorNickname: string,
  creatorId: string,
}