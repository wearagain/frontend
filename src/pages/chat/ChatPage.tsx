import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import ChatRoomList from "@/pages/chat/ChatRoomList";
import ChatRoom from "@/pages/chat/ChatRoom";
import { useChatWebSocket } from "@/hooks/websocket/useChatWebSocket";
import { axiosInstance } from "@/apis/axios-instance";

interface ChatMessage {
  chatRoomId: number;
  senderId: number;
  receiverId: number;
  type: string;
  content: string;
  fileUrl?: string;
  isRead: boolean;
  sendTime: string;
}

interface ChatRoomInfo {
  chatRoomId: number;
  userAId: number;
  userBId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface UnreadNotification {
  chatRoomId: number;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  senderId?: number;
}

interface ChatPageProps {
  currentUserId: number;
}

export default function ChatPage({ currentUserId }: ChatPageProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [selectedChatRoomId, setSelectedChatRoomId] = useState<number | null>(null);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<ChatRoomInfo[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const listScrollRef = useRef<HTMLDivElement>(null);
  const selectedChatRoomIdRef = useRef<number | null>(null);
  const isEnteringRoomRef = useRef(false);
  const currentUserIdRef = useRef(currentUserId);

  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    selectedChatRoomIdRef.current = selectedChatRoomId;
  }, [selectedChatRoomId]);

  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    return () => {
      if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
        window.history.scrollRestoration = "auto";
      }
    };
  }, []);

  const handleMessage = useMemo(
    () => (message: ChatMessage) => {
      if (message.chatRoomId === selectedChatRoomIdRef.current) {
        setMessages((prev) => {
          const isDuplicate = prev.some(
            (msg) =>
              msg.content === message.content &&
              msg.sendTime === message.sendTime &&
              msg.senderId === message.senderId
          );
          if (isDuplicate) {
            return prev;
          }
          return [...prev, message];
        });
      }

      setChatRooms((prev) => {
        return prev.map((room) =>
          room.chatRoomId === message.chatRoomId
            ? {
                ...room,
                lastMessage: message.content,
                lastMessageTime: message.sendTime,
              }
            : room
        );
      });
    },
    []
  );

  const handleUnreadUpdate = useMemo(
    () => (notification: UnreadNotification) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [notification.chatRoomId]: notification.unreadCount,
      }));

      setChatRooms((prev) =>
        prev.map((room) => {
          if (room.chatRoomId === notification.chatRoomId) {
            return {
              ...room,
              unreadCount: notification.unreadCount,
              ...(notification.lastMessage && { lastMessage: notification.lastMessage }),
              ...(notification.lastMessageTime && {
                lastMessageTime: notification.lastMessageTime,
              }),
            };
          }
          return room;
        })
      );

      if (notification.chatRoomId === selectedChatRoomIdRef.current) {
        setMessages((prev) =>
          prev.map((msg) => {
            if (msg.senderId === currentUserIdRef.current) {
              return { ...msg, isRead: true };
            }
            return msg;
          })
        );
      }
    },
    []
  );

  const websocketOptions = useMemo(
    () => ({
      userId: currentUserId,
      onMessage: handleMessage,
      onUnreadUpdate: handleUnreadUpdate,
      autoConnect: false,
    }),
    [currentUserId, handleMessage, handleUnreadUpdate]
  );

  const { isConnected, connect, enterChatRoom, leaveChatRoom, sendMessage } =
    useChatWebSocket(websocketOptions);

  useEffect(() => {
    fetchChatRooms();
    const timer = setTimeout(() => connect(), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!roomId && listScrollRef.current) {
      listScrollRef.current.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId && chatRooms.length > 0) {
      const roomIdNumber = parseInt(roomId, 10);
      const room = chatRooms.find((r) => r.chatRoomId === roomIdNumber);

      if (room) {
        handleSelectChatRoomInternal(room);
      }
    } else if (!roomId) {
      setSelectedChatRoomId(null);
      setSelectedReceiverId(null);
      setMessages([]);
      isEnteringRoomRef.current = false;
    }
  }, [roomId, chatRooms]);

  const fetchChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/chat/rooms");
      const data = response.data;

      setChatRooms(data);

      const counts: Record<number, number> = {};
      data.forEach((room: ChatRoomInfo) => {
        counts[room.chatRoomId] = room.unreadCount;
      });
      setUnreadCounts(counts);
    } catch (error) {
      console.error("에러:", error);
      setChatRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectChatRoom = (room: ChatRoomInfo) => {
    navigate(`/chat/${room.chatRoomId}`);
  };

  const handleSelectChatRoomInternal = (room: ChatRoomInfo) => {
    const receiverId = room.userAId === currentUserId ? room.userBId : room.userAId;

    if (selectedChatRoomId === room.chatRoomId && isEnteringRoomRef.current) {
      return;
    }

    setSelectedChatRoomId(room.chatRoomId);
    setSelectedReceiverId(receiverId);
    setMessages([]);
    loadMessages(room.chatRoomId);

    if (isConnected && !isEnteringRoomRef.current) {
      enterChatRoom(room.chatRoomId);
      isEnteringRoomRef.current = true;
    }
  };

  const handleBackToList = () => {
    if (isConnected && selectedChatRoomId) {
      leaveChatRoom();
    }

    if (listScrollRef.current) {
      listScrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    isEnteringRoomRef.current = false;

    fetchChatRooms();

    navigate("/chat");
  };

  const loadMessages = async (chatRoomId: number) => {
    try {
      const response = await axiosInstance.get(`/api/chat/rooms/${chatRoomId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("에러:", error);
      setMessages([]);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedChatRoomId || !selectedReceiverId) return;

    sendMessage({
      chatRoomId: selectedChatRoomId,
      receiverId: selectedReceiverId,
      type: "TEXT",
      content,
    });
  };

  useEffect(() => {
    if (isConnected && selectedChatRoomId && !isEnteringRoomRef.current) {
      enterChatRoom(selectedChatRoomId);
      isEnteringRoomRef.current = true;
    }
  }, [isConnected, selectedChatRoomId, enterChatRoom]);

  const totalUnreadCount = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  const showChatRoom = !!roomId;

  return (
    <div className='flex justify-center bg-gray-100 h-screen'>
      <div className='w-full max-w-md h-full flex flex-col'>
        {!showChatRoom && (
          <>
            <div className='flex-shrink-0 p-4 border-b border-gray-200 bg-white'>
              <div className='flex items-center justify-between mb-2'>
                <h1 className='text-xl font-bold text-gray-900'>채팅</h1>
                {totalUnreadCount > 0 && (
                  <span className='px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-full'>
                    {totalUnreadCount}
                  </span>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <div
                  className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`}
                />
                <span className='text-sm text-gray-600'>
                  {isConnected ? "연결됨" : "연결 끊김"}
                </span>
              </div>
            </div>

            {loading ? (
              <div className='flex-1 flex items-center justify-center bg-white'>
                <div className='text-gray-500'>로딩 중...</div>
              </div>
            ) : (
              <div ref={listScrollRef} className='flex-1 overflow-y-auto bg-white'>
                <ChatRoomList
                  chatRooms={chatRooms}
                  selectedChatRoomId={selectedChatRoomId ?? undefined}
                  onSelectChatRoom={handleSelectChatRoom}
                  totalUnreadCount={totalUnreadCount}
                  currentUserId={currentUserId}
                />
              </div>
            )}
          </>
        )}

        {showChatRoom && (
          <div className='flex-1 flex flex-col bg-white overflow-hidden'>
            {selectedChatRoomId && selectedReceiverId ? (
              <ChatRoom
                chatRoomId={selectedChatRoomId}
                currentUserId={currentUserId}
                receiverId={selectedReceiverId}
                messages={messages}
                onSendMessage={handleSendMessage}
                isConnected={isConnected}
                onBack={handleBackToList}
              />
            ) : (
              <div className='flex-1 flex items-center justify-center text-gray-400 bg-white'>
                <div className='text-center'>
                  <svg
                    className='w-24 h-24 mx-auto mb-4'
                    fill='none'
                    stroke='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      strokeWidth={1.5}
                      d='M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z'
                    />
                  </svg>
                  <p className='text-lg font-medium'>채팅방을 불러오는 중...</p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
