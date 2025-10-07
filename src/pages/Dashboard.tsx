import { useAuth } from "@/context/AuthContext";
import { useMessages } from "@/context/MessageContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Link } from "react-router-dom";
import { 
  Plus, 
  Briefcase, 
  Users, 
  FileText, 
  BookmarkIcon, 
  TrendingUp, 
  Calendar, 
  CheckCircle, 
  MessageSquare,
  Send
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import MessagePanel from "@/components/MessagePanel";

const Dashboard = () => {
  const { user } = useAuth();
  const { conversations } = useMessages();
  const [applications, setApplications] = useState<any[]>([]);
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [isMessagePanelOpen, setIsMessagePanelOpen] = useState(false);
  const [messageRecipient, setMessageRecipient] = useState<{id: string, name: string} | null>(null);

  // Load data on component mount
  useEffect(() => {
    // Load applications
    const storedApplications = JSON.parse(localStorage.getItem("applications") || "[]");
    setApplications(storedApplications);
    
    // Load saved jobs
    const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setSavedJobs(savedJobIds);
  }, []);

  // Mock data
  const employerStats = {
    activeJobs: 12,
    totalApplicants: 156,
    shortlisted: 23,
    interviewsScheduled: 8,
  };

  const jobseekerStats = {
    applied: applications.length,
    saved: savedJobs.length,
    interviews: 3,
    viewed: 24,
  };

  const myPostedJobs = [
    {
      id: "1",
      title: "Senior React Developer",
      company: "TechCorp Inc.",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
      postedDate: "2 days ago",
      tags: ["React", "TypeScript", "Node.js"],
      applicants: 45,
    },
    {
      id: "2",
      title: "UX Designer",
      company: "TechCorp Inc.",
      location: "Remote",
      type: "Full-time",
      salary: "$90k - $130k",
      postedDate: "1 week ago",
      tags: ["Figma", "UI/UX", "Design Systems"],
      applicants: 32,
    },
  ];

  const appliedJobs = [
    {
      id: "3",
      title: "Frontend Developer",
      company: "StartupXYZ",
      location: "New York, NY",
      type: "Full-time",
      salary: "$100k - $140k",
      postedDate: "3 days ago",
      tags: ["React", "Vue", "CSS"],
      status: "Under Review",
    },
    {
      id: "4",
      title: "Full Stack Engineer",
      company: "Innovation Labs",
      location: "Austin, TX",
      type: "Full-time",
      salary: "$110k - $150k",
      postedDate: "1 week ago",
      tags: ["React", "Node.js", "PostgreSQL"],
      status: "Interview Scheduled",
    },
  ];

  // Simple chart component for statistics
  const StatChart = ({ value, max, color }: { value: number; max: number; color: string }) => {
    const percentage = (value / max) * 100;
    return (
      <div className="w-full bg-muted rounded-full h-2">
        <div 
          className={`h-2 rounded-full ${color}`} 
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    );
  };

  const handleContactEmployer = (employerId: string, employerName: string) => {
    setMessageRecipient({ id: employerId, name: employerName });
    setIsMessagePanelOpen(true);
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-muted-foreground">
            {user.role === "employer" 
              ? "Manage your job postings and applications" 
              : "Track your applications and find new opportunities"}
          </p>
        </div>

        {user.role === "employer" ? (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
                  <Briefcase className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employerStats.activeJobs}</div>
                  <p className="text-xs text-muted-foreground">Currently hiring</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Applicants</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employerStats.totalApplicants}</div>
                  <StatChart value={employerStats.totalApplicants} max={200} color="bg-primary" />
                  <p className="text-xs text-muted-foreground mt-2">+12% from last month</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Shortlisted</CardTitle>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employerStats.shortlisted}</div>
                  <StatChart value={employerStats.shortlisted} max={employerStats.totalApplicants} color="bg-green-500" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.round((employerStats.shortlisted/employerStats.totalApplicants)*100)}% of applicants</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{employerStats.interviewsScheduled}</div>
                  <StatChart value={employerStats.interviewsScheduled} max={employerStats.shortlisted} color="bg-blue-500" />
                  <p className="text-xs text-muted-foreground mt-2">{Math.round((employerStats.interviewsScheduled/employerStats.shortlisted)*100)}% shortlisted</p>
                </CardContent>
              </Card>
            </div>

            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold">Your Job Postings</h2>
              <Link to="/post-job">
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  Post New Job
                </Button>
              </Link>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {myPostedJobs.map((job) => (
                <div key={job.id} className="relative">
                  <JobCard {...job} />
                  <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium">
                    {job.applicants} applicants
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Applied</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{jobseekerStats.applied}</div>
                  <StatChart value={jobseekerStats.applied} max={20} color="bg-primary" />
                  <p className="text-xs text-muted-foreground mt-2">+3 from last week</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Saved Jobs</CardTitle>
                  <BookmarkIcon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{jobseekerStats.saved}</div>
                  <StatChart value={jobseekerStats.saved} max={30} color="bg-green-500" />
                  <p className="text-xs text-muted-foreground mt-2">Saved for later</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Interviews</CardTitle>
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{jobseekerStats.interviews}</div>
                  <StatChart value={jobseekerStats.interviews} max={jobseekerStats.applied || 10} color="bg-blue-500" />
                  <p className="text-xs text-muted-foreground mt-2">Scheduled</p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Profile Views</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{jobseekerStats.viewed}</div>
                  <StatChart value={jobseekerStats.viewed} max={50} color="bg-purple-500" />
                  <p className="text-xs text-muted-foreground mt-2">By employers</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Your Applications</h2>
                  <Link to="/jobs">
                    <Button variant="outline">Browse Jobs</Button>
                  </Link>
                </div>

                <div className="space-y-4">
                  {appliedJobs.map((job) => (
                    <div key={job.id} className="relative">
                      <JobCard {...job} />
                      <div className="absolute top-4 right-4 flex gap-2">
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="h-8 px-2"
                          onClick={() => handleContactEmployer("employer123", job.company)}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                        <div className="bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-medium">
                          {job.status}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold">Recommended for You</h2>
                  <Button variant="ghost" size="sm">View All</Button>
                </div>

                <div className="space-y-4">
                  <Card className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Senior React Developer</h3>
                        <p className="text-sm text-muted-foreground">Tech Innovations Inc.</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium text-primary">$130k - $170k</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">Remote</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                      <Button className="flex-1" size="sm" variant="outline">
                        Save
                      </Button>
                    </div>
                  </Card>

                  <Card className="p-6">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-muted flex-shrink-0">
                        <Briefcase className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">Frontend Engineer</h3>
                        <p className="text-sm text-muted-foreground">Digital Solutions Ltd</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm font-medium text-primary">$110k - $150k</span>
                          <span className="text-xs text-muted-foreground">•</span>
                          <span className="text-xs text-muted-foreground">New York, NY</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-2 mt-4">
                      <Button className="flex-1" size="sm">
                        <Send className="h-4 w-4 mr-2" />
                        Apply
                      </Button>
                      <Button className="flex-1" size="sm" variant="outline">
                        Save
                      </Button>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Message Panel */}
      <Sheet open={isMessagePanelOpen} onOpenChange={setIsMessagePanelOpen}>
        <SheetContent side="right" className="w-full sm:w-[400px] p-0">
          <SheetHeader className="p-4 border-b">
            <SheetTitle>Send Message</SheetTitle>
          </SheetHeader>
          {messageRecipient && (
            <MessagePanel 
              recipientId={messageRecipient.id}
              recipientName={messageRecipient.name}
              onClose={() => setIsMessagePanelOpen(false)}
            />
          )}
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default Dashboard;