
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { useAuth } from "@/contexts/AuthContext";
import ChatRoomCard from "@/components/ChatRoomCard";
import ChatBox from "@/components/ChatBox";
import { Link } from "react-router-dom";
import { MessageCircle, AlertTriangle } from "lucide-react";

const ChatPage = () => {
  const { rooms, currentRoom } = useChat();
  const { user } = useAuth();
  const [showRooms, setShowRooms] = useState(true);

  if (!user) {
    return (
      <div className="container max-w-4xl mx-auto px-4 py-8">
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 rounded">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Authentication Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>
                  You need to be signed in to use the chat feature. Please sign in or create an account.
                </p>
              </div>
              <div className="mt-4 flex space-x-3">
                <Link to="/login">
                  <Button size="sm" variant="outline">
                    Sign In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">
                    Create Account
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
        
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
            <MessageCircle className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Community Chat Rooms</h2>
          <p className="text-muted-foreground max-w-md mx-auto mb-8">
            Connect with others in a safe, anonymous environment to share experiences and support.
          </p>
          <Link to="/resources">
            <Button variant="outline">Browse Resources Instead</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold">Support Chat Rooms</h1>
          <p className="text-muted-foreground mt-1">
            Connect with others in a safe, anonymous environment
          </p>
        </div>
        
        <div className="md:hidden">
          <Button 
            onClick={() => setShowRooms(!showRooms)} 
            variant="outline"
            className="w-full"
          >
            {showRooms 
              ? (currentRoom ? "Show Current Chat" : "Browse Rooms") 
              : "Browse Rooms"
            }
          </Button>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        <div className={`${
          showRooms || !currentRoom || !showRooms
            ? "block w-full"
            : "hidden"
        } md:block md:w-1/3`}>
          <div className="grid grid-cols-1 gap-4">
            {rooms.map((room) => (
              <ChatRoomCard
                key={room.id}
                id={room.id}
                name={room.name}
                description={room.description}
                participants={room.participants}
              />
            ))}
          </div>
        </div>
        
        <div className={`${
          currentRoom && (!showRooms || !showRooms)
            ? "block w-full"
            : "hidden"
        } md:block md:w-2/3`}>
          <ChatBox />
        </div>
      </div>
      
      <div className="mt-8 bg-muted/50 rounded-lg p-6">
        <h3 className="text-lg font-medium mb-3">Community Guidelines</h3>
        <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
          <li>Be respectful and kind to others</li>
          <li>Maintain anonymity - don't share personal information</li>
          <li>Focus on support rather than giving medical advice</li>
          <li>Report any concerning content or behavior</li>
          <li>Take breaks when needed - it's okay to step away</li>
        </ul>
      </div>
    </div>
  );
};

export default ChatPage;
