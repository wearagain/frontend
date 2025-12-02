import { useState, useEffect, useRef, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PartyChatRoomList from "@/pages/chat/PartyChatRoomList";
import PartyChatRoom from "@/pages/chat/PartyChatRoom";
import { usePartyChatWebSocket } from "@/hooks/websocket/usePartyChatWebSocket";
import { axiosInstance } from "@/apis/axios-instance";

interface PartyChatMessage {
  partyChatRoomId: number;
  senderId: number;
  receiverId: number;
  type: string;
  content: string;
  fileUrl?: string;
  isRead: boolean;
  sendTime: string;
}

interface PartyChatRoomInfo {
  partyChatRoomId: number;
  partyId: string;
  userAId: number;
  userBId: number;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface PartyInfo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  location?: string;
  date?: string;
  hostId?: string;
}

interface PartyUnreadNotification {
  partyChatRoomId: number;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  senderId?: number;
}

interface PartyChatPageProps {
  currentUserId: number;
}

export default function PartyChatPage({ currentUserId }: PartyChatPageProps) {
  const { roomId } = useParams<{ roomId: string }>();
  const navigate = useNavigate();

  const [selectedPartyChatRoomId, setSelectedPartyChatRoomId] = useState<number | null>(null);
  const [selectedReceiverId, setSelectedReceiverId] = useState<number | null>(null);
  const [selectedPartyInfo, setSelectedPartyInfo] = useState<PartyInfo | null>(null);
  const [messages, setMessages] = useState<PartyChatMessage[]>([]);
  const [chatRooms, setChatRooms] = useState<PartyChatRoomInfo[]>([]);
  const [unreadCounts, setUnreadCounts] = useState<Record<number, number>>({});
  const [loading, setLoading] = useState(true);

  const listScrollRef = useRef<HTMLDivElement>(null);
  const selectedPartyChatRoomIdRef = useRef<number | null>(null);
  const isEnteringRoomRef = useRef(false);
  const currentUserIdRef = useRef(currentUserId);

  useEffect(() => {
    currentUserIdRef.current = currentUserId;
  }, [currentUserId]);

  useEffect(() => {
    selectedPartyChatRoomIdRef.current = selectedPartyChatRoomId;
  }, [selectedPartyChatRoomId]);

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
    () => (message: PartyChatMessage) => {
      if (message.partyChatRoomId === selectedPartyChatRoomIdRef.current) {
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
          room.partyChatRoomId === message.partyChatRoomId
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
    () => (notification: PartyUnreadNotification) => {
      setUnreadCounts((prev) => ({
        ...prev,
        [notification.partyChatRoomId]: notification.unreadCount,
      }));

      setChatRooms((prev) =>
        prev.map((room) => {
          if (room.partyChatRoomId === notification.partyChatRoomId) {
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

      if (notification.partyChatRoomId === selectedPartyChatRoomIdRef.current) {
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

  const { isConnected, connect, enterPartyChatRoom, leavePartyChatRoom, sendMessage } =
    usePartyChatWebSocket(websocketOptions);

  useEffect(() => {
    fetchPartyChatRooms();
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
      const room = chatRooms.find((r) => r.partyChatRoomId === roomIdNumber);

      if (room) {
        handleSelectPartyChatRoomInternal(room);
      }
    } else if (!roomId) {
      setSelectedPartyChatRoomId(null);
      setSelectedReceiverId(null);
      setMessages([]);
      isEnteringRoomRef.current = false;
    }
  }, [roomId, chatRooms]);

  const fetchPartyChatRooms = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get("/api/party-chat/rooms");
      const data = response.data;

      setChatRooms(data);

      const counts: Record<number, number> = {};
      data.forEach((room: PartyChatRoomInfo) => {
        counts[room.partyChatRoomId] = room.unreadCount;
      });
      setUnreadCounts(counts);
    } catch (error) {
      console.error("파티 채팅방 목록 조회 에러:", error);
      setChatRooms([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPartyInfo = async (partyId: string) => {
    try {
      const response = await axiosInstance.get(`/api/parties/${partyId}`);
      setSelectedPartyInfo(response.data);
    } catch (error) {
      console.error("파티 정보 조회 에러:", error);
      setSelectedPartyInfo(null);
    }
  };

  const handleSelectPartyChatRoom = (room: PartyChatRoomInfo) => {
    navigate(`/party-chat/${room.partyChatRoomId}`);
  };

  const handleSelectPartyChatRoomInternal = (room: PartyChatRoomInfo) => {
    const receiverId = room.userAId === currentUserId ? room.userBId : room.userAId;

    if (selectedPartyChatRoomId === room.partyChatRoomId && isEnteringRoomRef.current) {
      return;
    }

    setSelectedPartyChatRoomId(room.partyChatRoomId);
    setSelectedReceiverId(receiverId);
    setMessages([]);

    fetchPartyInfo(room.partyId);

    loadMessages(room.partyChatRoomId);

    if (isConnected && !isEnteringRoomRef.current) {
      enterPartyChatRoom(room.partyChatRoomId);
      isEnteringRoomRef.current = true;
    }
  };

  const handleBackToList = () => {
    if (isConnected && selectedPartyChatRoomId) {
      leavePartyChatRoom();
    }

    if (listScrollRef.current) {
      listScrollRef.current.scrollTop = 0;
    }
    window.scrollTo(0, 0);
    isEnteringRoomRef.current = false;

    setSelectedPartyInfo(null);

    fetchPartyChatRooms();

    navigate("/party-chat");
  };

  const loadMessages = async (partyChatRoomId: number) => {
    try {
      const response = await axiosInstance.get(`/api/party-chat/rooms/${partyChatRoomId}/messages`);
      setMessages(response.data);
    } catch (error) {
      console.error("파티 채팅 메시지 조회 에러:", error);
      setMessages([]);
    }
  };

  const handleSendMessage = (content: string) => {
    if (!selectedPartyChatRoomId || !selectedReceiverId) return;

    sendMessage({
      partyChatRoomId: selectedPartyChatRoomId,
      receiverId: selectedReceiverId,
      type: "TEXT",
      content,
    });
  };

  useEffect(() => {
    if (isConnected && selectedPartyChatRoomId && !isEnteringRoomRef.current) {
      enterPartyChatRoom(selectedPartyChatRoomId);
      isEnteringRoomRef.current = true;
    }
  }, [isConnected, selectedPartyChatRoomId, enterPartyChatRoom]);

  const totalUnreadCount = Object.values(unreadCounts).reduce((sum, count) => sum + count, 0);
  const showChatRoom = !!roomId;

  return (
    <div className='flex justify-center bg-gray-100 h-screen'>
      <div className='w-full max-w-md h-full flex flex-col'>
        {!showChatRoom && (
          <>
            <div className='flex-shrink-0 p-4 border-b border-gray-200 bg-white'>
              <div className='flex items-center justify-between mb-2'>
                <h1 className='text-xl font-bold text-gray-900'>파티 채팅</h1>
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
                <PartyChatRoomList
                  chatRooms={chatRooms}
                  selectedPartyChatRoomId={selectedPartyChatRoomId ?? undefined}
                  onSelectPartyChatRoom={handleSelectPartyChatRoom}
                  totalUnreadCount={totalUnreadCount}
                  currentUserId={currentUserId}
                />
              </div>
            )}
          </>
        )}

        {showChatRoom && (
          <div className='flex-1 flex flex-col bg-white overflow-hidden'>
            {selectedPartyChatRoomId && selectedReceiverId ? (
              <PartyChatRoom
                partyChatRoomId={selectedPartyChatRoomId}
                currentUserId={currentUserId}
                receiverId={selectedReceiverId}
                partyInfo={selectedPartyInfo}
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
