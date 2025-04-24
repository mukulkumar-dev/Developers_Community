
import { useState } from "react";

interface FilterTagsProps {
  options?: string[];
  tags?: string[];
  selectedTags: string[];
  onTagSelect: (tag: string) => void;
}

const FilterTags = ({ 
  options, 
  tags, 
  selectedTags, 
  onTagSelect 
}: FilterTagsProps) => {
  const [showMore, setShowMore] = useState(false);
  
  // Use options if provided, otherwise fallback to tags, or an empty array as final fallback
  const availableTags = options || tags || [];
  // Make sure availableTags is defined before calling slice
  const displayTags = availableTags.length > 0 ? 
    (showMore ? availableTags : availableTags.slice(0, 10)) : 
    [];

  if (availableTags.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap gap-2">
        {displayTags.map((tag) => (
          <button
            key={tag}
            onClick={() => onTagSelect(tag)}
            className={`px-3 py-1.5 text-sm rounded-full transition-colors duration-200 ${
              selectedTags.includes(tag)
                ? "bg-devblue-500 text-white hover:bg-devblue-600 shadow-sm"
                : "bg-muted/60 text-foreground hover:bg-muted border border-border/50"
            }`}
          >
            {tag}
          </button>
        ))}
        
        {availableTags.length > 10 && (
          <button
            onClick={() => setShowMore(!showMore)}
            className="px-3 py-1.5 text-sm text-devblue-600 dark:text-devblue-400 font-medium hover:underline transition-colors"
          >
            {showMore ? "Show Less" : `+${availableTags.length - 10} More`}
          </button>
        )}
      </div>
      
      {selectedTags.length > 0 && (
        <div className="pt-2 border-t border-border/50">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Active filters:</span>
            <button 
              onClick={() => selectedTags.forEach(tag => onTagSelect(tag))}
              className="text-xs text-devblue-500 hover:text-devblue-600 hover:underline"
            >
              Clear all
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterTags;
