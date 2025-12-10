import { Client } from "@stomp/stompjs";
import type { StompSubscription, IMessage } from "@stomp/stompjs";
import SockJS from "sockjs-client";

export interface WebSocketConfig {
  url: string;
  reconnectDelay?: number;
  heartbeatIncoming?: number;
  heartbeatOutgoing?: number;
  debug?: boolean;
}

function getCsrfTokenFromCookie(): string | null {
  const name = "XSRF-TOKEN=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookies = decodedCookie.split(";");

  for (let cookie of cookies) {
    cookie = cookie.trim();
    if (cookie.indexOf(name) === 0) {
      return cookie.substring(name.length);
    }
  }
  return null;
}

class WebSocketClient {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();
  private config: WebSocketConfig;
  private isConnecting: boolean = false;
  private reconnectAttempts: number = 0;
  private maxReconnectAttempts: number = 5;

  constructor(config: WebSocketConfig) {
    this.config = {
      reconnectDelay: 5000,
      heartbeatIncoming: 20000,
      heartbeatOutgoing: 20000,
      debug: false,
      ...config,
    };
  }

  connect(onConnect?: () => void, onError?: (error: unknown) => void): void {
    if (this.client?.connected || this.isConnecting) {
      return;
    }

    this.isConnecting = true;

    const csrfToken = getCsrfTokenFromCookie();

    this.client = new Client({
      webSocketFactory: () => new SockJS(this.config.url),

      reconnectDelay: this.config.reconnectDelay,
      heartbeatIncoming: this.config.heartbeatIncoming,
      heartbeatOutgoing: this.config.heartbeatOutgoing,

      connectHeaders: csrfToken
        ? {
            "X-XSRF-TOKEN": csrfToken,
          }
        : {},

      debug: this.config.debug ? (str) => console.log(str) : undefined,

      onConnect: () => {
        console.log("연결 완");
        this.isConnecting = false;
        this.reconnectAttempts = 0;
        onConnect?.();
      },

      onStompError: (frame) => {
        this.isConnecting = false;
        onError?.(frame);
      },

      onWebSocketError: (event) => {
        this.isConnecting = false;
        onError?.(event);
      },

      onDisconnect: () => {
        console.log("연결 끝");
        this.isConnecting = false;

        if (this.reconnectAttempts < this.maxReconnectAttempts) {
          this.reconnectAttempts++;
          setTimeout(() => {
            this.connect(onConnect, onError);
          }, this.config.reconnectDelay);
        }
      },
    });

    this.client.activate();
  }

  disconnect(): void {
    if (this.client) {
      this.subscriptions.forEach((subscription) => subscription.unsubscribe());
      this.subscriptions.clear();
      this.client.deactivate();
      this.client = null;
      this.isConnecting = false;
    }
  }

  subscribe<T = unknown>(destination: string, callback: (message: T) => void): () => void {
    if (!this.client?.connected) {
      return () => {};
    }

    if (this.subscriptions.has(destination)) {
      return () => this.unsubscribe(destination);
    }

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      try {
        const data = JSON.parse(message.body) as T;
        callback(data);
      } catch (error) {
        console.error("Error:", error);
        callback(message.body as T);
      }
    });

    this.subscriptions.set(destination, subscription);
    return () => this.unsubscribe(destination);
  }

  unsubscribe(destination: string): void {
    const subscription = this.subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      this.subscriptions.delete(destination);
    }
  }

  send<T = unknown>(destination: string, body: T, headers?: Record<string, string>): void {
    if (!this.client?.connected) {
      return;
    }

    try {
      const csrfToken = getCsrfTokenFromCookie();
      const sendHeaders = {
        ...headers,
        ...(csrfToken ? { "X-XSRF-TOKEN": csrfToken } : {}),
      };

      this.client.publish({
        destination,
        body: JSON.stringify(body),
        headers: sendHeaders,
      });
    } catch (error) {
      console.error("Error:", error);
    }
  }

  isConnected(): boolean {
    return this.client?.connected ?? false;
  }

  getSubscriptions(): string[] {
    return Array.from(this.subscriptions.keys());
  }
}

export default WebSocketClient;
