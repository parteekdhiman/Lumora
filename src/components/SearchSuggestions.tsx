import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Search, TrendingUp, Clock } from "lucide-react";

// Define the structure for search suggestions
interface SearchSuggestion {
  id: string;
  text: string;
  type: "popular" | "recent";
  count?: number; // Number of jobs for popular searches
}

// Props for the SearchSuggestions component
interface SearchSuggestionsProps {
  searchQuery: string;
  onSuggestionClick: (suggestion: string) => void;
}

// Component that shows search suggestions based on user input
const SearchSuggestions = ({ searchQuery, onSuggestionClick }: SearchSuggestionsProps) => {
  // State to hold the list of suggestions to display
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);

  // Predefined popular search terms with job counts
  const popularSearches: SearchSuggestion[] = [
    { id: "1", text: "React Developer", type: "popular", count: 1245 },
    { id: "2", text: "Remote Jobs", type: "popular", count: 980 },
    { id: "3", text: "Software Engineer", type: "popular", count: 2100 },
    { id: "4", text: "Product Manager", type: "popular", count: 876 },
    { id: "5", text: "Data Scientist", type: "popular", count: 654 },
  ];

  // User's recent search terms
  const recentSearches: SearchSuggestion[] = [
    { id: "6", text: "Frontend Developer", type: "recent" },
    { id: "7", text: "UX Designer", type: "recent" },
    { id: "8", text: "San Francisco", type: "recent" },
  ];

  // Update suggestions when search query changes
  useEffect(() => {
    // When user types something, filter suggestions
    if (searchQuery.length > 0) {
      // Find popular searches that match the query
      const matchingPopularSearches = popularSearches.filter(suggestion => 
        suggestion.text.toLowerCase().includes(searchQuery.toLowerCase())
      );
      
      // Combine matching popular searches with recent searches
      setSuggestions([...matchingPopularSearches, ...recentSearches]);
    } else {
      // When search box is empty, show popular searches
      setSuggestions(popularSearches);
    }
  }, [searchQuery]); // Re-run when searchQuery changes

  // Don't show anything if there are no suggestions
  if (suggestions.length === 0) return null;

  return (
    <Card className="absolute top-full left-0 right-0 mt-2 z-10 shadow-lg">
      <div className="p-4">
        <h3 className="text-sm font-semibold text-muted-foreground mb-2">Search Suggestions</h3>
        <ul className="space-y-2">
          {suggestions.map((suggestion) => (
            // Each suggestion is clickable
            <li 
              key={suggestion.id}
              className="flex items-center gap-2 p-2 rounded hover:bg-muted cursor-pointer transition-colors duration-200"
              onClick={() => onSuggestionClick(suggestion.text)}
            >
              {/* Show different icons for popular vs recent searches */}
              {suggestion.type === "popular" ? (
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <Clock className="h-4 w-4 text-muted-foreground" />
              )}
              
              {/* Display the suggestion text */}
              <span className="flex-1">{suggestion.text}</span>
              
              {/* Show job count for popular searches */}
              {suggestion.count && (
                <span className="text-xs text-muted-foreground">{suggestion.count} jobs</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

export default SearchSuggestions;