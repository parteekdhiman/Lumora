import { useState, useMemo, useEffect } from "react";
import Navbar from "@/components/Navbar";
import JobCard from "@/components/JobCard";
import FilterSidebar from "@/components/FilterSidebar";
import SearchSuggestions from "@/components/SearchSuggestions";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, SlidersHorizontal, X, Loader2 } from "lucide-react";

// Page component for browsing and searching jobs
const Jobs = () => {
  // State variables for managing UI and filters
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [sortBy, setSortBy] = useState("recent");
  const [selectedJobTypes, setSelectedJobTypes] = useState<string[]>([]);
  const [selectedExperienceLevels, setSelectedExperienceLevels] = useState<string[]>([]);
  const [selectedSalaryRanges, setSelectedSalaryRanges] = useState<string[]>([]);
  const [selectedRemote, setSelectedRemote] = useState(false);
  const [selectedDatePosted, setSelectedDatePosted] = useState("any");
  const [minSalary, setMinSalary] = useState(0);
  const [maxSalary, setMaxSalary] = useState(200000);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "Cloud Infrastructure Ltd",
      location: "Remote",
      type: "Contract",
      salary: "$95k - $140k",
      experienceLevel: "Senior Level",
      postedDate: "1 week ago",
      tags: ["Docker", "Kubernetes", "CI/CD"]
    },
    {
      id: "7",
      title: "Junior Frontend Developer",
      company: "WebTech Solutions",
      location: "Boston, MA",
      type: "Full-time",
      salary: "$70k - $90k",
      experienceLevel: "Entry Level",
      postedDate: "1 day ago",
      tags: ["React", "JavaScript", "CSS"]
    },
    {
      id: "8",
      title: "UX Researcher",
      company: "UserFirst Labs",
      location: "Seattle, WA",
      type: "Full-time",
      salary: "$100k - $140k",
      experienceLevel: "Mid Level",
      postedDate: "2 days ago",
      tags: ["Research", "Figma", "User Testing"]
    }
  ];

  // Helper function to check if a job's salary falls within a selected range
  const isSalaryInRange = (jobSalary: string, selectedRange: string): boolean => {
    // Extract numbers from job salary (e.g., "$80k - $110k" -> [80, 110])
    const jobSalaryNumbers = jobSalary.match(/\d+/g)?.map(Number) || [];
    const jobMinSalary = jobSalaryNumbers[0] || 0;
    const jobMaxSalary = jobSalaryNumbers[1] || jobMinSalary;
    
    // Handle the special case of "150k+" range
    if (selectedRange === "$150k+") {
      return jobMinSalary >= 150;
    }
    
    // Parse the selected range values
    const rangeNumbers = selectedRange.match(/\d+/g)?.map(Number) || [];
    const rangeMin = rangeNumbers[0] || 0;
    const rangeMax = rangeNumbers[1] || 0;
    
    // Check if the job's salary range overlaps with the selected range
    return jobMinSalary <= rangeMax && jobMaxSalary >= rangeMin;
  };

  // Helper function to extract a single numeric value from a salary string
  const extractSalaryValue = (salary: string): number => {
    const numbers = salary.match(/\d+/g)?.map(Number) || [];
    return numbers.length > 0 ? numbers[0] : 0;
  };

  // Helper function to check if a job matches the selected date filter
  const isDateInRange = (postedDate: string, dateFilter: string): boolean => {
    if (dateFilter === "any") return true;
    
    // For simplicity, we use a basic approach in this frontend-only version
    // In a real application, you would parse actual dates
    switch (dateFilter) {
      case "24h":
        return postedDate.includes("hour") || postedDate.includes("day") && parseInt(postedDate) <= 1;
      case "7d":
        return postedDate.includes("hour") || 
               (postedDate.includes("day") && parseInt(postedDate) <= 7) || 
               postedDate.includes("week") && parseInt(postedDate) < 1;
      case "30d":
        return postedDate.includes("hour") || 
               postedDate.includes("day") || 
               (postedDate.includes("week") && parseInt(postedDate) <= 4) || 
               postedDate.includes("month") && parseInt(postedDate) < 1;
      default:
        return true;
    }
  };

  // Simulate loading state when filters change
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [searchQuery, selectedJobTypes, selectedExperienceLevels, selectedSalaryRanges, sortBy, selectedRemote, selectedDatePosted, minSalary, maxSalary, selectedLocation]);

  // Filter and search jobs using useMemo for performance
  const filteredJobs = useMemo(() => {
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

    // Apply salary range filter (checkbox-based)
    if (selectedSalaryRanges.length > 0) {
      result = result.filter(job => 
        selectedSalaryRanges.some(range => isSalaryInRange(job.salary, range))
      );
    }

    // Apply remote work filter
    if (selectedRemote) {
      result = result.filter(job => job.location.toLowerCase() === "remote");
    }

    // Apply date posted filter
    if (selectedDatePosted !== "any") {
      result = result.filter(job => isDateInRange(job.postedDate, selectedDatePosted));
    }

    // Apply salary slider filter
    if (minSalary > 0 || maxSalary < 200000) {
      result = result.filter(job => {
        const salaryValue = extractSalaryValue(job.salary);
        return salaryValue >= minSalary && salaryValue <= maxSalary;
      });
    }

    // Apply location filter
    if (selectedLocation) {
      result = result.filter(job => 
        job.location.toLowerCase().includes(selectedLocation.toLowerCase())
      );
    }

    // Apply sorting
    switch (sortBy) {
      case "salary-high":
        // Sort by salary (highest first)
        result.sort((a, b) => {
          const salaryA = extractSalaryValue(a.salary);
          const salaryB = extractSalaryValue(b.salary);
          return salaryB - salaryA;
        });
        break;
      case "salary-low":
        // Sort by salary (lowest first)
        result.sort((a, b) => {
          const salaryA = extractSalaryValue(a.salary);
          const salaryB = extractSalaryValue(b.salary);
          return salaryA - salaryB;
        });
        break;
      case "recent":
        // Sort by posted date (newest first)
        result.sort((a, b) => {
          // Simple implementation - in a real app you would parse actual dates
          const dateA = a.postedDate.includes("day") ? parseInt(a.postedDate) : 
                       a.postedDate.includes("week") ? parseInt(a.postedDate) * 7 :
                       a.postedDate.includes("month") ? parseInt(a.postedDate) * 30 : 0;
          const dateB = b.postedDate.includes("day") ? parseInt(b.postedDate) : 
                       b.postedDate.includes("week") ? parseInt(b.postedDate) * 7 :
                       b.postedDate.includes("month") ? parseInt(b.postedDate) * 30 : 0;
          return dateA - dateB;
        });
        break;
      default:
        break;
    }

    return result;
  }, [allJobs, searchQuery, selectedJobTypes, selectedExperienceLevels, selectedSalaryRanges, sortBy, selectedRemote, selectedDatePosted, minSalary, maxSalary, selectedLocation]);

  
  // Handle changes to the search input
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setShowSuggestions(e.target.value.length > 0);
  };

  // Handle selection of a search suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    setShowSuggestions(false);
  };

  // Show suggestions when search input is focused
  const handleSearchFocus = () => {
    setShowSuggestions(searchQuery.length > 0);
  };

  // Hide suggestions when search input is blurred
  const handleSearchBlur = () => {
    // Delay hiding suggestions to allow click events to register
    setTimeout(() => setShowSuggestions(false), 200);
  };

  // Handle changes to the sort selection
  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  // Reset all filters to their default values
  const handleClearFilters = () => {
    setSearchQuery("");
    setSortBy("recent");
    setSelectedJobTypes([]);
    setSelectedExperienceLevels([]);
    setSelectedSalaryRanges([]);
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
    selectedSalaryRanges.length > 0 ||
    sortBy !== "recent" ||
    selectedRemote ||
    selectedDatePosted !== "any" ||
    minSalary > 0 ||
    maxSalary < 200000 ||
    selectedLocation !== "";

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        {/* Search and filter controls */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search input with suggestions */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search jobs, companies, or skills..." 
                className="pl-10"
                value={searchQuery}
                onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
              />
              {/* Clear search button */}
              {searchQuery && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
              {/* Search suggestions dropdown */}
              {showSuggestions && (
                <SearchSuggestions 
                  searchQuery={searchQuery} 
                  onSuggestionClick={handleSuggestionClick} 
                />
              )}
            </div>
            
            {/* Sort and filter buttons */}
            <div className="flex gap-2">
              {/* Sort selection dropdown */}
              <Select value={sortBy} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recent">Most Recent</SelectItem>
                  <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                  <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                  <SelectItem value="relevant">Most Relevant</SelectItem>
                </SelectContent>
              </Select>
              
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
                  Clear
                </Button>
              )}
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
              selectedSalaryRanges={selectedSalaryRanges}
              setSelectedSalaryRanges={setSelectedSalaryRanges}
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
            {/* Results header */}
            <div className="mb-6 flex justify-between items-center">
              <h1 className="text-2xl font-bold text-foreground">All Jobs</h1>
              <p className="text-muted-foreground">
                Showing {filteredJobs.length} result{filteredJobs.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {/* Loading state */}
            {isLoading ? (
              <div className="flex justify-center items-center h-64">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
              </div>
            ) : filteredJobs.length > 0 ? (
              // Show job cards when results are found
              <div className="space-y-4">
                {filteredJobs.map((job) => (
                  <JobCard key={job.id} {...job} />
                ))}
              </div>
            ) : (
              // Show no results message when no jobs match the filters
              <div className="text-center py-12">
                <div className="mx-auto h-16 w-16 rounded-full bg-muted flex items-center justify-center mb-4">
                  <Search className="h-8 w-8 text-muted-foreground" />
                </div>
                <h3 className="text-lg font-semibold mb-2">No jobs found</h3>
                <p className="text-muted-foreground mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button onClick={handleClearFilters} variant="outline">
                  Clear all filters
                </Button>
              </div>
            )}
            
            {/* Pagination controls (only shown when not loading and results exist) */}
            {!isLoading && filteredJobs.length > 0 && (
              <div className="mt-8 flex justify-center gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="default" size="sm">1</Button>
                <Button variant="outline" size="sm">2</Button>
                <Button variant="outline" size="sm">3</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;