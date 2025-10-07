import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bell, CheckCircle, X } from "lucide-react";

const NotificationPanel = ({ onClose }: { onClose: () => void }) => {
  const { user } = useAuth();
  const { conversations, markAsRead } = useMessages();
  const [notifications, setNotifications] = useState<any[]>([]);

  // Convert messages to notifications
  useEffect(() => {
    if (!user) return;
    
    const allNotifications = conversations.flatMap(conv => 
      conv.messages
        .filter(msg => msg.receiverId === user.id && !msg.read)
        .map(msg => ({
          id: msg.id,
          senderId: msg.senderId,
          content: msg.content,
          timestamp: msg.timestamp,
          type: msg.type,
          conversationId: conv.id,
          jobId: conv.jobId
        }))
    );
    
    setNotifications(allNotifications);
  }, [conversations, user]);

  const markAsReadAndClose = (conversationId: string) => {
    markAsRead(conversationId);
    onClose();
  };

  const markAllAsRead = () => {
    conversations.forEach(conv => markAsRead(conv.id));
    onClose();
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold flex items-center gap-2">
          <Bell className="h-4 w-4" />
          Notifications
        </h3>
        <div className="flex gap-2">
          {notifications.length > 0 && (
            <Button variant="ghost" size="sm" onClick={markAllAsRead}>
              Mark all as read
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Notifications */}
      <ScrollArea className="flex-1">
        {notifications.length > 0 ? (
          <div className="p-2">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className="p-4 border-b hover:bg-muted cursor-pointer"
                onClick={() => markAsReadAndClose(notification.conversationId)}
              >
                <div className="flex gap-3">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      {notification.senderId.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-medium">
                      {notification.type === "application_status" 
                        ? "Application Update" 
                        : notification.type === "interview_request"
                        ? "Interview Request"
                        : "New Message"}
                    </p>
                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {notification.content}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {new Date(notification.timestamp).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </p>
                  </div>
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <CheckCircle className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center">
            <Bell className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="font-medium mb-1">No notifications</h3>
            <p className="text-sm text-muted-foreground">
              You're all caught up! Check back later for updates.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
};

export default NotificationPanel;