// utils/kickWS.ts
type MessageCallback = (verified: boolean) => void;

interface ChatMessage {
  type: string;
  content: string;
  sender: { id: string };
}

class KickWebSocket {
  private kickWS: WebSocket | null = null;
  private pingInterval: NodeJS.Timeout | null = null;
  private reconnectAttempts: number = 0;
  private readonly maxReconnectAttempts: number = 5;
  private readonly maxReconnectDuration: number = 600000; // 10 minutes
  private connectionErrorFlag: boolean = false;
  private messageCallback: MessageCallback | null = null;
  private verificationCode: string = ""; // Store the verification code
  private chatroomId: string = "";
  private expectedSenderId: string = "";

  constructor(
    botChatroomId: string,
    code: string,
    expectedSenderId: string,
    onMessageReceived: MessageCallback,
  ) {
    this.chatroomId = botChatroomId;
    this.messageCallback = onMessageReceived;
    this.verificationCode = code;
    this.expectedSenderId = expectedSenderId;
    this.connectWebSocket();
  }

  private connectWebSocket(): void {
    if (this.connectionErrorFlag) {
      console.log("Connection error detected. Skipping reconnection attempts.");
      return;
    }

    const kickWSUri = `wss://ws-us2.pusher.com/app/32cbd69e4b950bf97679?protocol=7&client=js&version=7.6.0&flash=false`;

    try {
      this.kickWS = new WebSocket(kickWSUri);

      this.kickWS.addEventListener("open", () => this.handleWebSocketOpen());
      this.kickWS.addEventListener("error", () => this.handleWebSocketError());
      this.kickWS.addEventListener("close", (event) => this.handleWebSocketClose(event));
      this.kickWS.addEventListener("message", (event) => this.handleWebSocketMessage(event));

      console.log("WebSocket connection opened.");
    } catch (error) {
      console.error("Error initializing WebSocket:", error);
      this.handleConnectionFailure();
    }
  }

  private handleWebSocketOpen(): void {
    console.log("WebSocket opened, subscribing to chatroom:", this.chatroomId);

    this.kickWS?.send(
      JSON.stringify({
        event: "pusher:subscribe",
        data: { auth: "", channel: `chatrooms.${this.chatroomId}.v2` }
      })
    );

    // Start ping-pong mechanism
    this.pingInterval = setInterval(() => {
      this.kickWS?.send(JSON.stringify({ event: "pusher:ping", data: {} }));
    }, 60000); // Ping every 60 seconds
  }

  private handleWebSocketMessage(event: MessageEvent): void {
    try {
      const messageData = JSON.parse(event.data);

      if (messageData.event === "pusher:pong") {
        console.log("Pong received from server");
        return;
      }

      if (!messageData.data) return;

      const chatMessageData: ChatMessage = JSON.parse(messageData.data);
      this.checkForKickEvents(chatMessageData);
    } catch (error) {
      console.error("Error handling WebSocket message:", error);
    }
  }

  private checkForKickEvents(messageData: ChatMessage): void {
    if (messageData.type === "message") {
      this.handleKMessageEvent(messageData);
    }
  }

  private handleKMessageEvent(messageData: ChatMessage): void {
    const { content, sender } = messageData;
    console.log(content);

    if (content.includes(this.verificationCode)) {
      console.log("Verification code found in message!");

      if (sender.id === this.expectedSenderId) {
        console.log("Sender is verified.");
        this.messageCallback?.(true);
      } else {
        console.log("Sender ID does not match the expected value.");
      }
    } else {
      console.log("Message does not contain the verification code.");
    }
  }

  private handleWebSocketClose(event: CloseEvent): void {
    console.log("WebSocket closed:", event);

    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }

    this.kickWS?.close();

    if (!event.code || event.code === 1006) {
      this.handleConnectionFailure();
    }
  }

  private handleWebSocketError(): void {
    console.log("WebSocket error. Reconnecting...");
    this.handleConnectionFailure();
  }

  private handleConnectionFailure(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      const retryDelay = Math.min(30000, 2000 * Math.pow(2, this.reconnectAttempts)); // Exponential backoff
      this.reconnectAttempts += 1;
      setTimeout(() => this.connectWebSocket(), retryDelay);
    } else {
      console.log("Max reconnect attempts reached. Please try again later.");
      this.kickWS?.close();
    }
  }

  public close(): void {
    // Cleanup WebSocket connection
    if (this.kickWS) {
      this.kickWS.close();
      this.kickWS = null;
    }
    
    // Clear ping interval
    if (this.pingInterval) {
      clearInterval(this.pingInterval);
      this.pingInterval = null;
    }
    
    // Reset reconnect attempts
    this.reconnectAttempts = 0;
  }

  // Public method to allow external subscription to messages
  public subscribeToMessages(callback: MessageCallback): void {
    this.messageCallback = callback;
  }
}

export default KickWebSocket;
