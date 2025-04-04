
import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Send } from "lucide-react";
import { format } from "date-fns";

const ChatBox = () => {
  const { messages, currentRoom, sendMessage, leaveRoom } = useChat();
  const { user } = useAuth();
  const [messageText, setMessageText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom of messages on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!messageText.trim() || !user || !currentRoom) return;
    
    sendMessage(
      messageText,
      currentRoom.id,
      user.username
    );
    setMessageText("");
  };

  if (!currentRoom) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] p-8 text-center">
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
          <MessageCircleIcon className="h-8 w-8 text-primary/50" />
        </div>
        <h3 className="text-xl font-medium mb-2">No Room Selected</h3>
        <p className="text-muted-foreground max-w-md mb-6">
          Select a room from the list to join the conversation and start chatting with others.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-[70vh] border rounded-lg overflow-hidden bg-card">
      <div className="p-4 border-b flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={leaveRoom}
            className="md:hidden"
          >
            <ArrowLeft size={18} />
          </Button>
          <div>
            <h3 className="font-medium">{currentRoom.name}</h3>
            <p className="text-xs text-muted-foreground">{currentRoom.description}</p>
          </div>
        </div>
      </div>
      
      <div className="flex-grow overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isCurrentUser = user?.username === message.sender;
          
          return (
            <div
              key={message.id}
              className={`flex ${isCurrentUser ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[80%] rounded-lg px-4 py-2 ${
                  isCurrentUser
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-medium">
                    {isCurrentUser ? "You" : message.sender}
                  </span>
                  <span className="text-xs opacity-70">
                    {format(new Date(message.timestamp), "HH:mm")}
                  </span>
                </div>
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex space-x-2"
        >
          <Input
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow"
          />
          <Button type="submit" size="icon">
            <Send size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
};

// Message Circle Icon component
const MessageCircleIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
  </svg>
);

export default ChatBox;
