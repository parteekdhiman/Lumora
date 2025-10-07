import { Link, useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Briefcase, BookmarkIcon, User, Search, LogOut, LayoutDashboard, Bell, Mail } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import logo from "../assect/images/logo.png";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import NotificationPanel from "@/components/NotificationPanel";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout, isAuthenticated } = useAuth();
  const { unreadCount } = useMessages();
  
  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    logout();
    navigate("/");
  };
  
  return (
    <nav className="sticky top-0 z-50 border-b bg-card shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
              <img src={logo} className=" " />
            </div>
            <span className="text-xl font-bold text-foreground">Lumora</span>
          </Link>
          
          <div className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Home
            </Link>
            <Link 
              to="/jobs" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/jobs") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Find Jobs
            </Link>
            <Link 
              to="/advanced-search" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/advanced-search") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Advanced Search
            </Link>
            <Link 
              to="/saved" 
              className={`text-sm font-medium transition-colors hover:text-primary ${
                isActive("/saved") ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Saved Jobs
            </Link>
          </div>
          
          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-5 w-5" />
                      {unreadCount > 0 && (
                        <span className="absolute top-1 right-1 flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                        </span>
                      )}
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="right" className="w-full sm:w-[400px] p-0">
                    <NotificationPanel onClose={() => {}} />
                  </SheetContent>
                </Sheet>
                
                <Button variant="ghost" size="icon">
                  <Mail className="h-5 w-5" />
                </Button>
              </>
            )}
            
            <Button variant="ghost" size="icon" className="md:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            {isAuthenticated ? (
              <>
                {user?.role === "employer" && (
                  <Link to="/post-job">
                    <Button className="hidden md:flex">Post a Job</Button>
                  </Link>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="icon">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user?.name}</DropdownMenuLabel>
                    <DropdownMenuLabel className="font-normal text-muted-foreground text-xs">
                      {user?.role === "employer" ? "Employer" : "Job Seeker"}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate("/dashboard")}>
                      <LayoutDashboard className="mr-2 h-4 w-4" />
                      Dashboard
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate("/profile")}>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <>
                <Link to="/auth">
                  <Button variant="outline">Login</Button>
                </Link>
                <Link to="/auth">
                  <Button className="hidden md:flex">Sign Up</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;