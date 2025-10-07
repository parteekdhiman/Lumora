import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";
import SemanticSearch from "@/components/SemanticSearch";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, SlidersHorizontal, X } from "lucide-react";

// Main page component for advanced job searching
const AdvancedSearch = () => {
  // State variables for managing search filters and UI
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedRemote, setSelectedRemote] = useState(false);
  const [selectedDatePosted, setSelectedDatePosted] = useState("any");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState("");

  // Mock job data for demonstration
  // In a real application, this would come from an API
  const allJobs = [
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

  // State for storing filtered jobs
  const [filteredJobs, setFilteredJobs] = useState(allJobs);

  // Apply all filters whenever any filter changes
  useEffect(() => {
    // Start with all jobs
    let result = [...allJobs];

    // Apply text search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(query) ||
        job.company.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    // Apply job type filter
    if (selectedJobTypes.length > 0) {
      result = result.filter(job => selectedJobTypes.includes(job.type));
    }

    // Apply experience level filter
    if (selectedExperienceLevels.length > 0) {
      result = result.filter(job => selectedExperienceLevels.includes(job.experienceLevel));
    }

    // Apply remote work filter
    if (selectedRemote) {
      result = result.filter(job => job.location.toLowerCase() === "remote");
    }

    // Apply location filter
    if (selectedLocation) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Update the filtered jobs list
    setFilteredJobs(result);
  }, [searchQuery, selectedJobTypes, selectedExperienceLevels, selectedRemote, selectedLocation]);

  // Reset all filters to their default values
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedRemote(false);
    setSelectedDatePosted("any");
    setMinSalary(0);
    setMaxSalary(200000);
    setSelectedLocation("");
  };

  // Check if any filters are currently active
  const hasActiveFilters = searchQuery || 
    selectedJobTypes.length > 0 || 
    selectedExperienceLevels.length > 0 || 
    selectedRemote ||
    selectedLocation;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-6">Advanced Job Search</h1>
          
          {/* Semantic search input */}
          <div className="mb-6">
            <SemanticSearch 
              onSearch={setSearchQuery} 
              currentQuery={searchQuery} 
            />
          </div>

          {/* Filter controls */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Mobile filter toggle button */}
            <Button 
              variant="outline" 
              className="md:hidden"
              onClick={() => setShowFilters(!showFilters)}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
            </Button>
            
            {/* Clear filters button (only shown when filters are active) */}
            {hasActiveFilters && (
              <Button 
                variant="outline" 
                onClick={handleClearFilters}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                Clear Filters
              </Button>
            )}
            
            {/* Job count display */}
            <div className="text-sm text-muted-foreground ml-auto">
              {filteredJobs.length} job{filteredJobs.length !== 1 ? 's' : ''} found
            </div>
          </div>
        </div>

        {/* Main content area with filters and job listings */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filter sidebar (hidden on mobile when not toggled) */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <FilterSidebar 
              selectedJobTypes={selectedJobTypes}
              setSelectedJobTypes={setSelectedJobTypes}
              selectedExperienceLevels={selectedExperienceLevels}
              setSelectedExperienceLevels={setSelectedExperienceLevels}
              selectedSalaryRanges={[]} // Not used in advanced search
              setSelectedSalaryRanges={() => {}} // Not used in advanced search
              selectedRemote={selectedRemote}
              setSelectedRemote={setSelectedRemote}
              selectedDatePosted={selectedDatePosted}
              setSelectedDatePosted={setSelectedDatePosted}
              minSalary={minSalary}
              setMinSalary={setMinSalary}
              maxSalary={maxSalary}
              setMaxSalary={setMaxSalary}
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </div>
          
          {/* Job listings area */}
          <div className="lg:col-span-3">
            {filteredJobs.length > 0 ? (
              // Show job cards when results are found
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            ) : (
              // Show no results message when no jobs match the filters
              <Card className="p-12 text-center">
                <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-xl font-semibold mb-2">No jobs found</h2>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search criteria or filters
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSearch;