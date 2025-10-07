import { createAsyncThunk } from '@reduxjs/toolkit';
import { sanitizeInput } from "@/utils/security";
import { SESSION_CONFIG } from "@/config/security";

// Types for our thunks
interface SendMessageParams {
  receiverId: string;
  content: string;
  jobId?: string;
  userId: string;
}

// Load conversations thunk
export const loadConversations = createAsyncThunk(
  'messages/loadConversations',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const saved = localStorage.getItem(SESSION_CONFIG.conversationsStorageKey);
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          // Validate the structure of conversations
          if (Array.isArray(parsed)) {
            return parsed;
          } else {
            console.error("Invalid conversations data structure in localStorage");
            return [];
          }
        } catch (e) {
          console.error("Failed to parse conversations from localStorage", e);
          return [];
        }
      }
      
      return [];
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to load conversations");
    }
  }
);

// Send message thunk
export const sendMessage = createAsyncThunk(
  'messages/sendMessage',
  async (params: SendMessageParams, { rejectWithValue }) => {
    try {
      // Validate user authentication
      if (!params.userId) {
        return rejectWithValue("User not authenticated");
      }

      // Validate input parameters
      if (!params.receiverId || !params.content) {
        return rejectWithValue("Receiver ID and content are required");
      }

      // Validate content length
      if (params.content.length > 1000) {
        return rejectWithValue("Message content too long");
      }

      // Sanitize content (remove potentially harmful characters)
      const sanitizedContent = sanitizeInput(params.content);

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 300));

      // Create new message with proper structure
      const newMessage = {
        id: Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
        senderId: params.userId,
        receiverId: params.receiverId,
        jobId: params.jobId,
        content: sanitizedContent,
        timestamp: new Date().toISOString(),
        read: false,
        type: "text"
      };

      // Validate participant IDs
      if (!params.userId || !params.receiverId) {
        return rejectWithValue("Invalid participant IDs");
      }

      // Create sorted participant IDs for consistent conversation ID
      const participantIds = [params.userId, params.receiverId].sort();
      const conversationId = `${participantIds[0]}-${participantIds[1]}${params.jobId ? `-${params.jobId}` : ''}`;
      
      return { conversationId, message: newMessage };
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to send message");
    }
  }
);

// Mark as read thunk
export const markAsRead = createAsyncThunk(
  'messages/markAsRead',
  async (conversationId: string, { rejectWithValue }) => {
    try {
      // Validate input parameter
      if (!conversationId) {
        return rejectWithValue("Conversation ID is required");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 200));
      
      return conversationId;
    } catch (error: any) {
      return rejectWithValue(error.message || "Failed to mark as read");
    }
  }
);