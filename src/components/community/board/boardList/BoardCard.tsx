import type { BoardItem } from "@/types/board.ts";
import defaultThumbnail from "@/assets/images/default.png";
import { ThumbsUp, MessageSquare } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BoardCardProps {
  post: BoardItem;
}

export const BoardCard = ({ post }: BoardCardProps) => {
  const { title, content, boardType, createdAt, images, comments } = post;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/community/board/${post.id}`);
  };

  const hasImages = Array.isArray(images) && images.length > 0;
  const validSrc = hasImages ? images[0] : undefined;

  const likeCount = 0;
  const commentCount = Array.isArray(comments) ? comments.length : 0;

  const getBoardTypeLabel = (type: string): string => {
    switch (type) {
      case "FREE":
        return "자유";
      case "INFO":
        return "정보공유";
      case "QNA":
        return "FAQ";
      default:
        return "자유";
    }
  };

  const getRelativeTime = (dateString: string): string => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();

    const minutes = Math.floor(diffMs / (1000 * 60));
    const hours = Math.floor(diffMs / (1000 * 60 * 60));
    const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "방금 전";
    if (minutes < 60) return `${minutes}분 전`;
    if (hours < 24) return `${hours}시간 전`;
    if (days < 7) return `${days}일 전`;

    return date.toLocaleDateString("ko-KR", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className='flex gap-3 bg-white p-4 hover:bg-gray-50 cursor-pointer rounded-lg'
      onClick={handleClick}
    >
      {hasImages && (
        <div className='w-20 h-20 rounded-lg overflow-hidden bg-gray-100 shrink-0'>
          <img
            src={validSrc}
            alt={title}
            className='w-full h-full object-cover'
            onError={(e) => {
              e.currentTarget.src = defaultThumbnail;
            }}
          />
        </div>
      )}

      <div className='flex flex-col flex-1 min-w-0'>
        <h3 className='text-base font-semibold truncate'>{title}</h3>
        <p className='text-sm text-gray-600 truncate'>{content}</p>

        <div className='flex flex-col justify-between mt-2 flex-1'>
          <div className='flex items-center text-xs text-gray-400'>
            <span>{getBoardTypeLabel(boardType)}</span>
            <span className='mx-1'>•</span>
            <span>{getRelativeTime(createdAt)}</span>
          </div>

          <div className='flex items-center gap-3 mt-1 text-gray-500 text-sm'>
            <div className='flex items-center gap-1'>
              <ThumbsUp className='w-4 h-4' />
              <span>{likeCount}</span>
            </div>
            <div className='flex items-center gap-1'>
              <MessageSquare className='w-4 h-4' />
              <span>{commentCount}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
