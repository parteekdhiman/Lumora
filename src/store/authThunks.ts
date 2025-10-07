import { createAsyncThunk } from '@reduxjs/toolkit';
import { 
  validateEmail, 
  validatePassword, 
  constantTimeCompare,
  generateSecureId
} from "@/utils/security";
import { PASSWORD_POLICY } from "@/config/security";

// Types for our thunks
interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: "employer" | "jobseeker";
}

// Login thunk
export const login = createAsyncThunk(
  'auth/login',
  async (credentials: LoginCredentials, { rejectWithValue }) => {
    try {
      // Validate input parameters
      if (!credentials.email || !credentials.password) {
        return rejectWithValue("Email and password are required");
      }

      // Validate email format
      if (!validateEmail(credentials.email)) {
        return rejectWithValue("Invalid email format");
      }

      // Validate password strength
      if (!validatePassword(credentials.password)) {
        return rejectWithValue(`Password must be at least ${PASSWORD_POLICY.minLength} characters and contain both letters and numbers`);
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real application, this would call an API endpoint
      // For frontend-only implementation, we'll simulate with localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const foundUser = storedUsers.find((u: any) => u.email === credentials.email);
      
      // Constant time comparison to prevent timing attacks
      if (!foundUser || !constantTimeCompare(foundUser.password, credentials.password)) {
        return rejectWithValue("Invalid credentials");
      }

      // Remove password from user object before storing
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Validate user data
      if (!userWithoutPassword.id || !userWithoutPassword.email || !userWithoutPassword.name) {
        return rejectWithValue("Invalid user data");
      }

      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error: any) {
      return rejectWithValue(error.message || "Login failed");
    }
  }
);

// Signup thunk
export const signup = createAsyncThunk(
  'auth/signup',
  async (credentials: SignupCredentials, { rejectWithValue }) => {
    try {
      // Validate input parameters
      if (!credentials.name || !credentials.email || !credentials.password || !credentials.role) {
        return rejectWithValue("All fields are required");
      }

      // Validate email format
      if (!validateEmail(credentials.email)) {
        return rejectWithValue("Invalid email format");
      }

      // Validate password strength
      if (!validatePassword(credentials.password)) {
        return rejectWithValue(`Password must be at least ${PASSWORD_POLICY.minLength} characters and contain both letters and numbers`);
      }

      // Validate role
      if (credentials.role !== "employer" && credentials.role !== "jobseeker") {
        return rejectWithValue("Invalid role");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real application, this would call an API endpoint
      // For frontend-only implementation, we'll simulate with localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      
      // Check if email already exists
      if (storedUsers.find((u: any) => u.email === credentials.email)) {
        return rejectWithValue("Email already exists");
      }

      // Create new user with secure ID generation
      const newUser = {
        id: generateSecureId(),
        name: credentials.name,
        email: credentials.email,
        // In a real app, password would be hashed before storage
        password: credentials.password,
        role: credentials.role,
      };

      storedUsers.push(newUser);
      localStorage.setItem("users", JSON.stringify(storedUsers));

      // Remove password from user object before storing in session
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Store user in localStorage
      localStorage.setItem("user", JSON.stringify(userWithoutPassword));
      
      return userWithoutPassword;
    } catch (error: any) {
      return rejectWithValue(error.message || "Signup failed");
    }
  }
);

// Logout thunk
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { rejectWithValue }) => {
    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Remove user from localStorage
      localStorage.removeItem("user");
      
      return;
    } catch (error: any) {
      return rejectWithValue(error.message || "Logout failed");
    }
  }
);

// Reset password thunk
export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (email: string, { rejectWithValue }) => {
    try {
      // Validate input parameter
      if (!email) {
        return rejectWithValue("Email is required");
      }

      // Validate email format
      if (!validateEmail(email)) {
        return rejectWithValue("Invalid email format");
      }

      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // In a real application, this would call an API endpoint to send a password reset email
      // For frontend-only implementation, we'll simulate with localStorage
      const storedUsers = JSON.parse(localStorage.getItem("users") || "[]");
      const userIndex = storedUsers.findIndex((u: any) => u.email === email);
      
      if (userIndex === -1) {
        // For security, we don't reveal whether an email exists in our system
        // We simply simulate the process as if it succeeded
        console.log(`Password reset process initiated for ${email}`);
        return;
      }

      // In a real implementation, the user would receive an email with a secure reset link
      // For demo purposes, we'll just log the process
      console.log(`Password reset email would be sent to ${email}`);
      
      return;
    } catch (error: any) {
      return rejectWithValue(error.message || "Password reset failed");
    }
  }
);