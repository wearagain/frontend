interface PartyChatRoomInfo {
  partyChatRoomId: number;
  partyId: string;
  userAId: number;
  userBId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface PartyChatRoomListProps {
  chatRooms: PartyChatRoomInfo[];
  selectedPartyChatRoomId?: number;
  onSelectPartyChatRoom: (room: PartyChatRoomInfo) => void;
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

export default function PartyChatRoomList({
  chatRooms,
  selectedPartyChatRoomId,
  onSelectPartyChatRoom,
  currentUserId,
}: PartyChatRoomListProps) {
  const getOtherUserId = (room: PartyChatRoomInfo) => {
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
              d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
            />
          </svg>
          <p className='text-center'>아직 파티 채팅 내역이 없습니다</p>
          <p className='text-sm text-gray-400 mt-2'>파티에 참여하여 호스트와 대화해보세요</p>
        </div>
      ) : (
        <div className='divide-y divide-gray-100'>
          {chatRooms.map((room) => {
            const isSelected = room.partyChatRoomId === selectedPartyChatRoomId;
            const otherUserId = getOtherUserId(room);

            return (
              <button
                key={room.partyChatRoomId}
                onClick={() => onSelectPartyChatRoom(room)}
                className={`w-full p-4 text-left hover:bg-gray-50 transition-colors ${
                  isSelected ? "bg-blue-50 hover:bg-blue-50" : ""
                }`}
              >
                <div className='flex items-start gap-3'>
                  <div className='flex-shrink-0'>
                    <div className='w-12 h-12 bg-gradient-to-br from-[#7C31B4] to-[#9A4DDA] rounded-full flex items-center justify-center text-white font-semibold'>
                      {otherUserId.toString().slice(-2)}
                    </div>
                  </div>

                  <div className='flex-1 min-w-0'>
                    <div className='flex items-center justify-between mb-1'>
                      <h3 className='font-semibold text-gray-900 truncate'>
                        파티 호스트 {otherUserId}
                      </h3>
                      <span className='text-xs text-gray-500 flex-shrink-0 ml-2'>
                        {formatDistanceToNow(room.lastMessageTime)}
                      </span>
                    </div>
                    <div className='flex items-center justify-between mb-1'>
                      <span className='text-xs text-gray-500 truncate'>
                        파티 ID: {room.partyId}
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
