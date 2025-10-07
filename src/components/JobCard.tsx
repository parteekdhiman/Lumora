import { Link, useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MapPin, Briefcase, Clock, BookmarkIcon, DollarSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";

interface JobCardProps {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  experienceLevel?: string;
  postedDate: string;
  logo?: string;
  tags?: string[];
}

const JobCard = ({ 
  id, 
  title, 
  company, 
  location, 
  type, 
  salary, 
  experienceLevel,
  postedDate, 
  tags = [] 
}: JobCardProps) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSaved, setIsSaved] = useState(false);

  // Check if job is saved on component mount
  useEffect(() => {
    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    setIsSaved(savedJobs.includes(id));
  }, [id]);

  const handleQuickApply = (e: React.MouseEvent) => {
    e.preventDefault();
    
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

    navigate(`/jobs/${id}`);
  };

  const toggleSaveJob = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      toast({
        title: "Login Required",
        description: "Please login to save jobs.",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }

    const savedJobs = JSON.parse(localStorage.getItem("savedJobs") || "[]");
    
    if (isSaved) {
      // Remove from saved jobs
      const updatedSavedJobs = savedJobs.filter((jobId: string) => jobId !== id);
      localStorage.setItem("savedJobs", JSON.stringify(updatedSavedJobs));
      setIsSaved(false);
      toast({
        title: "Job Unsaved",
        description: "This job has been removed from your saved list.",
      });
    } else {
      // Add to saved jobs
      savedJobs.push(id);
      localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
      setIsSaved(true);
      toast({
        title: "Job Saved!",
        description: "This job has been saved to your list.",
      });
    }
  };

  return (
    <Card className="p-6 transition-all hover:shadow-lg border bg-card">
      <div className="flex items-start justify-between gap-4">
        <div className="flex gap-4 flex-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-lg bg-muted flex-shrink-0">
            <Briefcase className="h-7 w-7 text-primary" />
          </div>
          
          <div className="flex-1 min-w-0">
            <Link to={`/jobs/${id}`}>
              <h3 className="font-semibold text-lg text-foreground hover:text-primary transition-colors mb-1 truncate">
                {title}
              </h3>
            </Link>
            <p className="text-muted-foreground font-medium mb-3">{company}</p>
            
            <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
              <div className="flex items-center gap-1">
                <Briefcase className="h-4 w-4" />
                <span>{type}</span>
              </div>
              <div className="flex items-center gap-1">
                <DollarSign className="h-4 w-4" />
                <span>{salary}</span>
              </div>
              {experienceLevel && (
                <div className="flex items-center gap-1">
                  <span className="font-medium">Level:</span>
                  <span>{experienceLevel}</span>
                </div>
              )}
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{postedDate}</span>
              </div>
            </div>
            
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </div>
        
        <div className="flex flex-col gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-9 w-9"
            onClick={toggleSaveJob}
          >
            <BookmarkIcon 
              className={`h-4 w-4 ${isSaved ? 'fill-primary text-primary' : ''}`} 
            />
          </Button>
          {(!isAuthenticated || user?.role === "jobseeker") ? (
            <Button size="sm" className="whitespace-nowrap" onClick={handleQuickApply}>
              Apply Now
            </Button>
          ) : (
            <Link to={`/jobs/${id}`}>
              <Button size="sm" className="whitespace-nowrap">
                View Details
              </Button>
            </Link>
          )}
        </div>
      </div>
    </Card>
  );
};

export default JobCard;