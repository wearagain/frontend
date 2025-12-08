import { useEffect, useCallback, useState, useRef } from "react";
import { useWebSocket } from "./useWebSocket";

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

interface UnreadNotification {
  chatRoomId: number;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  senderId?: number;
}

interface SendMessagePayload {
  chatRoomId: number;
  receiverId: number;
  type: string;
  content: string;
  fileUrl?: string;
}

interface UseChatWebSocketOptions {
  userId: number;
  onMessage?: (message: ChatMessage) => void;
  onUnreadUpdate?: (notification: UnreadNotification) => void;
  autoConnect?: boolean;
}

interface UseChatWebSocketReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  enterChatRoom: (chatRoomId: number) => void;
  leaveChatRoom: () => void;
  sendMessage: (message: SendMessagePayload) => void;
  currentChatRoom: number | null;
}

export const useChatWebSocket = ({
  userId,
  onMessage,
  onUnreadUpdate,
  autoConnect = false,
}: UseChatWebSocketOptions): UseChatWebSocketReturn => {
  const [currentChatRoom, setCurrentChatRoom] = useState<number | null>(null);
  const roomUnsubRef = useRef<(() => void) | null>(null);
  const unreadUnsubRef = useRef<(() => void) | null>(null);
  const currentChatRoomRef = useRef<number | null>(null);

  const onMessageRef = useRef(onMessage);
  const onUnreadUpdateRef = useRef(onUnreadUpdate);

  useEffect(() => {
    currentChatRoomRef.current = currentChatRoom;
  }, [currentChatRoom]);

  useEffect(() => {
    onMessageRef.current = onMessage;
    onUnreadUpdateRef.current = onUnreadUpdate;
  }, [onMessage, onUnreadUpdate]);

  const { isConnected, connect, disconnect, subscribe, send } = useWebSocket({
    url: "http://localhost:8080/ws-chat",
    autoConnect,
    debug: import.meta.env.DEV,
  });

  useEffect(() => {
    if (!isConnected || !userId || unreadUnsubRef.current) {
      return;
    }

    unreadUnsubRef.current = subscribe(`/topic/user/${userId}/unread`, (data: unknown) => {
      onUnreadUpdateRef.current?.(data as UnreadNotification);
    });

    return () => {
      if (unreadUnsubRef.current) {
        unreadUnsubRef.current();
        unreadUnsubRef.current = null;
      }
    };
  }, [isConnected, userId, subscribe]);

  const enterChatRoom = useCallback(
    (chatRoomId: number) => {
      if (!isConnected) {
        return;
      }

      if (roomUnsubRef.current) {
        roomUnsubRef.current();
        roomUnsubRef.current = null;
      }

      roomUnsubRef.current = subscribe(`/topic/chatroom/${chatRoomId}`, (msg: unknown) => {
        onMessageRef.current?.(msg as ChatMessage);
      });

      send(`/app/chat/enter/${chatRoomId}`, {});
      setCurrentChatRoom(chatRoomId);
    },
    [isConnected, subscribe, send]
  );

  const leaveChatRoom = useCallback(() => {
    if (currentChatRoomRef.current && isConnected) {
      send(`/app/chat/leave/${currentChatRoomRef.current}`, {});
    }

    if (roomUnsubRef.current) {
      roomUnsubRef.current();
      roomUnsubRef.current = null;
    }

    setCurrentChatRoom(null);
  }, [isConnected, send]);

  const sendMessage = useCallback(
    (message: SendMessagePayload) => {
      if (!isConnected) {
        return;
      }
      send("/app/chat/send", message);
    },
    [isConnected, send]
  );

  useEffect(() => {
    return () => {
      if (currentChatRoomRef.current && roomUnsubRef.current) {
        if (isConnected) {
          send(`/app/chat/leave/${currentChatRoomRef.current}`, {});
        }
        roomUnsubRef.current();
        roomUnsubRef.current = null;
      }

      if (unreadUnsubRef.current) {
        unreadUnsubRef.current();
        unreadUnsubRef.current = null;
      }
    };
  }, []);

  return {
    isConnected,
    connect,
    disconnect,
    enterChatRoom,
    leaveChatRoom,
    sendMessage,
    currentChatRoom,
  };
};
