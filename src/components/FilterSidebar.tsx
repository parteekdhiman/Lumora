import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import LocationSearch from "@/components/LocationSearch";
import { RotateCcw } from "lucide-react";
import { useState } from "react";

// Define the props for the FilterSidebar component
interface FilterSidebarProps {
  // Job type filters
  selectedJobTypes: string[];
  setSelectedJobTypes: (types: string[]) => void;
  
  // Experience level filters
  selectedExperienceLevels: string[];
  setSelectedExperienceLevels: (levels: string[]) => void;
  
  // Salary range filters (checkbox-based)
  selectedSalaryRanges: string[];
  setSelectedSalaryRanges: (ranges: string[]) => void;
  
  // Remote work filter
  selectedRemote: boolean;
  setSelectedRemote: (remote: boolean) => void;
  
  // Date posted filter
  selectedDatePosted: string;
  setSelectedDatePosted: (date: string) => void;
  
  // Salary slider values
  minSalary: number;
  setMinSalary: (salary: number) => void;
  maxSalary: number;
  setMaxSalary: (salary: number) => void;
  
  // Location filter
  selectedLocation: string;
  setSelectedLocation: (location: string) => void;
}

// Sidebar component that contains all job filtering options
const FilterSidebar = ({
  selectedJobTypes,
  setSelectedJobTypes,
  selectedExperienceLevels,
  setSelectedExperienceLevels,
  selectedSalaryRanges,
  setSelectedSalaryRanges,
  selectedRemote,
  setSelectedRemote,
  selectedDatePosted,
  setSelectedDatePosted,
  minSalary,
  setMinSalary,
  maxSalary,
  setMaxSalary,
  selectedLocation,
  setSelectedLocation
}: FilterSidebarProps) => {
  // Available job types for filtering
  const jobTypes = ["Full-time", "Part-time", "Contract", "Freelance", "Internship"];
  
  // Experience levels for filtering
  const experienceLevels = ["Entry Level", "Mid Level", "Senior Level", "Executive"];
  
  // Date posted options for filtering
  const datePostedOptions = [
    { value: "any", label: "Any time" },
    { value: "24h", label: "Last 24 hours" },
    { value: "7d", label: "Last 7 days" },
    { value: "30d", label: "Last 30 days" }
  ];

  // Handle changes to job type checkboxes
  const handleJobTypeChange = (type: string, checked: boolean) => {
    if (checked) {
      // Add the job type to selected filters
      setSelectedJobTypes([...selectedJobTypes, type]);
    } else {
      // Remove the job type from selected filters
      setSelectedJobTypes(selectedJobTypes.filter(t => t !== type));
    }
  };

  // Handle changes to experience level checkboxes
  const handleExperienceLevelChange = (level: string, checked: boolean) => {
    if (checked) {
      // Add the experience level to selected filters
      setSelectedExperienceLevels([...selectedExperienceLevels, level]);
    } else {
      // Remove the experience level from selected filters
      setSelectedExperienceLevels(selectedExperienceLevels.filter(l => l !== level));
    }
  };

  // Handle changes to salary range checkboxes
  const handleSalaryRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      // Add the salary range to selected filters
      setSelectedSalaryRanges([...selectedSalaryRanges, range]);
    } else {
      // Remove the salary range from selected filters
      setSelectedSalaryRanges(selectedSalaryRanges.filter(r => r !== range));
    }
  };

  // Reset all filters to their default values
  const handleResetFilters = () => {
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
  const hasActiveFilters = selectedJobTypes.length > 0 || 
    selectedExperienceLevels.length > 0 || 
    selectedSalaryRanges.length > 0 ||
    selectedRemote ||
    selectedDatePosted !== "any" ||
    minSalary > 0 ||
    maxSalary < 200000 ||
    selectedLocation !== "";

  return (
    <Card className="p-6 sticky top-24">
      {/* Filter header with reset button */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Filters</h2>
        {/* Show reset button only when filters are active */}
        {hasActiveFilters && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleResetFilters}
            className="text-xs h-8 px-2"
          >
            <RotateCcw className="h-4 w-4 mr-1" />
            Reset
          </Button>
        )}
      </div>
      
      <div className="space-y-6">
        {/* Location filter section */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Location</h3>
          <LocationSearch 
            onLocationSelect={setSelectedLocation} 
            currentLocation={selectedLocation} 
          />
        </div>
        
        <Separator />
        
        {/* Job type filter section */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Job Type</h3>
          <div className="space-y-3">
            {jobTypes.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox 
                  id={type} 
                  checked={selectedJobTypes.includes(type)}
                  onCheckedChange={(checked) => handleJobTypeChange(type, checked as boolean)}
                />
                <Label 
                  htmlFor={type} 
                  className="text-sm font-normal cursor-pointer text-muted-foreground"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Experience level filter section */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Experience Level</h3>
          <div className="space-y-3">
            {experienceLevels.map((level) => (
              <div key={level} className="flex items-center space-x-2">
                <Checkbox 
                  id={level} 
                  checked={selectedExperienceLevels.includes(level)}
                  onCheckedChange={(checked) => handleExperienceLevelChange(level, checked as boolean)}
                />
                <Label 
                  htmlFor={level} 
                  className="text-sm font-normal cursor-pointer text-muted-foreground"
                >
                  {level}
                </Label>
              </div>
            ))}
          </div>
        </div>
        
        <Separator />
        
        {/* Salary range filter section with slider */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Salary Range</h3>
          <div className="space-y-4">
            {/* Display current slider values */}
            <div className="flex justify-between text-sm">
              <span>${minSalary.toLocaleString()}</span>
              <span>${maxSalary.toLocaleString()}+</span>
            </div>
            
            {/* Salary slider for precise filtering */}
            <Slider
              min={0}
              max={200000}
              step={5000}
              value={[minSalary, maxSalary]}
              onValueChange={(values) => {
                setMinSalary(values[0]);
                setMaxSalary(values[1]);
              }}
              className="w-full"
            />
            
            {/* Detailed salary range display */}
            <div className="grid grid-cols-2 gap-2 mt-2">
              <div className="text-xs text-muted-foreground">
                Min: ${minSalary.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground text-right">
                Max: ${maxSalary.toLocaleString()}+
              </div>
            </div>
          </div>
        </div>
        
        <Separator />
        
        {/* Remote work filter section */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Remote Work</h3>
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="remote" 
              checked={selectedRemote}
              onCheckedChange={(checked) => setSelectedRemote(checked as boolean)}
            />
            <Label 
              htmlFor="remote" 
              className="text-sm font-normal cursor-pointer text-muted-foreground"
            >
              Remote Only
            </Label>
          </div>
        </div>
        
        <Separator />
        
        {/* Date posted filter section */}
        <div>
          <h3 className="font-medium mb-3 text-foreground">Date Posted</h3>
          <div className="space-y-3">
            {datePostedOptions.map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <Checkbox 
                  id={option.value} 
                  checked={selectedDatePosted === option.value}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedDatePosted(option.value);
                    }
                  }}
                />
                <Label 
                  htmlFor={option.value} 
                  className="text-sm font-normal cursor-pointer text-muted-foreground"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default FilterSidebar;