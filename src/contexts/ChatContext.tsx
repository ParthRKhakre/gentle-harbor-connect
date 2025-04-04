
import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "sonner";

type Message = {
  id: string;
  sender: string;
  content: string;
  timestamp: number;
  roomId: string;
};

type Room = {
  id: string;
  name: string;
  description: string;
  participants: number;
};

interface ChatContextType {
  messages: Message[];
  rooms: Room[];
  currentRoom: Room | null;
  sendMessage: (content: string, roomId: string, sender: string) => void;
  joinRoom: (roomId: string) => void;
  leaveRoom: () => void;
}

// Mock data for initial rooms
const INITIAL_ROOMS: Room[] = [
  {
    id: "room-1",
    name: "General Support",
    description: "A safe space for general mental health support and discussion.",
    participants: 12
  },
  {
    id: "room-2",
    name: "Anxiety Support",
    description: "Connect with others experiencing anxiety and share coping strategies.",
    participants: 8
  },
  {
    id: "room-3",
    name: "Depression Support",
    description: "A space to discuss depression and support each other through difficult times.",
    participants: 6
  },
  {
    id: "room-4",
    name: "Mindfulness Practice",
    description: "Join others in practicing mindfulness and meditation techniques.",
    participants: 4
  }
];

// Mock messages for each room
const INITIAL_MESSAGES: Record<string, Message[]> = {
  "room-1": [
    {
      id: "msg-1",
      sender: "Anonymous1",
      content: "Welcome to the General Support room! How is everyone doing today?",
      timestamp: Date.now() - 3600000,
      roomId: "room-1"
    },
    {
      id: "msg-2",
      sender: "Anonymous2",
      content: "I'm doing okay today. Better than yesterday at least.",
      timestamp: Date.now() - 3500000,
      roomId: "room-1"
    },
    {
      id: "msg-3",
      sender: "Anonymous3",
      content: "I'm struggling a bit with work stress, but I'm trying some new coping strategies.",
      timestamp: Date.now() - 3400000,
      roomId: "room-1"
    }
  ],
  "room-2": [
    {
      id: "msg-4",
      sender: "Anonymous4",
      content: "Does anyone have tips for managing anxiety before a big presentation?",
      timestamp: Date.now() - 7200000,
      roomId: "room-2"
    },
    {
      id: "msg-5",
      sender: "Anonymous5",
      content: "Deep breathing helps me a lot. 4 counts in, hold for 4, then 4 counts out.",
      timestamp: Date.now() - 7100000,
      roomId: "room-2"
    }
  ],
  "room-3": [
    {
      id: "msg-6",
      sender: "Anonymous6",
      content: "Having a really hard day today. Just wanted to check in with this community.",
      timestamp: Date.now() - 10800000,
      roomId: "room-3"
    },
    {
      id: "msg-7",
      sender: "Anonymous7",
      content: "I'm sorry you're struggling. We're here for you. What's been going on?",
      timestamp: Date.now() - 10700000,
      roomId: "room-3"
    }
  ],
  "room-4": [
    {
      id: "msg-8",
      sender: "Anonymous8",
      content: "Just finished a 10-minute meditation and feeling much calmer now.",
      timestamp: Date.now() - 14400000,
      roomId: "room-4"
    },
    {
      id: "msg-9",
      sender: "Anonymous9",
      content: "That's great! What meditation app or technique do you use?",
      timestamp: Date.now() - 14300000,
      roomId: "room-4"
    }
  ]
};

const ChatContext = createContext<ChatContextType | null>(null);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [rooms] = useState<Room[]>(INITIAL_ROOMS);
  const [currentRoom, setCurrentRoom] = useState<Room | null>(null);

  // In a real implementation, this would be handled by WebSockets
  const sendMessage = (content: string, roomId: string, sender: string) => {
    if (!content.trim()) return;
    
    const newMessage: Message = {
      id: `msg-${Date.now()}`,
      sender,
      content,
      timestamp: Date.now(),
      roomId
    };
    
    setMessages(prev => [...prev, newMessage]);
  };

  const joinRoom = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId);
    if (room) {
      setCurrentRoom(room);
      // In a real implementation, this would connect to a WebSocket room
      setMessages(INITIAL_MESSAGES[roomId] || []);
      toast.success(`Joined ${room.name}`);
    }
  };

  const leaveRoom = () => {
    setCurrentRoom(null);
    setMessages([]);
  };

  const value = {
    messages,
    rooms,
    currentRoom,
    sendMessage,
    joinRoom,
    leaveRoom
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export default ChatContext;
