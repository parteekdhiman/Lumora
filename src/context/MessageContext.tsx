import { createContext, useContext, ReactNode, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/redux";
import { addConversation, clearError } from "../store/messageSlice";
import { loadConversations, sendMessage as sendMessageThunk, markAsRead } from "../store/messageThunks";
import type { Message, Conversation } from "../store/messageSlice";

// Define the message context interface
interface MessageContextType {
  conversations: Conversation[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  sendMessage: (receiverId: string, content: string, jobId?: string) => void;
  markAsRead: (conversationId: string) => void;
  getConversation: (participantId: string) => Conversation | undefined;
  getUnreadCount: () => number;
  clearError: () => void;
}

// Create the message context
const MessageContext = createContext<MessageContextType | undefined>(undefined);

// MessageProvider component that manages messaging state
export const MessageProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();
  const messageState: any = useAppSelector((state: any) => state.messages);
  
  // Load conversations on mount
  useEffect(() => {
    dispatch(loadConversations());
  }, [dispatch]);

  // Send message function
  const handleSendMessage = (receiverId: string, content: string, jobId?: string) => {
    const user = useAppSelector((state: any) => state.auth.user);
    if (user) {
      dispatch(sendMessageThunk({ receiverId, content, jobId, userId: user.id }));
    }
  };

  // Mark as read function
  const handleMarkAsRead = (conversationId: string) => {
    dispatch(markAsRead(conversationId));
  };

  // Get conversation function
  const handleGetConversation = (participantId: string) => {
    const user = useAppSelector((state: any) => state.auth.user);
    if (!user) return undefined;
    
    // Validate participant ID is not the current user
    if (participantId === user.id) {
      console.error("Cannot get conversation with self");
      return undefined;
    }
    
    // Create sorted participant IDs for consistent conversation ID
    const participantIds = [user.id, participantId].sort();
    const conversationId = `${participantIds[0]}-${participantIds[1]}`;
    
    // Find and return conversation
    return messageState.conversations.find((conv: Conversation) => conv.id === conversationId);
  };

  // Get unread count function
  const handleGetUnreadCount = () => {
    return messageState.unreadCount;
  };

  // Clear error function
  const handleClearError = () => {
    dispatch(clearError());
  };

  return (
    <MessageContext.Provider value={{ 
      conversations: messageState.conversations,
      unreadCount: messageState.unreadCount,
      loading: messageState.loading,
      error: messageState.error,
      sendMessage: handleSendMessage,
      markAsRead: handleMarkAsRead,
      getConversation: handleGetConversation,
      getUnreadCount: handleGetUnreadCount,
      clearError: handleClearError,
    }}>
      {children}
    </MessageContext.Provider>
  );
};

// Custom hook to use the message context
export const useMessages = () => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessages must be used within MessageProvider");
  }
  return context;
};