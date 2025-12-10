import { useRef, useEffect } from "react";
import { useGetBoardList } from "@/hooks/board/useGetBoardList.ts";
import { BoardCard } from "./BoardCard.tsx";
import type { BoardListResponse } from "@/types/board.ts";

interface BoardListProps {
  boardType?: "FREE" | "QNA" | "INFO";
  sort?: "popular" | "latest";
  keyword?: string;
}

export const BoardList = ({ boardType }: BoardListProps) => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status, error } = useGetBoardList({
    boardType,
    size: 20,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!observerRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage) fetchNextPage();
      },
      { threshold: 0.2 }
    );
    observer.observe(observerRef.current);
    return () => observer.disconnect();
  }, [fetchNextPage, hasNextPage]);

  const posts = data?.pages.flatMap((page: BoardListResponse) => page.items) ?? [];

  if (status === "error") {
    return <div className='text-red-500'>에러 발생: {error.message}</div>;
  }

  return (
    <div className='flex flex-col gap-3'>
      {posts.length > 0 ? (
        posts.map((post) => <BoardCard key={post.id} post={post} />)
      ) : (
        <div className='text-gray-400 text-center py-6'>게시글이 없습니다.</div>
      )}

      <div ref={observerRef} className='h-8 flex justify-center items-center text-gray-400 text-sm'>
        {isFetchingNextPage ? "불러오는 중..." : hasNextPage ? "스크롤로 더 보기" : ""}
      </div>
    </div>
  );
};
