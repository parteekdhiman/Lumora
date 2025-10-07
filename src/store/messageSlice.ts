import { createSlice } from '@reduxjs/toolkit';
import { loadConversations, sendMessage, markAsRead } from './messageThunks';

// Define the message interface
export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  jobId?: string;
  content: string;
  timestamp: string;
  read: boolean;
  type: "text" | "application_status" | "interview_request";
}

// Define the conversation interface
export interface Conversation {
  id: string;
  participants: string[];
  jobId?: string;
  messages: Message[];
  lastMessage: Message;
}

// Messages state interface
interface MessagesState {
  conversations: Conversation[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: MessagesState = {
  conversations: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

// Create messages slice
export const messageSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addConversation: (state, action) => {
      state.conversations.push(action.payload);
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Load conversations cases
    builder
      .addCase(loadConversations.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loadConversations.fulfilled, (state, action) => {
        state.loading = false;
        state.conversations = action.payload;
        state.error = null;
        
        // Calculate unread count
        state.unreadCount = action.payload.reduce((count, conversation) => {
          return count + conversation.messages.filter(msg => !msg.read).length;
        }, 0);
      })
      .addCase(loadConversations.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Send message cases
      .addCase(sendMessage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        
        // Update the conversation with the new message
        const { conversationId, message } = action.payload;
        const conversation = state.conversations.find(conv => conv.id === conversationId);
        if (conversation) {
          conversation.messages.push(message as Message);
          conversation.lastMessage = message as Message;
        }
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Mark as read cases
      .addCase(markAsRead.fulfilled, (state, action) => {
        const conversationId = action.payload;
        const conversation = state.conversations.find(conv => conv.id === conversationId);
        if (conversation) {
          conversation.messages.forEach(msg => {
            msg.read = true;
          });
          
          // Recalculate unread count
          state.unreadCount = state.conversations.reduce((count, conv) => {
            return count + conv.messages.filter(msg => !msg.read).length;
          }, 0);
        }
      })
      .addCase(markAsRead.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { addConversation, clearError } = messageSlice.actions;

export default messageSlice.reducer;