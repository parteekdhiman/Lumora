import { useParams, Link, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import SalaryComparison from "@/components/SalaryComparison";
import CompanyInsights from "@/components/CompanyInsights";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  MapPin, 
  Briefcase, 
  Clock, 
  DollarSign, 
  BookmarkIcon, 
  Share2, 
  Building, 
  CheckCircle, 
  AlertCircle,
  MessageSquare,
  Send
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useEffect } from "react";
import EmailService from "@/services/emailService";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MessagePanel from "@/components/MessagePanel";
import { 
  sanitizeInput, 
  validateEmail, 
  validatePhone, 
  validateUrl 
} from "@/utils/security";

const JobDetail = () => {
  const { id } = useParams();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isApplyOpen, setIsApplyOpen] = useState(false);
  const [applicationData, setApplicationData] = useState({
    fullName: "",
    email: "",
    phone: "",
    coverLetter: "",
    resume: "",
  });
  const [applications, setApplications] = useState<any[]>([]);
  const [isApplied, setIsApplied] = useState(false);
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);

  // Load applications from localStorage on component mount
  useEffect(() => {
    try {
      const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]");
      // Validate applications data structure
      if (Array.isArray(storedApplications)) {
        setApplications(storedApplications);
      } else {
        console.error("Invalid applications data structure in localStorage");
        setApplications([]);
      }
    } catch (error) {
      console.error("Failed to parse applications from localStorage", error);
      setApplications([]);
    }
    
    // Check if user has already applied for this job
    if (user?.id && id) {
      try {
        const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]");
        if (Array.isArray(storedApplications)) {
          const hasApplied = storedApplications.some(
            (app: any) => app.jobId === id && app.userId === user.id
          );
          setIsApplied(hasApplied);
        }
      } catch (error) {
        console.error("Failed to check application status", error);
      }
    }
  }, [user, id]);

  const handleApply = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to apply for jobs.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    if (user?.role !== "jobseeker") {
      toast({
        title: "Access Denied",
        description: "Only job seekers can apply for jobs.",
        variant: "destructive",
      });
      return;
    }

    // Pre-fill application data with user info
    setApplicationData({
      fullName: user.name || "",
      email: user.email || "",
      phone: "",
      coverLetter: "",
      resume: "",
    });
    
    setIsApplyOpen(true);
  };

  const submitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate application data
    if (!applicationData.fullName || !applicationData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    // Validate email format
    if (!validateEmail(applicationData.email)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address.",
        variant: "destructive",
      });
      return;
    }

    // Validate phone number if provided
    if (applicationData.phone && !validatePhone(applicationData.phone)) {
      toast({
        title: "Invalid Phone Number",
        description: "Please enter a valid phone number.",
        variant: "destructive",
      });
      return;
    }

    // Validate resume URL if provided
    if (applicationData.resume && !validateUrl(applicationData.resume)) {
      toast({
        title: "Invalid Resume URL",
        description: "Please enter a valid URL for your resume.",
        variant: "destructive",
      });
      return;
    }

    // Sanitize user input to prevent XSS attacks
    const sanitizedData = {
      fullName: sanitizeInput(applicationData.fullName),
      email: sanitizeInput(applicationData.email),
      phone: sanitizeInput(applicationData.phone),
      coverLetter: sanitizeInput(applicationData.coverLetter),
      resume: sanitizeInput(applicationData.resume),
    };

    // Frontend only - store application
    const newApplication = {
      id: Math.random().toString(36).substr(2, 9) + Date.now().toString(36),
      jobId: id,
      userId: user?.id,
      ...sanitizedData,
      appliedDate: new Date().toISOString(),
      status: "submitted",
    };
    
    try {
      const updatedApplications = [...applications, newApplication];
      setApplications(updatedApplications);
      localStorage.setItem("applications", JSON.stringify(updatedApplications));
      setIsApplied(true);

      // Send email notifications
      EmailService.sendApplicationConfirmation(user?.email || "", job.title, job.company);
      // In a real app, you would get the employer's email from the job data
      EmailService.sendApplicationAlert("employer@example.com", job.title, user?.name || "");

      toast({
        title: "Application Submitted!",
        description: "Your application has been sent successfully. We've sent a confirmation to your email.",
      });
    } catch (error) {
      console.error("Failed to submit application", error);
      toast({
        title: "Submission Failed",
        description: "There was an error submitting your application. Please try again.",
        variant: "destructive",
      });
    }

    setIsApplyOpen(false);
    setApplicationData({ fullName: "", email: "", phone: "", coverLetter: "", resume: "" });
  };

  // Mock data - in real app, fetch based on id
  const job = {
    id: id,
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    postedDate: "2 days ago",
    tags: ["React", "TypeScript", "Node.js", "GraphQL"],
    description: `We are looking for an experienced Frontend Developer to join our growing team. 
    You will be responsible for building and maintaining high-quality web applications using modern technologies.`,
    responsibilities: [
      "Develop and maintain responsive web applications",
      "Collaborate with design and backend teams",
      "Write clean, maintainable code",
      "Participate in code reviews",
      "Optimize applications for performance"
    ],
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of TypeScript",
      "Experience with state management (Redux, MobX)",
      "Understanding of RESTful APIs and GraphQL",
      "Bachelor's degree in Computer Science or related field"
    ],
    benefits: [
      "Competitive salary and equity",
      "Health, dental, and vision insurance",
      "401(k) matching",
      "Flexible work hours",
      "Remote work options",
      "Professional development budget"
    ]
  };

  const handleContactEmployer = () => {
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to contact the employer.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    setIsMessagePanelOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link to="/jobs" className="text-primary hover:underline text-sm">
            ← Back to Jobs
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className="flex gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                    <Building className="h-8 w-8 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
                    <p className="text-lg text-muted-foreground">{job.company}</p>
                  </div>
                </div>
                {isApplied && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-1 rounded-full">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Applied</span>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Briefcase className="h-4 w-4" />
                  <span>{job.type}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign className="h-4 w-4" />
                  <span>{job.salary}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="h-4 w-4" />
                  <span>Posted {job.postedDate}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {job.tags.map((tag, index) => (
                  <Badge key={index} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>

              <Separator className="my-6" />

              <div className="space-y-6">
                <div>
                  <h2 className="text-xl font-semibold mb-3">Job Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{job.description}</p>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Responsibilities</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.responsibilities.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Requirements</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.requirements.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h2 className="text-xl font-semibold mb-3">Benefits</h2>
                  <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    {job.benefits.map((item, index) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </Card>

            {/* Salary Comparison Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">Market Salary Insights</h2>
              <SalaryComparison jobTitle={job.title} />
            </Card>

            {/* Company Insights Section */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-4">About {job.company}</h2>
              <CompanyInsights company={job.company} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24 space-y-4">
              {(!isAuthenticated || user?.role === "jobseeker") && (
                <Dialog open={isApplyOpen} onOpenChange={setIsApplyOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      size="lg" 
                      className="w-full" 
                      onClick={handleApply}
                      disabled={isApplied}
                    >
                      {isApplied ? (
                        <>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Application Submitted
                        </>
                      ) : (
                        "Apply Now"
                      )}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>Apply for {job.title}</DialogTitle>
                      <DialogDescription>
                        Fill in your details to submit your application.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={submitApplication} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={applicationData.fullName}
                          onChange={(e) => setApplicationData({ ...applicationData, fullName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={applicationData.email}
                          onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={applicationData.phone}
                          onChange={(e) => setApplicationData({ ...applicationData, phone: e.target.value })}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="resume">Resume/CV Link *</Label>
                        <Input
                          id="resume"
                          placeholder="https://drive.google.com/..."
                          value={applicationData.resume}
                          onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="coverLetter">Cover Letter</Label>
                        <Textarea
                          id="coverLetter"
                          placeholder="Tell us why you're a great fit for this role..."
                          rows={6}
                          value={applicationData.coverLetter}
                          onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                        />
                      </div>
                      <div className="flex gap-3">
                        <Button type="submit" className="flex-1">Submit Application</Button>
                        <Button type="button" variant="outline" onClick={() => setIsApplyOpen(false)}>
                          Cancel
                        </Button>
                      </div>
                    </form>
                  </DialogContent>
                </Dialog>
              )}
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full"
                onClick={handleContactEmployer}
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Contact Employer
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <BookmarkIcon className="h-4 w-4 mr-2" />
                Save Job
              </Button>
              <Button variant="outline" size="lg" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>

              <Separator className="my-4" />

              <div>
                <h3 className="font-semibold mb-4">About the Company</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  TechCorp Solutions is a leading technology company specializing in innovative software solutions.
                </p>
                <Button variant="link" className="p-0 h-auto">
                  View Company Profile →
                </Button>
              </div>
              
              {isApplied && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-green-800">Application Submitted</h4>
                      <p className="text-sm text-green-700 mt-1">
                        You applied for this position on {new Date().toLocaleDateString()}.
                      </p>
                      <Button 
                        variant="link" 
                        className="p-0 h-auto text-green-700 mt-2"
                        onClick={() => setIsMessagePanelOpen(true)}
                      >
                        Contact Employer
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Message Panel */}
      <Sheet open={isMessagePanelOpen} onOpenChange={setIsMessagePanelOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Contact {job.company}</SheetTitle>
          </SheetHeader>
          <MessagePanel 
            recipientId="employer123"
            recipientName={job.company}
            jobId={id}
            onClose={() => setIsMessagePanelOpen(false)}
          />
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default JobDetail;