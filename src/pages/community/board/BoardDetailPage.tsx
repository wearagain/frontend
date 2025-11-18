import { useParams } from "react-router-dom";
import { useGetBoardDetail } from "@/hooks/board/useGetBoardDetail";
import { useState } from "react";
import { BoardDetailHeader } from "@/components/\bcommunity/board/boardDetails/BoardDetailHeader";
import { BoardDetailImages } from "@/components/\bcommunity/board/boardDetails/BoardDetailImages";
import { BoardDetailContent } from "@/components/\bcommunity/board/boardDetails/BoardDetailContent";
import { BoardComments } from "@/components/\bcommunity/board/boardDetails/BoardComments";
import { CommentInputBar } from "@/components/\bcommunity/board/boardDetails/CommentInputBar";
import { MessageSquare, ThumbsUp } from "lucide-react";

const BoardDetailPage = () => {
  const { boardId } = useParams();
  const { data, isLoading } = useGetBoardDetail(boardId!);

  const [comment, setComment] = useState("");

  if (isLoading || !data) return <div />;

  const { board } = data;

  const handleSubmit = () => {
    console.log("댓글 등록:", comment);
  };

  return (
    <div className='p-4 pb-20'>
      <BoardDetailHeader board={board} />
      <BoardDetailImages images={board.images} />
      <BoardDetailContent board={board} />

      <div className='flex items-center gap-4 mt-6 text-gray-500'>
        <div className='flex items-center gap-1'>
          <ThumbsUp size={18} />
          <span>4</span>
        </div>
        <div className='flex items-center gap-1'>
          <MessageSquare size={18} />
          <span>{board.comments.length}</span>
        </div>
      </div>

      <BoardComments comments={board.comments} />

      <CommentInputBar comment={comment} onChange={setComment} onSubmit={handleSubmit} />
    </div>
  );
};

export default BoardDetailPage;
