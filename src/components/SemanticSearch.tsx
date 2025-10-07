import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Search, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Props for the SemanticSearch component
interface SemanticSearchProps {
  onSearch: (query: string) => void;
  currentQuery: string;
}

// Component that provides intelligent search with natural language understanding
const SemanticSearch = ({ onSearch, currentQuery }: SemanticSearchProps) => {
  // State variables for managing the search
  const [searchQuery, setSearchQuery] = useState(currentQuery);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [intent, setIntent] = useState<string | null>(null);

  // Detect user intent from their search query
  // In a real application, this would use advanced NLP techniques
  const detectIntent = (query: string) => {
    const lowerQuery = query.toLowerCase();
    
    // Check for salary-related queries
    if (lowerQuery.includes("salary") || lowerQuery.includes("pay") || lowerQuery.includes("$")) {
      return "salary";
    } 
    // Check for remote work queries
    else if (lowerQuery.includes("remote") || lowerQuery.includes("work from home")) {
      return "remote";
    } 
    // Check for entry-level position queries
    else if (lowerQuery.includes("entry") || lowerQuery.includes("junior")) {
      return "entry_level";
    } 
    // Check for senior-level position queries
    else if (lowerQuery.includes("senior") || lowerQuery.includes("lead") || lowerQuery.includes("principal")) {
      return "senior_level";
    } 
    // Check for flexible work arrangement queries
    else if (lowerQuery.includes("part time") || lowerQuery.includes("contract")) {
      return "flexible";
    } 
    // Check for company-related queries
    else if (lowerQuery.includes("company") || lowerQuery.includes("corporation")) {
      return "company";
    }
    
    // No specific intent detected
    return null;
  };

  // Update detected intent when search query changes
  useEffect(() => {
    if (searchQuery) {
      const detectedIntent = detectIntent(searchQuery);
      setIntent(detectedIntent);
    } else {
      setIntent(null);
    }
  }, [searchQuery]); // Re-run when searchQuery changes

  // Execute the search
  const handleSearch = () => {
    onSearch(searchQuery);
  };

  // Handle keyboard events (like pressing Enter)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // Example search suggestions to help users
  const suggestions = [
    "React developer jobs in San Francisco",
    "Remote frontend positions",
    "Entry level software engineer",
    "High paying data science roles",
    "Product manager jobs with equity"
  ];

  return (
    <div className="relative">
      {/* Main search input area */}
      <div className="relative">
        {/* Search icon inside the input */}
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        
        {/* Search input field with placeholder examples */}
        <Input
          placeholder="Try: 'React jobs in San Francisco' or 'Remote frontend positions'"
          className="pl-10 pr-20"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
        />
        
        {/* Search button */}
        <Button
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8"
          onClick={handleSearch}
        >
          Search
        </Button>
      </div>

      {/* Show detected intent to user */}
      {intent && (
        <div className="mt-2 flex items-center gap-2 text-sm text-primary">
          <Sparkles className="h-4 w-4" />
          <span>Searching for {intent.replace("_", " ")} positions</span>
        </div>
      )}

      {/* Show search suggestions when input is focused */}
      {showSuggestions && (
        <Card className="absolute top-full left-0 right-0 mt-2 p-4 shadow-lg z-10">
          <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Try these searches:</h3>
          <div className="space-y-2">
            {suggestions.map((suggestion, index) => (
              // Each suggestion is clickable
              <div
                key={index}
                className="p-2 rounded hover:bg-muted cursor-pointer text-sm transition-colors duration-200"
                onClick={() => {
                  setSearchQuery(suggestion);
                  setShowSuggestions(false);
                }}
              >
                {suggestion}
              </div>
            ))}
          </div>
        </Card>
      )}
    </div>
  );
};

export default SemanticSearch;