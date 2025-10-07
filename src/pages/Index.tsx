import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import { Search, MapPin, Briefcase, Code, Palette, LineChart, Users } from "lucide-react";

const Index = () => {
  const featuredJobs = [
    {
      id: "1",
      title: "Senior Frontend Developer",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Full-time",
      salary: "$120k - $160k",
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
      postedDate: "1 week ago",
      tags: ["SQL", "Python", "Tableau"]
    }
  ];

  const categories = [
    { icon: Code, name: "Development", count: 234 },
    { icon: Palette, name: "Design", count: 156 },
    { icon: LineChart, name: "Marketing", count: 187 },
    { icon: Users, name: "Human Resources", count: 98 },
    { icon: Briefcase, name: "Business", count: 145 },
    { icon: Search, name: "Research", count: 67 }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/5 via-accent/20 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-6">
              Find Your Dream Job Today
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover thousands of opportunities from top companies worldwide
            </p>
{/*             
            <Card className="p-6 shadow-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Job title, keywords..." 
                    className="pl-10"
                  />
                </div>
                <div className="flex-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                  <Input 
                    placeholder="Location" 
                    className="pl-10"
                  />
                </div>
                <Button size="lg" className="md:w-auto">
                  Search Jobs
                </Button>
              </div>
            </Card> */}
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Card 
                key={index} 
                className="p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
              >
                <div className="flex justify-center mb-3">
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:scale-110 transition-all">
                    <Icon className="h-6 w-6 text-primary group-hover:text-primary-foreground" />
                  </div>
                </div>
                <h3 className="font-semibold text-sm mb-1">{category.name}</h3>
                <p className="text-xs text-muted-foreground">{category.count} jobs</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl font-bold">Featured Jobs</h2>
            <Link to="/jobs">
              <Button variant="outline">View All Jobs</Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {featuredJobs.map((job) => (
              <JobCard key={job.id} {...job} />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">10,000+</h3>
            <p className="text-muted-foreground">Active Jobs</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">5,000+</h3>
            <p className="text-muted-foreground">Companies</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">50,000+</h3>
            <p className="text-muted-foreground">Candidates</p>
          </div>
          <div className="text-center">
            <h3 className="text-4xl font-bold text-primary mb-2">2,000+</h3>
            <p className="text-muted-foreground">Hired This Month</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2024 Lumora. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
