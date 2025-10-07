import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { MapPin, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";

// Define the structure for location data
interface Location {
  id: string;
  name: string;
  type: "city" | "state" | "country";
  distance?: number; // Distance in miles (for nearby locations)
}

// Props for the LocationSearch component
interface LocationSearchProps {
  onLocationSelect: (location: string) => void;
  currentLocation: string;
}

// Component that allows users to search for job locations
const LocationSearch = ({ onLocationSelect, currentLocation }: LocationSearchProps) => {
  // State variables for managing the search
  const [searchQuery, setSearchQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [suggestions, setSuggestions] = useState<Location[]>([]);

  // Predefined list of popular locations
  // In a real application, this would come from a geolocation API
  const locationData: Location[] = [
    { id: "1", name: "San Francisco, CA", type: "city" },
    { id: "2", name: "New York, NY", type: "city" },
    { id: "3", name: "Los Angeles, CA", type: "city" },
    { id: "4", name: "Chicago, IL", type: "city" },
    { id: "5", name: "Austin, TX", type: "city" },
    { id: "6", name: "Seattle, WA", type: "city" },
    { id: "7", name: "Boston, MA", type: "city" },
    { id: "8", name: "Denver, CO", type: "city" },
    { id: "9", name: "Washington, DC", type: "city" },
    { id: "10", name: "Remote", type: "city" },
    { id: "11", name: "Dharamshala, HP", type: "city" },
  ];

  // Update suggestions when the search query changes
  useEffect(() => {
    // Only show suggestions when there's a meaningful query
    if (searchQuery.length > 1) {
      // Filter locations that match the search query
      const matchingLocations = locationData.filter(location => 
        location.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      setSuggestions(matchingLocations);
      setShowSuggestions(true);
    } else {
      // Clear suggestions when query is too short
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchQuery]); // Re-run when searchQuery changes

  // Handle selection of a location from suggestions
  const handleLocationSelect = (location: string) => {
    // Notify parent component of the selected location
    onLocationSelect(location);
    
    // Update the search input to show the selected location
    setSearchQuery(location);
    
    // Hide the suggestions dropdown
    setShowSuggestions(false);
  };

  // Detect user's current location (simulated in this frontend-only version)
  const detectCurrentLocation = () => {
    // In a real application, this would use the browser's Geolocation API
    // For this demo, we'll use a common tech hub as an example
    const defaultLocation = "San Francisco, CA";
    
    // Notify parent component of the detected location
    onLocationSelect(defaultLocation);
    
    // Update the search input to show the detected location
    setSearchQuery(defaultLocation);
  };

  return (
    <div className="relative">
      {/* Search input with location icon and detect button */}
      <div className="relative">
        {/* Location icon inside the search box */}
        <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        
        {/* Search input field */}
        <Input
          placeholder="City, state, or remote"
          className="pl-10"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => searchQuery.length > 1 && setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {/* Button to detect current location */}
        <Button
          size="icon"
          variant="ghost"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground"
          onClick={detectCurrentLocation}
          title="Detect my location"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      </div>

      {/* Suggestions dropdown - shown when there are matching locations */}
      {showSuggestions && suggestions.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg z-10">
          <div className="py-1">
            {suggestions.map((location) => (
              // Each suggestion is clickable
              <div
                key={location.id}
                className="px-4 py-2 hover:bg-muted cursor-pointer flex items-center gap-2 transition-colors duration-200"
                onClick={() => handleLocationSelect(location.name)}
              >
                {/* Location icon for each suggestion */}
                <MapPin className="h-4 w-4 text-muted-foreground" />
                
                {/* Location name */}
                <span>{location.name}</span>
                
                {/* Distance information (if available) */}
                {location.distance && (
                  <span className="text-xs text-muted-foreground ml-auto">
                    {location.distance} miles away
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationSearch;