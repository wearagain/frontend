import { useState, useEffect, useRef } from "react";

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

interface PartyInfo {
  id: string;
  title: string;
  description?: string;
  category?: string;
  location?: string;
  date?: string;
  hostId?: string;
}

interface PartyChatRoomProps {
  partyChatRoomId: number;
  currentUserId: number;
  receiverId: number;
  partyInfo: PartyInfo | null;
  messages: PartyChatMessage[];
  onSendMessage: (content: string) => void;
  isConnected: boolean;
  onBack?: () => void;
}

export default function PartyChatRoom({
  partyChatRoomId,
  currentUserId,
  receiverId,
  partyInfo,
  messages,
  onSendMessage,
  isConnected,
  onBack,
}: PartyChatRoomProps) {
  const [inputMessage, setInputMessage] = useState("");
  const [isComposing, setIsComposing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (messagesContainerRef.current && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [partyChatRoomId]);

  const handleSendMessage = () => {
    if (!inputMessage.trim() || !isConnected) return;
    onSendMessage(inputMessage.trim());
    setInputMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey && !isComposing) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString("ko-KR", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className='w-full h-full bg-white flex flex-col'>
      {/* 파티 정보 배너 */}
      {partyInfo && (
        <div className='flex-shrink-0 bg-gradient-to-r from-[#7C31B4] to-[#9A4DDA] text-white p-4'>
          <div className='flex items-start gap-3'>
            <div className='flex-shrink-0'>
              <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z'
                />
              </svg>
            </div>
            <div className='flex-1 min-w-0'>
              <h3 className='font-semibold text-base truncate'>{partyInfo.title}</h3>
              <div className='flex items-center gap-3 mt-1 text-xs text-white/90'>
                {partyInfo.category && (
                  <span className='flex items-center gap-1'>
                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                      <path d='M7 3a1 1 0 000 2h6a1 1 0 100-2H7zM4 7a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1zM2 11a2 2 0 012-2h12a2 2 0 012 2v4a2 2 0 01-2 2H4a2 2 0 01-2-2v-4z' />
                    </svg>
                    {partyInfo.category}
                  </span>
                )}
                {partyInfo.location && (
                  <span className='flex items-center gap-1'>
                    <svg className='w-3 h-3' fill='currentColor' viewBox='0 0 20 20'>
                      <path
                        fillRule='evenodd'
                        d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z'
                        clipRule='evenodd'
                      />
                    </svg>
                    {partyInfo.location}
                  </span>
                )}
              </div>
              {partyInfo.date && (
                <p className='text-xs text-white/80 mt-1'>
                  {new Date(partyInfo.date).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* 채팅 헤더 */}
      <div className='flex-shrink-0 flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
        <div className='flex items-center gap-3'>
          {onBack && (
            <button
              type='button'
              onClick={onBack}
              className='p-2 hover:bg-gray-100 rounded-full transition-colors'
              aria-label='뒤로가기'
            >
              <svg
                className='w-6 h-6 text-gray-700'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M15 19l-7-7 7-7'
                />
              </svg>
            </button>
          )}
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>파티 호스트 {receiverId}</h2>
            <p className='text-sm text-gray-500'>{isConnected ? "온라인" : "오프라인"}</p>
          </div>
        </div>
        <div className='flex items-center gap-2'>
          <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500" : "bg-red-500"}`} />
          <span className='text-sm text-gray-600'>{isConnected ? "연결됨" : "연결 끊김"}</span>
        </div>
      </div>

      <div
        ref={messagesContainerRef}
        className='flex-1 overflow-y-auto p-4 bg-gray-50'
        style={{ minHeight: 0 }}
      >
        {messages.length === 0 ? (
          <div className='flex items-center justify-center h-full'>
            <p className='text-gray-500'>메시지가 없습니다. 첫 메시지를 보내보세요!</p>
          </div>
        ) : (
          <div className='space-y-4 pb-32'>
            {messages.map((message, index) => {
              const isMyMessage = String(message.senderId) === String(currentUserId);

              return (
                <div
                  key={index}
                  className={`flex ${isMyMessage ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {!isMyMessage && (
                    <div className='w-8 h-8 rounded-full bg-gradient-to-br from-[#7C31B4] to-[#9A4DDA] flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold'>
                      {receiverId.toString().slice(-2)}
                    </div>
                  )}

                  <div className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[260px] px-4 py-2 rounded-2xl ${
                        isMyMessage
                          ? "bg-[#B57BE8] text-white rounded-br-sm"
                          : "bg-white text-gray-800 rounded-bl-sm shadow-sm"
                      }`}
                    >
                      <p className='whitespace-pre-wrap break-words'>{message.content}</p>
                    </div>
                    <div className='flex items-center gap-1 mt-1 px-2'>
                      <span className='text-xs text-gray-500'>{formatTime(message.sendTime)}</span>
                      {isMyMessage && (
                        <span className='text-xs text-gray-500'>
                          {message.isRead ? "읽음" : "안읽음"}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div className='flex-shrink-0 p-4 bg-white border-t border-gray-200'>
        <div className='flex items-end gap-2'>
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
            className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#7C31B4] resize-none'
            rows={1}
            disabled={!isConnected}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            type='button'
            onClick={handleSendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            className='px-6 py-3 bg-[#7C31B4] text-white rounded-lg hover:bg-[#9A4DDA] disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
          >
            <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M12 19l9 2-9-18-9 18 9-2zm0 0v-8'
              />
            </svg>
          </button>
        </div>
        <p className='text-xs text-gray-500 mt-2'>Enter로 전송, Shift+Enter로 줄바꿈</p>
      </div>
    </div>
  );
}
