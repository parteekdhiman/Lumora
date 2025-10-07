import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/context/AuthContext";
import { MessageProvider } from "@/context/MessageContext";
import { ReduxProvider } from "@/store/Provider";
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import SavedJobs from "./pages/SavedJobs";
import Profile from "./pages/Profile";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import PostJob from "./pages/PostJob";
import ResetPassword from "./pages/ResetPassword";
import AdvancedSearch from "./pages/AdvancedSearch";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ReduxProvider>
      <TooltipProvider>
        <AuthProvider>
          <MessageProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/jobs" element={<Jobs />} />
                <Route path="/jobs/:id" element={<JobDetail />} />
                <Route path="/saved" element={<SavedJobs />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/post-job" element={<PostJob />} />
                <Route path="/advanced-search" element={<AdvancedSearch />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </MessageProvider>
        </AuthProvider>
      </TooltipProvider>
    </ReduxProvider>
  </QueryClientProvider>
);

export default App;