import { useEffect, useRef, useCallback, useState } from "react";
import WebSocketClient from "@/lib/websocket";
import type { WebSocketConfig } from "@/lib/websocket";

interface UseWebSocketOptions {
  url: string;
  reconnectDelay?: number;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
  debug?: boolean;
  autoConnect?: boolean;
}

interface UseWebSocketReturn {
  isConnected: boolean;
  connect: () => void;
  disconnect: () => void;
  subscribe: (destination: string, callback: (message: unknown) => void) => () => void;
  unsubscribe: (destination: string) => void;
  send: (destination: string, body: unknown, headers?: Record<string, string>) => void;
  subscriptions: string[];
}

export const useWebSocket = (options: UseWebSocketOptions): UseWebSocketReturn => {
  const {
    url,
    reconnectDelay = 5000,
    heartbeatIncoming = 20000,
    heartbeatOutgoing = 20000,
    debug = false,
    autoConnect = true,
  } = options;

  const clientRef = useRef<WebSocketClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [subscriptions, setSubscriptions] = useState<string[]>([]);

  useEffect(() => {
    const config: WebSocketConfig = {
      url,
      reconnectDelay,
      heartbeatIncoming,
      heartbeatOutgoing,
      debug,
    };

    clientRef.current = new WebSocketClient(config);

    return () => {
      if (clientRef.current) {
        clientRef.current.disconnect();
        clientRef.current = null;
      }
    };
  }, [url, reconnectDelay, heartbeatIncoming, heartbeatOutgoing, debug]);

  useEffect(() => {
    if (autoConnect && clientRef.current && !clientRef.current.isConnected()) {
      connect();
    }
  }, [autoConnect]);

  const connect = useCallback(() => {
    if (!clientRef.current) return;

    clientRef.current.connect(
      () => {
        setIsConnected(true);
      },
      (error) => {
        setIsConnected(false);
        console.error("Error:", error);
      }
    );
  }, []);

  const disconnect = useCallback(() => {
    if (clientRef.current) {
      clientRef.current.disconnect();
      setIsConnected(false);
      setSubscriptions([]);
    }
  }, []);

  const subscribe = useCallback((destination: string, callback: (message: unknown) => void) => {
    if (!clientRef.current) {
      return () => {};
    }

    const unsubscribeFn = clientRef.current.subscribe(destination, callback);

    setSubscriptions((prev) => {
      if (!prev.includes(destination)) {
        return [...prev, destination];
      }
      return prev;
    });

    return () => {
      unsubscribeFn();
      setSubscriptions((prev) => prev.filter((dest) => dest !== destination));
    };
  }, []);

  const unsubscribe = useCallback((destination: string) => {
    if (clientRef.current) {
      clientRef.current.unsubscribe(destination);
      setSubscriptions((prev) => prev.filter((dest) => dest !== destination));
    }
  }, []);

  const send = useCallback(
    (destination: string, body: unknown, headers?: Record<string, string>) => {
      if (clientRef.current) {
        clientRef.current.send(destination, body, headers);
      }
    },
    []
  );

  return {
    isConnected,
    connect,
    disconnect,
    subscribe,
    unsubscribe,
    send,
    subscriptions,
  };
};

export default useWebSocket;
