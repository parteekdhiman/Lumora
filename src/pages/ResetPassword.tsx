import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Briefcase, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../assect/images/logo.png";
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { toast } = useToast();

  // Check if we're coming from the login page
  const fromLogin = location.state?.fromLogin;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await resetPassword(email);
      setIsSubmitted(true);
      toast({
        title: "Password Reset Email Sent",
        description: "Check your email for instructions to reset your password.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-3">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg">
              <img src={logo} className=" " />
            </div>
            <span className="text-xl font-bold">Lumora</span>
          </div>
          <CardTitle className="text-2xl text-center">
            {isSubmitted ? "Check Your Email" : "Reset Password"}
          </CardTitle>
          <CardDescription className="text-center">
            {isSubmitted 
              ? "We've sent password reset instructions to your email." 
              : "Enter your email to receive password reset instructions."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isSubmitted ? (
            <div className="space-y-4 text-center">
              <p className="text-muted-foreground">
                If an account exists with the email {email}, you will receive password reset instructions shortly.
              </p>
              <div className="flex flex-col gap-2">
                <Button onClick={() => navigate("/auth")} className="w-full">
                  Back to Login
                </Button>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setIsSubmitted(false);
                    setEmail("");
                  }}
                  className="w-full"
                >
                  Resend Email
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="john@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <Button type="submit" className="w-full">
                Send Reset Instructions
              </Button>

              <div className="text-center text-sm">
                <Link 
                  to="/auth"
                  state={{ fromReset: true }}
                  className="text-primary hover:underline inline-flex items-center gap-1"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to Login
                </Link>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default ResetPassword;