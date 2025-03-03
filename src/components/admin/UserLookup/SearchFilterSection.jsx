// src/components/admin/UserLookup/SearchFilterSection.jsx
"use client";

import { useState, useEffect, useCallback } from "react";
import debounce from "lodash.debounce";
import { useToast } from "@/contexts/ToastContext";

export default function SearchFilterSection({ onSearch, initialSearch = "" }) {
  const [searchTerm, setSearchTerm] = useState(initialSearch);
  const [hasSearched, setHasSearched] = useState(false);
  const [levelFilter, setLevelFilter] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();

  // Initialize with the provided initial search term
  useEffect(() => {
    setSearchTerm(initialSearch);
  }, [initialSearch]);

  const handleSearch = useCallback(() => {
    if (searchTerm === "") {
      toast.warning("Search term cannot be empty.");
      return;
    }
    setIsLoading(true);
    const searchResult = onSearch(searchTerm);
    if (searchResult && typeof searchResult.then === "function") {
      searchResult.then(() => {
        setIsLoading(false);
        setHasSearched(true);
      }).catch((error) => {
        setIsLoading(false);
        toast.error("An error occurred while searching.");
      });
    } else {
      setIsLoading(false);
      setHasSearched(true);
    }
  }, [searchTerm, onSearch, toast]);

  const handleReset = useCallback(() => {
    setSearchTerm("");
    const resetResult = onSearch("");
    if (resetResult && typeof resetResult.then === "function") {
      resetResult.then(() => {
        setHasSearched(false);
      }).catch((error) => {
        toast.error("An error occurred while resetting the search.");
      });
    } else {
      setHasSearched(false);
    }
  }, [onSearch, toast]);

  const handleLevelFilter = useCallback((level) => {
    setLevelFilter(level);
    // Placeholder—add level to filters if Viewer model supports it
    onSearch(searchTerm); // Trigger search with current term
  }, [searchTerm, onSearch]);

  const debouncedHandleSearch = useCallback(debounce(handleSearch, 300), [handleSearch]);

  return (
    <div className="mb-4 space-y-2 bg-background-300/10 p-4 rounded-md">  
      <div className="flex flex-wrap gap-4">
        <h3 className="text-foreground font-bold uppercase">Lookup Viewer</h3>
        <input
          type="text"
          placeholder="Search ..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && debouncedHandleSearch()}
          className="searchFilter-input flex-grow"
          disabled={isLoading}
        />
        <button 
          onClick={debouncedHandleSearch}
          className="flex-grow bg-apeRed text-foreground text-sm font-bold px-2 py-2 rounded-full hover:shadow-apeRed/20 hover:shadow-sm hover:scale-102 transition cursor-pointer"
          disabled={isLoading}
        >
          {isLoading ? "Searching..." : "Search"}
        </button>
        {hasSearched && (
          <button 
            onClick={handleReset}
            className="flex-grow bg-apeBlue text-foreground text-sm font-bold px-2 py-2 rounded-full hover:shadow-apeBlue/20 hover:shadow-sm hover:scale-102 transition cursor-pointer"
            disabled={isLoading}
          >
            Reset
          </button>
        )}
       </div>
      <h5 className="text-foreground-600 font-bold mt-8 uppercase hidden">Filters</h5>
      <div className="grid-cols-3 gap-2 text-sm font-semibold hidden">
        <button 
          onClick={() => handleLevelFilter(1)} 
          className={`searchFilter-button ${levelFilter === 1 ? 'bg-primary text-primary-foreground' : ''}`}
        >
          lvl 1
        </button>
        <button 
          onClick={() => handleLevelFilter(3)} 
          className={`searchFilter-button ${levelFilter === 3 ? 'bg-primary text-primary-foreground' : ''}`}
        >
          lvl 3
        </button>
        <button 
          onClick={() => handleLevelFilter(5)} 
          className={`searchFilter-button ${levelFilter === 5 ? 'bg-primary text-primary-foreground' : ''}`}
        >
          lvl 5
        </button>
      </div>
    </div>
  );
}