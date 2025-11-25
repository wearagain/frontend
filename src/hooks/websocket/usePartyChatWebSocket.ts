import { useEffect, useCallback, useState, useRef } from "react";
import { useWebSocket } from "./useWebSocket";

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

interface PartyUnreadNotification {
  partyChatRoomId: number;
  unreadCount: number;
  lastMessage?: string;
  lastMessageTime?: string;
  senderId?: number;
}

interface SendPartyMessagePayload {
  partyChatRoomId: number;
  receiverId: number;
  type: string;
  content: string;
  fileUrl?: string;
}

interface UsePartyChatWebSocketOptions {
  userId: number;
  onMessage?: (message: PartyChatMessage) => void;
  onUnreadUpdate?: (notification: PartyUnreadNotification) => void;
  autoConnect?: boolean;
}

interface UsePartyChatWebSocketReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  enterPartyChatRoom: (partyChatRoomId: number) => void;
  leavePartyChatRoom: () => void;
  sendMessage: (message: SendPartyMessagePayload) => void;
  currentPartyChatRoom: number | null;
}

export const usePartyChatWebSocket = ({
  userId,
  onMessage,
  onUnreadUpdate,
  autoConnect = false,
}: UsePartyChatWebSocketOptions): UsePartyChatWebSocketReturn => {
  const [currentPartyChatRoom, setCurrentPartyChatRoom] = useState<number | null>(null);
  const roomUnsubRef = useRef<(() => void) | null>(null);
  const unreadUnsubRef = useRef<(() => void) | null>(null);
  const currentPartyChatRoomRef = useRef<number | null>(null);

  const onMessageRef = useRef(onMessage);
  const onUnreadUpdateRef = useRef(onUnreadUpdate);

  useEffect(() => {
    currentPartyChatRoomRef.current = currentPartyChatRoom;
  }, [currentPartyChatRoom]);

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

    unreadUnsubRef.current = subscribe(`/topic/user/${userId}/party-unread`, (data: unknown) => {
      onUnreadUpdateRef.current?.(data as PartyUnreadNotification);
    });

    return () => {
      if (unreadUnsubRef.current) {
        unreadUnsubRef.current();
        unreadUnsubRef.current = null;
      }
    };
  }, [isConnected, userId, subscribe]);

  const enterPartyChatRoom = useCallback(
    (partyChatRoomId: number) => {
      if (!isConnected) {
        return;
      }

      if (roomUnsubRef.current) {
        roomUnsubRef.current();
        roomUnsubRef.current = null;
      }

      roomUnsubRef.current = subscribe(
        `/topic/party-chatroom/${partyChatRoomId}`,
        (msg: unknown) => {
          onMessageRef.current?.(msg as PartyChatMessage);
        }
      );

      send(`/app/party/enter/${partyChatRoomId}`, {});
      setCurrentPartyChatRoom(partyChatRoomId);
    },
    [isConnected, subscribe, send]
  );

  const leavePartyChatRoom = useCallback(() => {
    if (currentPartyChatRoomRef.current && isConnected) {
      send(`/app/party/leave/${currentPartyChatRoomRef.current}`, {});
    }

    if (roomUnsubRef.current) {
      roomUnsubRef.current();
      roomUnsubRef.current = null;
    }

    setCurrentPartyChatRoom(null);
  }, [isConnected, send]);

  const sendMessage = useCallback(
    (message: SendPartyMessagePayload) => {
      if (!isConnected) {
        return;
      }
      send("/app/party/send", message);
    },
    [isConnected, send]
  );

  useEffect(() => {
    return () => {
      if (currentPartyChatRoomRef.current && roomUnsubRef.current) {
        if (isConnected) {
          send(`/app/party/leave/${currentPartyChatRoomRef.current}`, {});
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
    enterPartyChatRoom,
    leavePartyChatRoom,
    sendMessage,
    currentPartyChatRoom,
  };
};
