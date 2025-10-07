import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PostJob = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    experienceLevel: "",
    salary: "",
    description: "",
    responsibilities: "",
    requirements: "",
    benefits: "",
    tags: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Frontend only - store in localStorage
    const jobs = JSON.parse(localStorage.getItem("postedJobs") || "[]");
    const newJob = {
      id: Math.random().toString(36).substr(2, 9),
      ...formData,
      postedBy: user?.id,
      postedDate: new Date().toISOString(),
    };
    jobs.push(newJob);
    localStorage.setItem("postedJobs", JSON.stringify(jobs));

    toast({
      title: "Job Posted Successfully!",
      description: "Your job posting is now live.",
    });
    
    navigate("/dashboard");
  };

  if (user?.role !== "employer") {
    navigate("/dashboard");
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <Link to="/dashboard">
          <Button variant="ghost" className="mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Dashboard
          </Button>
        </Link>

        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl">Post a New Job</CardTitle>
            <CardDescription>Fill in the details to create a job listing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Job Title *</Label>
                  <Input
                    id="title"
                    name="title"
                    placeholder="e.g. Senior React Developer"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    name="company"
                    placeholder="e.g. TechCorp Inc."
                    value={formData.company}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="location">Location *</Label>
                  <Input
                    id="location"
                    name="location"
                    placeholder="e.g. San Francisco, CA or Remote"
                    value={formData.location}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="type">Job Type *</Label>
                  <Select name="type" value={formData.type} onValueChange={(value) => setFormData({ ...formData, type: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Full-time">Full-time</SelectItem>
                      <SelectItem value="Part-time">Part-time</SelectItem>
                      <SelectItem value="Contract">Contract</SelectItem>
                      <SelectItem value="Internship">Internship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="experienceLevel">Experience Level *</Label>
                  <Select name="experienceLevel" value={formData.experienceLevel} onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Entry Level">Entry Level</SelectItem>
                      <SelectItem value="Mid Level">Mid Level</SelectItem>
                      <SelectItem value="Senior Level">Senior Level</SelectItem>
                      <SelectItem value="Lead/Principal">Lead/Principal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="salary">Salary Range *</Label>
                  <Input
                    id="salary"
                    name="salary"
                    placeholder="e.g. $100k - $140k"
                    value={formData.salary}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Job Description *</Label>
                <Textarea
                  id="description"
                  name="description"
                  placeholder="Describe the role and what you're looking for..."
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="responsibilities">Key Responsibilities *</Label>
                <Textarea
                  id="responsibilities"
                  name="responsibilities"
                  placeholder="List main responsibilities (one per line)"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="requirements">Requirements *</Label>
                <Textarea
                  id="requirements"
                  name="requirements"
                  placeholder="List required skills and qualifications (one per line)"
                  value={formData.requirements}
                  onChange={handleChange}
                  rows={4}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="benefits">Benefits</Label>
                <Textarea
                  id="benefits"
                  name="benefits"
                  placeholder="List benefits offered (one per line)"
                  value={formData.benefits}
                  onChange={handleChange}
                  rows={3}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="tags">Skills/Tags *</Label>
                <Input
                  id="tags"
                  name="tags"
                  placeholder="e.g. React, TypeScript, Node.js (comma separated)"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex gap-4">
                <Button type="submit" className="flex-1">Post Job</Button>
                <Button type="button" variant="outline" onClick={() => navigate("/dashboard")}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default PostJob;
