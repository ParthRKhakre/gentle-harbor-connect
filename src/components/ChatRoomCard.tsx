
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useChat } from "@/contexts/ChatContext";
import { MessageCircle, Users } from "lucide-react";

interface ChatRoomCardProps {
  id: string;
  name: string;
  description: string;
  participants: number;
}

const ChatRoomCard: React.FC<ChatRoomCardProps> = ({ id, name, description, participants }) => {
  const { joinRoom, currentRoom } = useChat();
  
  const isActive = currentRoom?.id === id;
  
  return (
    <Card className={`h-full flex flex-col transition-all ${
      isActive ? "border-primary/50 shadow-md" : "hover:shadow-sm"
    }`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">{name}</CardTitle>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users size={14} />
            <span>{participants}</span>
          </div>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <div className="text-xs text-muted-foreground flex items-center gap-2">
          <MessageCircle size={14} />
          <span>Join the conversation to support and be supported</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => joinRoom(id)}
          variant={isActive ? "default" : "outline"}
          className="w-full"
        >
          {isActive ? "Currently Active" : "Join Room"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ChatRoomCard;
