import { useState, useEffect, useRef } from "react";

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

interface ChatRoomProps {
  chatRoomId: number;
  currentUserId: number;
  receiverId: number;
  messages: ChatMessage[];
  onSendMessage: (content: string) => void;
  isConnected: boolean;
  onBack?: () => void;
}

export default function ChatRoom({
  chatRoomId,
  currentUserId,
  receiverId,
  messages,
  onSendMessage,
  isConnected,
  onBack,
}: ChatRoomProps) {
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
  }, [chatRoomId]);

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
    <div className='fixed h-full right-0 left-0 bg-white flex flex-col max-w-[430px] top-0 mx-auto'>
      <div className='sticky top-0 w-full flex items-center justify-between p-4 border-b border-gray-200 bg-white'>
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
            <h2 className='text-lg font-semibold text-gray-900'>사용자 {receiverId}</h2>
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
          <div className='space-y-4'>
            {messages.map((message, index) => {
              const isMyMessage = String(message.senderId) === String(currentUserId);

              return (
                <div
                  key={index}
                  className={`flex ${isMyMessage ? "justify-end" : "justify-start"} items-end gap-2`}
                >
                  {!isMyMessage && (
                    <div className='w-8 h-8 rounded-full bg-gradient-to-br from-sky-400 to-sky-500 flex-shrink-0 flex items-center justify-center text-white text-xs font-semibold'>
                      {receiverId.toString().slice(-2)}
                    </div>
                  )}

                  <div className={`flex flex-col ${isMyMessage ? "items-end" : "items-start"}`}>
                    <div
                      className={`max-w-[260px] px-4 py-2 rounded-2xl ${
                        isMyMessage
                          ? "bg-sky-300 text-white rounded-br-sm"
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

      <div className='sticky bottom-0 items-end w-full p-4 bg-white border-t border-gray-200'>
        <div className='flex items-end gap-2'>
          <textarea
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onCompositionStart={() => setIsComposing(true)}
            onCompositionEnd={() => setIsComposing(false)}
            placeholder={isConnected ? "메시지를 입력하세요..." : "연결 중..."}
            className='flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-400 resize-none'
            rows={1}
            disabled={!isConnected}
            style={{ minHeight: "48px", maxHeight: "120px" }}
          />
          <button
            type='button'
            onClick={handleSendMessage}
            disabled={!isConnected || !inputMessage.trim()}
            className='px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors'
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
