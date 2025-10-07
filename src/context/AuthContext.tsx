import { createContext, useContext, ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks/redux";
import { clearError } from "@/store/authSlice";
import { login, signup, logout, resetPassword } from "@/store/authThunks";
import type { UserRole } from "@/store/authSlice";

// Authentication context interface
interface AuthContextType {
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string, role: UserRole) => Promise<void>;
  logout: () => void;
  resetPassword: (email: string) => Promise<void>;
  clearError: () => void;
  user: any;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
}

// Create the authentication context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// AuthProvider component that manages authentication state
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const dispatch = useAppDispatch();

  // Secure login function
  const handleLogin = async (email: string, password: string) => {
    try {
      await dispatch(login({ email, password })).unwrap();
    } catch (err) {
      throw new Error(err as string);
    }
  };

  // Secure signup function
  const handleSignup = async (name: string, email: string, password: string, role: UserRole) => {
    try {
      await dispatch(signup({ name, email, password, role })).unwrap();
    } catch (err) {
      throw new Error(err as string);
    }
  };

  // Secure logout function
  const handleLogout = () => {
    dispatch(logout());
  };

  // Secure password reset function
  const handleResetPassword = async (email: string) => {
    try {
      await dispatch(resetPassword(email)).unwrap();
    } catch (err) {
      throw new Error(err as string);
    }
  };

  // Clear error function
  const handleClearError = () => {
    dispatch(clearError());
  };

  // Get state from Redux
  const authState: any = useAppSelector((state: any) => state.auth);

  return (
    <AuthContext.Provider value={{ 
      login: handleLogin, 
      signup: handleSignup, 
      logout: handleLogout, 
      resetPassword: handleResetPassword, 
      clearError: handleClearError,
      user: authState.user,
      isAuthenticated: authState.isAuthenticated,
      loading: authState.loading,
      error: authState.error,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the authentication context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};