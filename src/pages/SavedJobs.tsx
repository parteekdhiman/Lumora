import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Card } from "@/components/ui/card";
import { BookmarkIcon, Loader2 } from "lucide-react";

// Mock job data - in a real app, this would come from an API
const mockJobs = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$120k - $160k",
    experienceLevel: "Senior Level",
    postedDate: "2 days ago",
    tags: ["React", "TypeScript", "Node.js"]
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Design Studio Inc",
    location: "New York, NY",
    type: "Full-time",
    salary: "$90k - $130k",
    experienceLevel: "Mid Level",
    postedDate: "3 days ago",
    tags: ["Figma", "UI/UX", "Prototyping"]
  },
  {
    id: "3",
    title: "Data Analyst",
    company: "Analytics Pro",
    location: "Remote",
    type: "Contract",
    salary: "$80k - $110k",
    experienceLevel: "Mid Level",
    postedDate: "1 week ago",
    tags: ["SQL", "Python", "Tableau"]
  },
  {
    id: "4",
    title: "Full Stack Engineer",
    company: "StartupHub",
    location: "Austin, TX",
    type: "Full-time",
    salary: "$110k - $150k",
    experienceLevel: "Senior Level",
    postedDate: "4 days ago",
    tags: ["JavaScript", "MongoDB", "AWS"]
  },
  {
    id: "5",
    title: "Marketing Manager",
    company: "Growth Marketing Co",
    location: "Chicago, IL",
    type: "Full-time",
    salary: "$85k - $120k",
    experienceLevel: "Mid Level",
    postedDate: "5 days ago",
    tags: ["SEO", "Content", "Analytics"]
  }
];

const SavedJobs = () => {
  const [savedJobs, setSavedJobs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to fetch saved jobs
    const fetchSavedJobs = () => {
      setIsLoading(true);
      
      // Get saved job IDs from localStorage
      const savedJobIds = JSON.parse(localStorage.getItem("savedJobs") || "[]");
      
      // Filter mock jobs to only include saved ones
      const filteredJobs = mockJobs.filter(job => savedJobIds.includes(job.id));
      
      // Simulate network delay
      setTimeout(() => {
        setSavedJobs(filteredJobs);
        setIsLoading(false);
      }, 500);
    };

    fetchSavedJobs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
            <BookmarkIcon className="h-8 w-8 text-primary" />
            Saved Jobs
          </h1>
          <p className="text-muted-foreground">
            You have {savedJobs.length} saved job{savedJobs.length !== 1 ? 's' : ''}
          </p>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : savedJobs.length > 0 ? (
          <div className="space-y-4">
            {savedJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center">
            <BookmarkIcon className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">No saved jobs yet</h2>
            <p className="text-muted-foreground mb-4">
              Start exploring jobs and save the ones you're interested in!
            </p>
          </Card>
        )}
      </div>
    </div>
  );
};

export default SavedJobs;