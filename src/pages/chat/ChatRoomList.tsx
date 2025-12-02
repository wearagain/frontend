interface ChatRoomInfo {
  chatRoomId: number;
  userAId: number;
  userBId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface ChatRoomListProps {
  chatRooms: ChatRoomInfo[];
  selectedChatRoomId?: number;
  onSelectChatRoom: (room: ChatRoomInfo) => void;
  totalUnreadCount: number;
  currentUserId: number;
}

function formatDistanceToNow(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const diff = now.getTime() - date.getTime();

  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);

  if (minutes < 1) return "방금 전";
  if (minutes < 60) return `${minutes}분 전`;
  if (hours < 24) return `${hours}시간 전`;
  if (days < 7) return `${days}일 전`;
  return date.toLocaleDateString("ko-KR");
}

export default function ChatRoomList({
  chatRooms,
  selectedChatRoomId,
  onSelectChatRoom,
  currentUserId,
}: ChatRoomListProps) {
  const getOtherUserId = (room: ChatRoomInfo) => {
    return room.userAId === currentUserId ? room.userBId : room.userAId;
  };

  return (
    <div className='flex-1 overflow-y-auto'>
      {chatRooms.length === 0 ? (
        <div className='flex flex-col items-center justify-center h-full text-gray-400 p-8'>
          <svg className='w-16 h-16 mb-4' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={1.5}
              d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
            />
          </svg>
          <p className='text-center'>아직 대화 내역이 없습니다</p>
        </div>
      ) : (
        <div className='divide-y divide-gray-100'>
          {chatRooms.map((room) => {
            const isSelected = room.chatRoomId === selectedChatRoomId;
            const otherUserId = getOtherUserId(room);

            return (
              <button
                key={room.chatRoomId}
                onClick={() => onSelectChatRoom(room)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  isSelected ? "bg-blue-50 hover:bg-blue-50" : ""
                }`}
              >
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-gradient-to-br from-sky-400 to-sky-500 rounded-full flex items-center justify-center text-white font-semibold'>
                      {otherUserId.toString().slice(-2)}
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-1'>
                      <h3 className='font-semibold text-gray-900 truncate'>사용자 {otherUserId}</h3>
                      <span className='text-xs text-gray-500 flex-shrink-0 ml-2'>
                        {formatDistanceToNow(room.lastMessageTime)}
                      </span>
                    </div>
                    <div className='flex items-center justify-between'>
                      <p
                        className={`text-sm truncate ${
                          room.unreadCount > 0 ? "text-gray-900 font-medium" : "text-gray-500"
                        }`}
                      >
                        {room.lastMessage}
                      </p>
                      {room.unreadCount > 0 && (
                        <span className='flex-shrink-0 ml-2 px-2 py-0.5 text-xs font-semibold text-white bg-red-500 rounded-full'>
                          {room.unreadCount}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
